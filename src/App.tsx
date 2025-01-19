import { useCallback, useEffect, useRef, useState } from "react";
import { getPostsByPage } from "./services/postsApi";
import Loader from "./components/Loader";
import Post from "./components/Post";
import styles from "./ui/main.module.css";
import SortBy from "./components/SortBy";

interface Post {
  id: number;
  title: string;
  body: string;
  reactions: {
    likes: number;
    dislikes: number;
  };
  done: boolean;
}

type SortFunctions = {
  [key in "id" | "title" | "body" | "likes" | "dislikes"]: (
    a: Post,
    b: Post
  ) => number;
};

const sortingFunctions: SortFunctions = {
  id: (a, b) => +a.done - +b.done,
  title: (a, b) => a.title.localeCompare(b.title),
  body: (a, b) => a.body.localeCompare(b.body),
  likes: (a, b) => +b.reactions.likes - +a.reactions.likes, // от наиб лайков к наим
  dislikes: (a, b) => +b.reactions.dislikes - +a.reactions.dislikes, // от наиб дизлайков к наим
};

const MAX_PAGES = 21;

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<keyof SortFunctions>("id");
  const observerRef = useRef<HTMLDivElement>(null);
  const isFetching = useRef(false);

  /*
  todo: поиск по userId? + доделать карточки постов
  */

  useEffect(() => {
    async function fetchPosts() {
      if (isFetching.current || page > MAX_PAGES) return;

      try {
        setIsLoading(true);
        isFetching.current = true;

        const newPosts = await getPostsByPage(page);

        setPosts((prevPosts) => [...prevPosts, ...newPosts] as Post[]);
        setError("");
      } catch (err) {
        if (err instanceof Error) {
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
    setPosts(
      posts.map((post) => (post.id === id ? editedPost : post)) as Post[]
    );
  }

  function updateReaction(id: number, reactionName: "likes" | "dislikes") {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? {
              ...post,
              reactions: {
                ...post.reactions,
                [reactionName]: post.reactions[reactionName] + 1,
              },
            }
          : post
      ) as Post[]
    );
  }

  const sortedPosts = useCallback(
    (order: keyof SortFunctions) => {
      const postsCopy = [...posts];
      const sortFunc = sortingFunctions[order];
      return sortFunc ? postsCopy.sort(sortFunc) : postsCopy;
    },
    [posts]
  );

  const displayPosts = sortedPosts(order);

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      <main className="container">
        <ul className={styles["posts-grid"]}>
          {displayPosts.map((post) => (
            <Post
              post={post}
              key={post.id}
              onDelete={deletePostHandle}
              onEdit={editPostHandle}
              onUpdateReaction={updateReaction}
            />
          ))}
        </ul>
        <div ref={observerRef}></div>
      </main>
      <footer className="footer">
        <SortBy order={order} setOrder={setOrder} />
      </footer>
    </>
  );
}

export default App;
