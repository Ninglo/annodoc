import { useState } from 'react';
import { IWorkspaceCoreProps } from '../components/workspaceCore/workspace';
import { ITextBlock } from "../../../modal/type";
import { useDisableSelect } from './useDisableSelect';
import { useUpdate } from './useUpdate';
import { useRemoveTag } from './useRemoveTag';
import { usePrevNext } from './usePrevNext';
import { useWorkspace } from '../../../hooks/data/useWorkspace';

export type SetTextBlocks = React.Dispatch<React.SetStateAction<ITextBlock[]>>
export const useWorkspaceProps = () => {
    const [workspace] = useWorkspace()
    const { origin, container } = workspace!;
    const tags = container.tags;

    const [textBlocks, setTextBlocks] = useState<ITextBlock[]>(container.curtTextBlocks);

    const updateTextBlocks = useUpdate(setTextBlocks, container, tags);
    const textAreaRef = useDisableSelect(setTextBlocks);
    const removeTag = useRemoveTag(setTextBlocks);

    const { prev, next } = usePrevNext(container, textBlocks, setTextBlocks, origin);

    const workspaceCoreProps: IWorkspaceCoreProps = {
        hasPrev: container.hasPrev,
        tags,
        textBlocks,
        textAreaRef,
        removeTag,
        updateTextBlocks,
        prev,
        next,
    };
    return workspaceCoreProps;
};
