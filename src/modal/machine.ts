import axios from "axios";
import { ITag, ITextBlocks } from "./type";
import { createTags } from "../utils/creator";
import { Fields, Inputs } from "./type";

interface IResult {
    entity_type: string;
    entity: string;
    start_idx: number;
    end_idx: number;
}

interface IAPIRes {
    result: IResult[]
}

async function fetcher(line: string): Promise<IAPIRes> {
    return { "result": [{ "entity_type": "临床表现", "entity": "脑热", "start_idx": 0, "end_idx": 1 }, { "entity_type": "临床表现", "entity": "还有头晕眼花", "start_idx": 7, "end_idx": 12 }] }
    const res = await axios.get(`http://43.142.68.89:8000/test?text=${line}`);
    return res.data
}

export const getMachineResult = async (inputs: Inputs, fields: Fields):
    Promise<[textBlocksList: ITextBlocks[], tags: ITag[], blockId: number]> => {
    function fillPlainText(blocks: ITextBlocks, line: string, lineNumber: number): ITextBlocks {
        const emptyList = Array(line.length).fill(1)
        for (const block of blocks) {
            const { position: { start, end } } = block
            for (let i = start; i <= end; i++) {
                emptyList[i] = 0
            }
        }

        for (let i = 0; i < line.length; i++) {
            if (emptyList[i]) {
                let j = i + 1
                for (; emptyList[j]; j++) { }
                const [start, end] = [i, j - 1]
                blocks.push({
                    text: line.slice(start, end + 1),
                    type: '',
                    color: '',
                    isPlain: true,
                    id: blockId++,
                    selectable: true,
                    field: '',
                    position: {
                        lineNumber,
                        start,
                        end,
                    }
                })

                i = j + 1
            }
        }

        return blocks
            .sort((a, b) => {
                return a.position.start - b.position.start
            })
    }

    function resToBlocks(res: IAPIRes, lineNumber: number): ITextBlocks {
        return res.result.map(({ entity, entity_type, start_idx, end_idx }) => ({
            text: entity,
            type: typeMap.get(entity_type)!.type,
            isPlain: false,
            color: typeMap.get(entity_type)!.color,
            id: blockId++,
            selectable: true,
            field: entity_type,
            position: {
                lineNumber,
                start: start_idx,
                end: end_idx
            }
        }))
    }

    async function fetchToBlock(input: string): Promise<ITextBlocks> {
        const blocks = await Promise.all(input.split('\n').map(async (line, lineNumber) => {
            const data = await fetcher(line);
            const blocks = resToBlocks(data, lineNumber);
            return fillPlainText(blocks, line, lineNumber);
        }));

        return blocks.flat()
    }

    let blockId = 1
    const tags = createTags(fields)
    const typeMap = new Map<string, ITag>()
    tags.forEach((tag) => {
        typeMap.set(tag.field, tag)
    })

    const results = await Promise.all(inputs.map(async input => {
        return fetchToBlock(input);
    }))

    return [results, tags, blockId]
}