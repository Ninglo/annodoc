import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Origin, updateOrigin } from '../../modal/origin';

export const resultContext = createContext<{ result: Origin | null; updateResult: (result: Origin | null, submit: boolean) => void; }>({ result: null, updateResult() { } })
export const useResult = (): { result: Origin | null; updateResult: (result: Origin | null, submit: boolean) => void; } => {
    return useContext(resultContext)
};

export const useResultContext = () => {
    const navigate = useNavigate()
    const [result, setResult] = useState<Origin | null>(null)
    const updateResult = (result: Origin | null, submit: boolean) => {
        setResult(result);
        submit && result && updateOrigin(result);
        navigate('/result')
    };

    return { result, updateResult };

}
