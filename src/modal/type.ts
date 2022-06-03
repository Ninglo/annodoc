export type Field = string
export type Fields = Field[]

export type Input = string
export type Inputs = Input[]

export type Entitys = Entity[]

export type HasNext = boolean

export interface Position {
    lineNumber: number
    start: number
    end: number
}

export interface Entity {
    name: string
    value: string
    fileIndex: number
    position: Position
}

export type Noop = () => void

export type ITextBlocks = ITextBlock[]
export interface ITextBlock {
    text: string
    type?: string
    color?: string
    isPlain: boolean
    id: number
    selectable: boolean
    field: string
    position: Position
}

export interface ITag {
    color: string;
    field: Field;
    type: string;
}
