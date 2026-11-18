
import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {

    // states
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);

      return storedValue !== null
        ? (JSON.parse(storedValue) as T)
        : initialValue;
    } catch (error) {
      console.error(`Error reading LocalStorage key "${key}":`, error);
      return initialValue;
    }
  });

    // hooks
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving LocalStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export default useLocalStorage;
