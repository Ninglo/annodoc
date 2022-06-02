import { FC } from 'react'
import { ITag, ITextBlock } from './type'
import { Noop } from '../../../../modal/type'
import NextBtn from './components/nextBtn'
import TextArea, { ITextArea as ITextAreaProps } from './components/textArea'
import './index.scss'
import TagButtonArea, { ITagButtonArea as ITagButtonAreaProps } from './components/tagButtonArea'
import PrevBtn from './components/prevBtn'

export interface IWorkspaceCoreProps {
    hasPrev: boolean
    tags: ITag[]
    textAreaRef: React.RefObject<HTMLDivElement>
    textBlocks: ITextBlock[]
    removeTag: (id: number) => void
    updateTextBlocks: (tag: ITag) => void
    prev: Noop
    next: Noop
}
export const WorkspaceCore: FC<IWorkspaceCoreProps> = ({
    hasPrev,
    tags,
    textBlocks,
    textAreaRef,
    removeTag,
    updateTextBlocks,
    prev,
    next
}) => {
    const tagButtonAreaProps: ITagButtonAreaProps = {
        tags,
        updateTextBlocks
    }

    const textAreaProps: ITextAreaProps = {
        textBlocks,
        textAreaRef,
        removeTag
    }
    return (
        <div className="main">
            <div className="workspace">
                <div className="content-area">
                    <TagButtonArea {...tagButtonAreaProps} />
                    <TextArea {...textAreaProps} />
                </div>
                {hasPrev && <PrevBtn onClick={prev} />}
                <NextBtn onClick={next} />
            </div>
        </div>
    )
}
