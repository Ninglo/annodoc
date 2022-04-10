import { Fields, HasNext, Inputs, Entitys, Input } from './type';

export default class Container {
    private index = 0;
    private entitys: Entitys = [];
    constructor(private fields: Fields, private inputs: Inputs) {}

    getFieldsLength(): number {
        return this.fields.length;
    }

    getTotalSize(): number {
        return this.inputs.length;
    }

    getCurtInput(): Input {
        return this.inputs[this.index];
    }

    loadEntitys(entitys: Entitys): HasNext {
        this.entitys.push(...entitys.map((entity) => ({ ...entity, fileIndex: this.index })));

        this.index++;
        return this.index < this.inputs.length;
    }

    exportList() {
        return this.entitys;
    }

    export(): string {
        return JSON.stringify(this.entitys);
    }
}
