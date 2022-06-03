import { useOrigins } from './useOrigins';
import Container from '../../../modal/container';
import { removeOrigin } from '../../../modal/origin';
import { IOriginTableProps } from '../OriginTable';
import { useResult } from '../../../hooks/data/useResult';
import { useWorkspace } from '../../../hooks/data/useWorkspace';
import { useNavigate } from 'react-router-dom';

export function useOriginTable(): IOriginTableProps {
    const navigate = useNavigate()
    const [_, setWorkspace] = useWorkspace()
    const { updateResult } = useResult()
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
            navigate('/workspace')
        },
        updateResult,
    };
    return originTableProps;
}
