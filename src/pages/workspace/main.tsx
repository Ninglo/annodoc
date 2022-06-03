import { FC } from 'react';
import Container from '../../modal/container';
import { Fields, Inputs } from '../../modal/type';
import { IWorkspaceCoreProps, WorkspaceCore } from './components/workspaceCore/workspace';
import { Origin } from '../../modal/origin';
import { useWorkspaceProps } from './hooks/useWorkspace';
import './index.scss';

export interface ITagWorkspaceDataProps {
    fields: Fields;
    inputs: Inputs;
    origin: Origin;
    container: Container;
}
export interface ITagWorkspaceProps extends ITagWorkspaceDataProps { }
export const TagWorkspace: FC = () => {
    const workspaceCoreProps: IWorkspaceCoreProps = useWorkspaceProps();
    return <WorkspaceCore {...workspaceCoreProps} />
};
