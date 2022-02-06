import { FC, useCallback, useEffect, useRef, useState } from "react";
import "./index.scss";
import { Word } from "./word";
import { ITextBlock, IWorkspace } from "./type";
import { Button } from "@arco-design/web-react";
import { Field, Fields, Output } from "../../modal/type";

const createColors = (length: number) => {
  return Array.from(Array(length)).map((_, i) => String(i));
};
const createTypes = (length: number) => {
  return Array.from(Array(length)).map((_, i) => String(i));
};

interface ITag {
  color: string;
  field: Field;
  type: string;
}
const createTags = (fields: Fields): ITag[] => {
  const colors = createColors(fields.length);
  const types = createTypes(fields.length);
  return colors.map((color, i) => {
    return {
      color,
      field: fields[i],
      type: types[i],
    };
  });
};

const Workspace: FC<IWorkspace> = ({ curtInput, fields, next }) => {
  const idRef = useRef(1);
  const [textBlocks, setTextBlocks] = useState<ITextBlock[]>([]);
  useEffect(() => {
    setTextBlocks(() => [
      {
        isPlain: true,
        text: curtInput,
        type: "",
        id: idRef.current++,
        selectable: true,
        field: "",
      },
    ]);
  }, [curtInput]);

  const [tags] = useState(createTags(fields));
  const handle = useCallback((type: string, field: Field) => {
    const selection = getSelection();
    if (!selection) {
      return;
    }
    const id = selection.anchorNode?.parentElement?.dataset?.id;
    if (!id) {
      return;
    }
    const [start, end] = [selection.anchorOffset, selection.focusOffset].sort(
      (a, b) => a - b
    );
    setTextBlocks((textBlocks) => {
      const res = textBlocks.reduce((prev, curt) => {
        if (String(curt.id) === id) {
          const curtItems = [
            {
              isPlain: true,
              text: curt.text.slice(0, start),
              type: "",
              field: "",
              id: idRef.current++,
              selectable: true,
            },
            {
              isPlain: false,
              text: curt.text.slice(start, end),
              type,
              field,
              id: idRef.current++,
              selectable: true,
            },
            {
              isPlain: true,
              text: curt.text.slice(end),
              type: "",
              field: "",
              id: idRef.current++,
              selectable: true,
            },
          ].filter((item) => item.text);

          return [...prev, ...curtItems];
        } else {
          return prev.concat(curt);
        }
      }, [] as ITextBlock[]);
      return res;
    });
  }, []);

  const domRef = useRef<HTMLDivElement>(null);
  const activeSpanIdRef = useRef(-1);
  useEffect(() => {
    const dom = domRef.current;
    if (!dom) {
      return;
    }

    const updateSelectable = (ev: MouseEvent): void => {
      const target = ev.target as HTMLElement | null;
      if (!target) {
        return;
      }
      if (getSelection()?.type === "Range") {
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
          selectable: String(textBlock.id) === id,
        }))
      );
    };

    dom.addEventListener("mousedown", (ev) => {
      getSelection()?.empty();
      activeSpanIdRef.current = -1;

      updateSelectable(ev);
    });
    dom.addEventListener("mouseover", updateSelectable);
  }, []);

  const removeTag = useCallback((id: number) => {
    const combineText = (textBlocks: ITextBlock[]): ITextBlock[] => {
      const tagIndex = textBlocks.findIndex((item) => item.id === id);

      return textBlocks.reduce((prev, curt, index) => {
        if (tagIndex === index) {
          const before = textBlocks[tagIndex - 1];
          const after = textBlocks[tagIndex + 1];

          const beforeText = before?.isPlain ? before.text : "";
          const afterText = after?.isPlain ? after.text : "";
          const text = beforeText + textBlocks[tagIndex].text + afterText;

          return prev.concat({
            ...curt,
            isPlain: true,
            type: "",
            field: "",
            text,
          });
        } else if (
          (index === tagIndex - 1 || index === tagIndex + 1) &&
          curt.isPlain
        ) {
          return prev;
        } else {
          return prev.concat(curt);
        }
      }, [] as ITextBlock[]);
    };

    setTextBlocks(combineText);
  }, []);

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
        <div className="tag-btn-area">
          {tags.map((tag) => (
            <Button
              className="tag-btn"
              onClick={() => handle(tag.type, tag.field)}
            >
              {tag.field}
            </Button>
          ))}
        </div>
        <div className="text-area" ref={domRef}>
          {textBlocks.map((textBlock) => (
            <Word key={textBlock.id} removeTag={removeTag} {...textBlock} />
          ))}
        </div>
      </div>
      <Button onClick={toNext}>Next</Button>
    </div>
  );
};

export default Workspace;
