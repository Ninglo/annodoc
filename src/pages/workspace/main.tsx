import { FC, useState } from 'react';
import Container from '../../modal/container';
import { Entitys, Fields, Inputs } from '../../modal/type';
import Workspace from './components/workspace/workspace';
import Result from './components/result';
import './index.scss';

export interface WorkspaceProps {
    fields: Fields;
    inputs: Inputs;
}
const Main: FC<WorkspaceProps> = ({ fields, inputs }) => {
    const [container] = useState(new Container(fields, inputs));
    const [finishLoad, setFinishLoad] = useState(false);

    const [curtInput, setcurtInput] = useState(container.getCurtInput());
    const [next] = useState(() => (entitys: Entitys) => {
        const hasNext = container.loadEntitys(entitys);

        if (hasNext) {
            const curtInput = container.getCurtInput();
            setcurtInput(curtInput);
        } else {
            setFinishLoad(true);
        }
    });

    return finishLoad ? (
        <Result fields={fields} dataList={container.exportList()} dataText={container.export()} />
    ) : (
        <div className="main">
            <Workspace curtInput={curtInput} fields={fields} next={next} />
        </div>
    );
};

export default Main;
