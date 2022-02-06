import { Fields, HasNext, Inputs, Output, Outputs } from "./type";

export default class Container {
  private index = 0;
  private outputs: Outputs = [];
  constructor(private fields: Fields, private inputs: Inputs) {}

  getFieldsLength() {
    return this.fields.length;
  }

  getTotalSize() {
    return this.inputs;
  }

  getCurtInput() {
    return this.inputs[this.index];
  }

  loadOutput(output: Output): HasNext {
    this.outputs.push(output);

    this.index++;
    return this.index < this.inputs.length;
  }

  export() {
    const fieldsText = this.fields.join(", ");
    const fieldIndexMap = this.fields.reduce((prev, curt, i) => {
      prev[curt] = i;
      return prev;
    }, {} as Record<string, number>);

    const datasText = this.outputs
      .map((output) => {
        return output
          .reduce((list, curt) => {
            const curtIndex = fieldIndexMap[curt.field];
            list[curtIndex] = curt.datas.join(" ");
            return list;
          }, Array(this.fields.length).fill(""))
          .join(", ");
      })
      .join("\n");

    return `${fieldsText}\n${datasText}`;
  }
}
