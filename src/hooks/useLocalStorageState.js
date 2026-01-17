import { useState, useEffect } from "react";

export function useLocalStorageState(key, initialValue) {
  const [state, setState] = useState(function () {
    const storedWatched = localStorage.getItem(key);
    return storedWatched ? JSON.parse(storedWatched) : initialValue;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(state));
    },
    [state, key]
  );

  return [state, setState];
}
