import { ITag } from '../pages/workspace/components/workspace/type'
import { Fields } from '../modal/type'

export const createColors = (length: number): string[] => {
    const s = '100%'
    const v = '35%'

    let arr = []
    for (let i = 0 i < length i++) {
        const h = (i / length + 1) * 360
        arr.push(`hsl(${h}, ${s}, ${v})`)
    }
    return arr
}

const TypeList = [
    'q',
    'w',
    'e',
    'r',
    'a',
    's',
    'd',
    'f',
    'z',
    'x',
    'c',
    'v',
    't',
    'y',
    'u',
    'g',
    'h',
    'j',
    'k',
    'b',
    'n',
    'm'
] as const
export const createTypes = (length: number): string[] => {
    if (length <= TypeList.length) {
        return TypeList.slice(0, length)
    } else {
        return TypeList.concat(Array(length - TypeList.length).fill(''))
    }
}

export const createTags = (fields: Fields): ITag[] => {
    const colors = createColors(fields.length)
    const types = createTypes(fields.length)
    return colors.map((color, i) => {
        return {
            color,
            field: fields[i],
            type: types[i]
        }
    })
}
