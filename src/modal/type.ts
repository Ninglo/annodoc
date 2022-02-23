export type Field = string;
export type Fields = Field[];

export type Input = string;
export type Inputs = Input[];

export interface FieldDatas {
  field: Field;
  datas: string[];
}
export type Output = FieldDatas[];

export type Outputs = Output[];

export type HasNext = boolean;
export type DataList = string[][][];
