import { useCallback, useState } from "react";

export type UpdateView = () => void;
export function useUpdateView(): UpdateView {
  const [_, setState] = useState(0);
  const updateView = useCallback(() => {
    setState((count) => count + 1);
  }, []);
  return updateView;
}
