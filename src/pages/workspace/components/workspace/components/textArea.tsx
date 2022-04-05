import { FC, useCallback, useEffect, useRef } from 'react';
import Word from './word';
import { ITextBlock } from '../type';

interface ITextArea {
    textBlocks: ITextBlock[];
    setTextBlocks: React.Dispatch<React.SetStateAction<ITextBlock[]>>;
}
const TextArea: FC<ITextArea> = ({ textBlocks, setTextBlocks }) => {
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

            setTextBlocks((textBlocks) =>
                textBlocks.map((textBlock) => ({
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
    }, [setTextBlocks]);

    const removeTag = useCallback(
        (id: number) => {
            const combineText = (textBlocks: ITextBlock[]): ITextBlock[] => {
                const tagIndex = textBlocks.findIndex((item) => item.id === id);

                return textBlocks.reduce((prev, curt, index) => {
                    if (tagIndex === index) {
                        const before = textBlocks[tagIndex - 1];
                        const after = textBlocks[tagIndex + 1];

                        const beforeText = before?.isPlain ? before.text : '';
                        const afterText = after?.isPlain ? after.text : '';
                        const text = beforeText + textBlocks[tagIndex].text + afterText;

                        return prev.concat({
                            ...curt,
                            isPlain: true,
                            type: '',
                            field: '',
                            text
                        });
                    } else if ((index === tagIndex - 1 || index === tagIndex + 1) && curt.isPlain) {
                        return prev;
                    } else {
                        return prev.concat(curt);
                    }
                }, [] as ITextBlock[]);
            };

            setTextBlocks(combineText);
        },
        [setTextBlocks]
    );

    return (
        <div className="text-area" ref={textAreaRef}>
            {textBlocks.map((textBlock) => (
                <Word key={textBlock.id} removeTag={removeTag} {...textBlock} />
            ))}
        </div>
    );
};

export default TextArea;
