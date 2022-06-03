import { FC } from 'react'
import Word from './word'
import { ITextBlock } from "../../../../../modal/type"

export interface ITextArea {
    textAreaRef: React.RefObject<HTMLDivElement>
    textBlocks: ITextBlock[]
    removeTag: (id: number) => void
}
const TextArea: FC<ITextArea> = ({ textAreaRef, textBlocks, removeTag }) => {
    return (
        <div className="text-area" ref={textAreaRef}>
            {textBlocks.map((textBlock) => (
                <Word key={textBlock.id} removeTag={removeTag} {...textBlock} />
            ))}
        </div>
    )
}

export default TextArea
