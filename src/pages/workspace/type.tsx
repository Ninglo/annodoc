import { Field, Fields, Output } from "../../modal/type";

export interface ITextBlock {
  text: string;
  type?: string;
  color?: string;
  isPlain: boolean;
  id: number;
  selectable: boolean;
  field: string;
}

export interface IWorkspace {
  curtInput: string;
  fields: Fields;
  next: (output: Output) => void;
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
