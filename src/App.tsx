import { useEffect, useRef, useState } from "react";
import { getPostsByPage } from "./services/postsApi";
import Loader from "./components/Loader";
import Post from "./components/Post";
import styles from "./ui/main.module.css";

const MAX_PAGES = 21;

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const observerRef = useRef<HTMLDivElement>(null);
  const isFetching = useRef(false);

  /*
  todo: редактирование, добавление? 
  */

  useEffect(() => {
    async function fetchPosts() {
      if (isFetching.current || page > MAX_PAGES) return;

      try {
        setIsLoading(true);
        isFetching.current = true;

        const newPosts = await getPostsByPage(page);

        // console.log(page);
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setError("");
      } catch (err) {
        if (err instanceof Error) {
          // console.error(err.message);
          setError(err.message);
        } else {
          setError("Произошла неизвестная ошибка");
        }
      } finally {
        setIsLoading(false);
        isFetching.current = false;
      }
    }

    fetchPosts();
  }, [page]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (entry.isIntersecting && !isFetching.current) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const observer = new IntersectionObserver(callback, options);

    const ref = observerRef.current;

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, []);

  function deletePostHandle(id: number) {
    setPosts(posts.filter((post) => post.id !== id));
  }

  function editPostHandle(id: number, editedPost: object) {
    setPosts(posts.map((post) => (post.id === id ? editedPost : post)));
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="container">
        <ul className={styles["posts-grid"]}>
          {posts.map((post) => (
            <Post post={post} key={post.id} onDelete={deletePostHandle} onEdit={editPostHandle} />
          ))}
        </ul>
        <div ref={observerRef}></div>
      </div>
    </>
  );
}

export default App;
