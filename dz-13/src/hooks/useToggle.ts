import { useState, useCallback } from 'react';

export function useToggle(initialState: boolean = false) {
  const [state, setState] = useState<boolean>(initialState);

  const toggle = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  return [state, toggle] as const;
}