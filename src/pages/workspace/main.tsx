import { FC, useEffect, useRef, useState } from 'react';
import Container from '../../modal/container';
import { Entitys, Fields, Inputs } from '../../modal/type';
import Workspace from './components/workspace/workspace';
import Result from './components/result';
import './index.scss';
import { Origin, updateOrigin } from '../../modal/origin';

export interface WorkspaceProps {
    fields: Fields;
    inputs: Inputs;
    origin: Origin;
}
const Main: FC<WorkspaceProps> = ({ fields, inputs, origin }) => {
    const [container] = useState(new Container(fields, inputs));
    const [finishLoad, setFinishLoad] = useState(false);
    const isUploaded = useRef(false);

    useEffect(() => {
        if (finishLoad && !isUploaded.current) {
            isUploaded.current = true;

            updateOrigin({ ...origin, result: container.exportList() });
        }
    }, [container, finishLoad, origin]);

    const [curtInput, setcurtInput] = useState(container.getCurtInput());
    const [next] = useState(() => (entitys: Omit<Entitys, 'fileIndex'>) => {
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
