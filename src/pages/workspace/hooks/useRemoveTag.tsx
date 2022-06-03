import { ITextBlock } from "../../../modal/type";
import { SetTextBlocks } from './useWorkspace';

export function useRemoveTag(setTextBlocks: SetTextBlocks) {
    return (id: number) => {
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
    };
}
