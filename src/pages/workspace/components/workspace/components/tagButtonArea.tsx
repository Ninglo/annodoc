import { FC } from 'react'
import { ITag } from '../type'
import TagButton from './tagButton'

export interface ITagButtonArea {
    tags: ITag[]
    updateTextBlocks: (tag: ITag) => void
}
const TagButtonArea: FC<ITagButtonArea> = ({ tags, updateTextBlocks }) => {
    return (
        <div className="tag-btn-area">
            {tags.map((tag) => (
                <TagButton key={tag.field} {...tag} onClick={() => updateTextBlocks(tag)} />
            ))}
        </div>
    )
}

export default TagButtonArea
