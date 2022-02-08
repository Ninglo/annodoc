import { FC, useEffect, useState } from "react";
import { ITag, ITextBlock } from "../type";
import { Fields } from "../../../modal/type";
import { createTags } from "../creator";
import TagButton from "./tagButton";

interface ITagButtonArea {
  idRef: React.MutableRefObject<number>;
  fields: Fields;
  setTextBlocks: React.Dispatch<React.SetStateAction<ITextBlock[]>>;
}
const TagButtonArea: FC<ITagButtonArea> = ({
  idRef,
  fields,
  setTextBlocks,
}) => {
  const [tags] = useState(() => createTags(fields));
  const updateTextBlocks = ({ type, field, color }: ITag) => {
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
              color: "",
              field: "",
              id: idRef.current++,
              selectable: true,
            },
            {
              isPlain: false,
              text: curt.text.slice(start, end),
              type,
              color: color,
              field,
              id: idRef.current++,
              selectable: true,
            },
            {
              isPlain: true,
              text: curt.text.slice(end),
              type: "",
              color: "",
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
  };

  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      const code = ev.key;
      const tag = tags.find((tag) => tag.type === code);
      if (!tag) {
        return;
      }

      updateTextBlocks(tag);
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);
  return (
    <div className="tag-btn-area">
      {tags.map((tag) => (
        <TagButton {...tag} onClick={() => updateTextBlocks(tag)} />
      ))}
    </div>
  );
};

export default TagButtonArea;
