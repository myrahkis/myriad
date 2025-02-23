import { useCallback, useEffect, useRef, useState } from "react";
import { getPostsByPage } from "./services/postsApi";
import { PostStructure } from "./interfaces/interfaces";
import Loader from "./components/Loader";
import Post from "./components/Post";
import styles from "./ui/main.module.css";
import SortBy from "./components/SortBy";
import useObserve from "./hooks/useObserve";

type SortFunctions = {
  [key in "id" | "title" | "body" | "likes" | "dislikes"]: (
    a: PostStructure,
    b: PostStructure
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
  const [posts, setPosts] = useState<PostStructure[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<keyof SortFunctions>("id");
  const isFetching = useRef(false);
  const { page, observerRef } = useObserve(isFetching);

  useEffect(() => {
    async function fetchPosts() {
      if (isFetching.current || page > MAX_PAGES) return;

      try {
        setIsLoading(true);
        isFetching.current = true;

        const newPosts = await getPostsByPage(page);

        setPosts((prevPosts) => [...prevPosts, ...newPosts] as PostStructure[]);
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

  function deletePostHandle(id: number) {
    setPosts(posts.filter((post) => post.id !== id));
  }

  function editPostHandle(id: number, editedPost: object) {
    setPosts(
      posts.map((post) =>
        post.id === id ? editedPost : post
      ) as PostStructure[]
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
      ) as PostStructure[]
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
      <header className={styles["header"]}>
        <h1>Test task for VK</h1>
      </header>
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
