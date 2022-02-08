import { FC, useEffect, useRef, useState } from "react";
import { ITextBlock, IWorkspace } from "./type";
import { Output } from "../../modal/type";
import NextBtn from "./components/nextBtn";
import TextArea from "./components/textArea";
import "./index.scss";
import TagButtonArea from "./components/tagButtonArea";

const Workspace: FC<IWorkspace> = ({ curtInput, fields, next }) => {
  const idRef = useRef(1);
  const [textBlocks, setTextBlocks] = useState<ITextBlock[]>([]);
  useEffect(() => {
    setTextBlocks(() => [
      {
        isPlain: true,
        text: curtInput,
        type: "",
        color: "",
        id: idRef.current++,
        selectable: true,
        field: "",
      },
    ]);
  }, [curtInput]);

  const toNext = () => {
    const output = textBlocks
      .filter((textBlock) => !textBlock.isPlain)
      .reduce((prev, curt) => {
        const index = prev.findIndex((item) => item.field === curt.field);
        if (index === -1) {
          return prev.concat({ field: curt.field, datas: [curt.text] });
        } else {
          prev[index].datas.push(curt.text);
          return prev;
        }
      }, [] as Output);
    next(output);
  };

  return (
    <div className="workspace">
      <div className="content-area">
        <TagButtonArea
          idRef={idRef}
          fields={fields}
          setTextBlocks={setTextBlocks}
        />
        <TextArea textBlocks={textBlocks} setTextBlocks={setTextBlocks} />
      </div>
      <NextBtn onClick={toNext} />
    </div>
  );
};

export default Workspace;
