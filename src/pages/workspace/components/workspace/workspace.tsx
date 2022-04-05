import { FC, useEffect, useRef, useState } from 'react';
import { ITextBlock, IWorkspace } from './type';
import { Entity, Entitys } from '../../../../modal/type';
import NextBtn from './components/nextBtn';
import TextArea from './components/textArea';
import './index.scss';
import TagButtonArea from './components/tagButtonArea';

const Workspace: FC<IWorkspace> = ({ curtInput, fields, next }) => {
    const idRef = useRef(1);
    const [textBlocks, setTextBlocks] = useState<ITextBlock[]>([]);
    useEffect(() => {
        setTextBlocks(() =>
            curtInput.split('\n').map((line, lineNumber) => ({
                isPlain: true,
                text: `${line}\n`,
                type: '',
                color: '',
                id: idRef.current++,
                selectable: true,
                field: '',
                position: {
                    lineNumber,
                    start: 0,
                    end: line.length - 1
                }
            }))
        );
    }, [curtInput]);

    const toNext = () => {
        next(
            textBlocks
                .filter((textBlock) => !textBlock.isPlain)
                .map((textBlock) => ({
                    name: textBlock.field,
                    value: textBlock.text,
                    position: textBlock.position
                }))
        );
    };

    return (
        <div className="workspace">
            <div className="content-area">
                <TagButtonArea idRef={idRef} fields={fields} setTextBlocks={setTextBlocks} />
                <TextArea textBlocks={textBlocks} setTextBlocks={setTextBlocks} />
            </div>
            <NextBtn onClick={toNext} />
        </div>
    );
};

export default Workspace;
