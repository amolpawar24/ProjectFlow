
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  // Get data from LocalStorage
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);

      return storedValue ? (JSON.parse(storedValue) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Store error message
  const [error, setError] = useState<string | null>(null);

  // Update state and save data to LocalStorage
  const updateValue: Dispatch<SetStateAction<T>> = (newValue) => {
    const updatedValue =
      typeof newValue === "function"
        ? (newValue as (prevValue: T) => T)(value)
        : newValue;

    setValue(updatedValue);

    try {
      localStorage.setItem(key, JSON.stringify(updatedValue));
      setError(null);
    } catch {
      setError("Unable to save data. Please check your browser storage.");
    }
  };

  // Return data, update function and error
  return [value, updateValue, error] as const;
}

export default useLocalStorage;
