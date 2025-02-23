import { useEffect, useRef } from "react";

// хук из моего другого проекта (ukiyo)
function useOutsideClick<T extends HTMLElement>(
  handler: () => void,
  listenCapturing = true
): React.RefObject<T> {
  const ref = useRef<T | null>(null);

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () => {
        document.removeEventListener("click", handleClick, listenCapturing);
      };
    },
    [handler, listenCapturing]
  );

  return ref;
}

export default useOutsideClick;
