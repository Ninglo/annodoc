import { ITextBlock } from "../../../modal/type";
import { ITagWorkspaceProps } from '../main';
import container from '../../../modal/container';
import { Origin } from '../../../modal/origin';
import { SetTextBlocks } from './useWorkspace';

export function usePrevNext(container: container, textBlocks: ITextBlock[], setTextBlocks: SetTextBlocks, onFinished: ITagWorkspaceProps['onFinished'], origin: Origin) {
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
