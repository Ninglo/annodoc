import { UpdateView } from "../hooks/updateView";
import { Fields, HasNext, Inputs, Output, Outputs } from "./type";

export default class Container {
    private index = 0
    private outputs: Outputs = []
    constructor(private fields: Fields, private inputs: Inputs, private updateView: UpdateView) {}

    getFieldsLength() {
        return this.fields.length
    }

    getTotalSize() {
        return this.inputs
    }

    getCurrentInput() {
        return this.inputs[this.index]
    }

    loadOutput(output: Output): HasNext {
        if (output.datas.length !== this.fields.length) {
            throw new Error('datas length must be equal with fileds length!')
        }

        this.outputs.push(output)
        if (this.index < this.inputs.length - 1){
            this.index++
            return true
        } else {
            return false
        }
    }

    export() {
        return this.outputs
    }
}
