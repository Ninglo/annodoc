import { IconCloseCircle } from "@arco-design/web-react/icon";
import { FC } from "react";
import { IWord } from "./type";

export const Word: FC<IWord> = ({
  text,
  type,
  isPlain,
  id,
  selectable,
  removeTag,
}) => {
  return (
    <span
      className={selectable && isPlain ? "selectable" : ""}
      style={!isPlain ? { border: "1px solid red" } : {}}
      data-id={id}
    >
      {text}
      <span style={{ color: "red" }}>{type}</span>
      {!isPlain && (
        <IconCloseCircle
          onClick={() => {
            removeTag(id);
          }}
        />
      )}
    </span>
  );
};
