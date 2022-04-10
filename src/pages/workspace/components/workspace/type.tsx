import { Entity, Entitys, Field, Fields, Position } from '../../../../modal/type';

export interface ITextBlock {
    text: string;
    type?: string;
    color?: string;
    isPlain: boolean;
    id: number;
    selectable: boolean;
    field: string;
    position: Position;
}

export interface IWorkspace {
    curtInput: string;
    fields: Fields;
    next: (entitys: Omit<Entity, 'fileIndex'>[]) => void;
}
export interface IWord extends ITextBlock {
    removeTag: (id: number) => void;
}

export interface ITag {
    color: string;
    field: Field;
    type: string;
}

export interface ITagButton {
    type: string;
    field: Field;
    color: string;
    onClick: () => void;
}
