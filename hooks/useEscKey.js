import { useEffect } from "react";

function useEscKey(onEscPress) {
  function handleKeyDown(e) {
    if (e.key === "Escape" && onEscPress) {
      e.preventDefault();
      onEscPress();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}

export default useEscKey;
