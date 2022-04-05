import { FC, useCallback, useState } from 'react';
import { getAuth } from './modal/auth';
import Login from './pages/login/login';
import Origins from './pages/origins/origins';
import Upload from './pages/upload/upload';

export type Path = '/' | '/createUser' | '/createOrigin';
export const App: FC = () => {
    const { auth } = getAuth();
    const [path, setPath] = useState<Path>('/');
    const goto = useCallback((path: Path) => {
        setPath(path);
    }, []);

    return auth ? (
        path === '/' ? (
            <Origins goto={goto} />
        ) : path === '/createUser' ? (
            <Upload goto={goto} />
        ) : (
            <Upload goto={goto} />
        )
    ) : (
        <Login />
    );
};
