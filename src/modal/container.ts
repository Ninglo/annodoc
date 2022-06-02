import { ITextBlocks } from '../pages/workspace/components/workspace/type'
import { Fields, Inputs, Entitys } from './type'

const textBlocksToEntitys = (textBlocks: ITextBlocks, fileIndex: number): Entitys => {
    return textBlocks
        .filter((textBlock) => !textBlock.isPlain)
        .map((textBlock) => ({
            name: textBlock.field,
            value: textBlock.text,
            position: textBlock.position,
            fileIndex,
        }))
}

export default class Container {
    index = 0
    private textBlocksList: ITextBlocks[]
    constructor(private inputs: Inputs) {
        this.textBlocksList = Array.from({ length: inputs.length }, () => [])
    }

    get hasPrev(): boolean {
        return this.index > 0
    }

    get curtTextBlocks(): ITextBlocks {
        return this.textBlocksList[this.index]
    }

    isFinished() {
        return this.index >= this.inputs.length - 1
    }

    loadCurtTextBlocks(textBlocks: ITextBlocks) {
        this.textBlocksList[this.index] = textBlocks
    }

    exportList(): Entitys {
        return this.textBlocksList.map((textBlocks, i) => {
            return textBlocksToEntitys(textBlocks, i)
        }).flat()
    }
}
