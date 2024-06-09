import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      function eventListnerCallback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }

      document.addEventListener("keydown", eventListnerCallback);

      //cleanup function
      return function () {
        document.removeEventListener("keydown", eventListnerCallback);
      };
    },
    [key, action]
  );
}
