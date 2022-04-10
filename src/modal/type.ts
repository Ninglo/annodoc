export type Field = string;
export type Fields = Field[];

export type Input = string;
export type Inputs = Input[];

export type Entitys = Entity[];

export type HasNext = boolean;

export interface Position {
    lineNumber: number;
    start: number;
    end: number;
}

export interface Entity {
    name: string;
    value: string;
    fileIndex: number;
    position: Position;
}
