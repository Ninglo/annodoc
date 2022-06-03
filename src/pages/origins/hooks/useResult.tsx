import { useState } from 'react';
import { Origin, updateOrigin } from '../../../modal/origin';

export const useResult = (): { result: Origin | null; updateResult: (result: Origin, submit: boolean) => void; } => {
    const [result, setResult] = useState<Origin | null>(null);
    const updateResult = (result: Origin, submit: boolean) => {
        setResult(result);
        submit && updateOrigin(result);
    };

    return { result, updateResult };
};
