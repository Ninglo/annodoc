import { useState } from 'react';

export type UpdateView = () => void;
export function useUpdateView(): UpdateView {
    const [count, setState] = useState(0);
    const updateView = () => setState(count + 1);
    return updateView;
}
