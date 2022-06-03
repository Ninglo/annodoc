import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { useOrigins } from '../../../hooks/data/useOrigins';
import Container from '../../../modal/container';
import { Origin, removeOrigin } from '../../../modal/origin';
import { ITagWorkspaceDataProps } from '../../workspace/main';
import { IOriginTableProps } from '../OriginTable';

export function useOriginTable(setWorkspace: Dispatch<SetStateAction<ITagWorkspaceDataProps | null>>, updateResult: (result: Origin, submit: boolean) => void, navigate: NavigateFunction): IOriginTableProps {
    const { origins, setQuery } = useOrigins({});
    const originTableProps: IOriginTableProps = {
        origins,
        setQuery,
        removeOrigin(id) {
            removeOrigin(id).then(() => setQuery(query => ({ ...query })));
        },
        async gotoTagWorkspace(workspace, type) {
            const { inputs, fields } = workspace;
            const container = type === 'machine'
                ? await Container.machineTag(inputs, fields)
                : Container.humanTag(inputs, fields);
            setWorkspace({ ...workspace, container });
        },
        updateResult,
        gotoCreateOrigin() { navigate('/createUser'); }
    };
    return originTableProps;
}
