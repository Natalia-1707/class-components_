'use client';
import { useEffect, useState } from 'react';

export function useLocalStorage( key: string, initialValue = '') {
  const [savedValue, setSavedValue] = useState(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(key);

    if (stored !== null) {
      setSavedValue(stored);
    }

    setIsLoaded(true);
  }, [key]);

  const setValue = (value: string) => {
    setSavedValue(value);
    localStorage.setItem(key, value);
  };

  return [savedValue, setValue, isLoaded] as const;
}