import { ITag, ITextBlocks } from '../pages/workspace/components/workspace/type'
import { createTags } from '../utils/creator'
import { getMachineResult } from './machine'
import { Entitys, Fields, Inputs } from './type'

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
    static humanTag(inputs: Inputs, fields: Fields): Container {
        let blockId = 1
        const textBlocks = inputs.map(input => input.split('\n')
            .map((line, lineNumber) => ({
                isPlain: true,
                text: `${line}\n`,
                type: '',
                color: '',
                id: blockId++,
                selectable: true,
                field: '',
                position: {
                    lineNumber,
                    start: 0,
                    end: line.length - 1
                }
            })))

        const tags = createTags(fields)
        return new Container(textBlocks, tags, blockId)
    }

    static async machineTag(inputs: Inputs, fields: Fields): Promise<Container> {
        const res = await getMachineResult(inputs, fields)
        return new Container(...res)
    }

    private constructor(private textBlocksList: ITextBlocks[], private tags: ITag[], public blockId: number) {
        console.log(this.textBlocksList)
    }

    index = 0

    get hasPrev(): boolean {
        return this.index > 0
    }

    get curtTextBlocks(): ITextBlocks {
        return this.textBlocksList[this.index]
    }

    isFinished() {
        return this.index >= this.textBlocksList.length - 1
    }

    loadCurtTextBlocks(textBlocks: ITextBlocks) {
        this.textBlocksList[this.index] = textBlocks
    }

    exportList(): Entitys {
        const result = this.textBlocksList.map((textBlocks, i) => {
            return textBlocksToEntitys(textBlocks, i)
        })
        return result.flat()
    }
}
