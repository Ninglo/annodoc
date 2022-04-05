import { Button } from "@arco-design/web-react";
import { FC } from "react";
import { ITagButton } from "../type";

const TagButton: FC<ITagButton> = ({ type, field, color, onClick }) => {
  return (
    <div className="tag-btn" onClick={onClick}>
      <Button className="tag-btn-left" style={{ background: color }}>
        {field}
      </Button>
      <div className="tag-btn-right">{type}</div>
    </div>
  );
};

export default TagButton;
