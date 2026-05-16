import { useState } from 'react';

export function useLocalStorage( key: string, initialValue = '') {
  const [savedValue, setSavedValue] = useState<string>(() => {
    return localStorage.getItem(key) ?? initialValue;
  });

  const setValue = (value: string) => {
    setSavedValue(value);
    localStorage.setItem(key, value);
  };

  return [savedValue, setValue] as const;
}