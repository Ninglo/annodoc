import { useEffect, useRef } from 'react';
import { SetTextBlocks } from './useWorkspace';

export const useDisableSelect = (setTextBlocks: SetTextBlocks): React.RefObject<HTMLDivElement> => {
    const textAreaRef = useRef<HTMLDivElement>(null);
    const activeSpanIdRef = useRef(-1);
    useEffect(() => {
        const textArea = textAreaRef.current;
        if (!textArea) {
            return;
        }

        const updateSelectable = (ev: MouseEvent): void => {
            const target = ev.target as HTMLElement | null;
            if (!target) {
                return;
            }
            if (getSelection()?.type === 'Range') {
                return;
            }

            const id = target.dataset.id;
            if (String(activeSpanIdRef.current) === id) {
                return;
            }
            activeSpanIdRef.current = Number(id ? id : 0);

            setTextBlocks((textBlocks) => textBlocks.map((textBlock) => ({
                ...textBlock,
                selectable: String(textBlock.id) === id
            }))
            );
        };

        textArea.addEventListener('mousedown', (ev) => {
            getSelection()?.empty();
            activeSpanIdRef.current = -1;

            updateSelectable(ev);
        });
        textArea.addEventListener('mouseover', updateSelectable);
    }, []);

    return textAreaRef;
};
