import { MutableRefObject, useEffect, useRef, useState } from "react";

function useObserve(isFetching: MutableRefObject<boolean>) {
  const [page, setPage] = useState(0);
  const observerRef = useRef(null);

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
  }, [isFetching]);

  return { page, observerRef };
}

export default useObserve;
