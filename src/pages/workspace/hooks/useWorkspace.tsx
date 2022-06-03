import { useState } from 'react';
import { IWorkspaceCoreProps } from '../components/workspaceCore/workspace';
import { ITextBlock } from "../../../modal/type";
import { ITagWorkspaceProps } from '../main';
import { useDisableSelect } from './useDisableSelect';
import { useUpdate } from './useUpdate';
import { useRemoveTag } from './useRemoveTag';
import { usePrevNext } from './usePrevNext';

export type SetTextBlocks = React.Dispatch<React.SetStateAction<ITextBlock[]>>
export const useWorkspace = (props: ITagWorkspaceProps) => {
    const { origin, container, onFinished } = props;
    const tags = container.tags;

    const [textBlocks, setTextBlocks] = useState<ITextBlock[]>(container.curtTextBlocks);

    const updateTextBlocks = useUpdate(setTextBlocks, container, tags);
    const textAreaRef = useDisableSelect(setTextBlocks);
    const removeTag = useRemoveTag(setTextBlocks);

    const { prev, next } = usePrevNext(container, textBlocks, setTextBlocks, onFinished, origin);

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
