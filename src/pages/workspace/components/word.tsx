import { Tooltip } from "@arco-design/web-react";
import { IconCloseCircle } from "@arco-design/web-react/icon";
import { FC } from "react";
import { IWord } from "../type";

const Word: FC<IWord> = ({
  text,
  type,
  color,
  field,
  isPlain,
  id,
  selectable,
  removeTag,
}) => {
  return (
    <Tooltip mini disabled={isPlain} content={field}>
      <span
        className={selectable && isPlain ? "selectable" : !isPlain ? "tag" : ""}
        style={!isPlain ? { background: color } : {}}
        data-id={id}
      >
        {text}
        {!isPlain && (
          <IconCloseCircle
            className="icon"
            onClick={() => {
              removeTag(id);
            }}
          />
        )}
      </span>
    </Tooltip>
  );
};

export default Word;
