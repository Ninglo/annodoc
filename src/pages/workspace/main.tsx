import { FC } from 'react';
import Container from '../../modal/container';
import { Fields, Inputs } from '../../modal/type';
import { IWorkspaceCoreProps, WorkspaceCore } from './components/workspaceCore/workspace';
import { Origin } from '../../modal/origin';
import { useWorkspace } from './hooks/useWorkspace';
import './index.scss';

export interface ITagWorkspaceDataProps {
    fields: Fields;
    inputs: Inputs;
    origin: Origin;
    container: Container;
}
export interface ITagWorkspaceProps extends ITagWorkspaceDataProps {
    onFinished: (result: Origin) => void
}
export const TagWorkspace: FC<ITagWorkspaceProps> = (props) => {
    const workspaceCoreProps: IWorkspaceCoreProps = useWorkspace(props);
    return <WorkspaceCore {...workspaceCoreProps} />
};
