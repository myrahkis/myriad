import { useEffect, useRef, useState } from "react";
import { getAllPosts } from "./services/postsApi";

type Post = {
  body: string;
  id: number;
  reactions: object;
  tags: string[];
  title: string;
  userId: number;
  views: number;
};

const MAX_PAGES = 25;

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const observerRef = useRef<HTMLDivElement>(null);
  const isFetching = useRef(false);

  useEffect(() => {
    async function fetchPosts() {
      if (isFetching.current || page > MAX_PAGES) return;

      try {
        setIsLoading(true);
        isFetching.current = true;

        const newPosts = await getAllPosts(page);

        // console.log(page);
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setError("");
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
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

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ padding: "1.5rem" }}>
            {post.id}. {post.title}
          </li>
        ))}
      </ul>
      <div ref={observerRef}></div>
    </div>
  );
}

export default App;
