import { Fields, Output } from "../../modal/type";

export interface ITextBlock {
  text: string;
  type: string;
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
