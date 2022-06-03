import { ITextBlock } from "../../../modal/type";
import container from '../../../modal/container';
import { Origin } from '../../../modal/origin';
import { SetTextBlocks } from './useWorkspace';
import { useResult } from "../../../hooks/data/useResult";

export function usePrevNext(container: container, textBlocks: ITextBlock[], setTextBlocks: SetTextBlocks, origin: Origin) {
    const { updateResult: onFinished } = useResult()
    const prev = () => {
        if (!container.hasPrev) { return; }

        container.loadCurtTextBlocks(textBlocks);
        container.index--;
        setTextBlocks(container.curtTextBlocks);
    };

    const next = () => {
        container.loadCurtTextBlocks(textBlocks);
        if (container.isFinished()) {
            onFinished({
                ...origin,
                result: container.exportList()
            }, true);
        } else {
            container.index++;
            setTextBlocks(container.curtTextBlocks);
        }
    };
    return { prev, next };
}
