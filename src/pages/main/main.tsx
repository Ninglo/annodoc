import { FC, useCallback, useEffect, useState } from "react";
import { Notification } from "@arco-design/web-react";

import Container from "../../modal/container";
import { Fields, Inputs, Output } from "../../modal/type";
import Workspace from "../workspace/workspace";

import "./index.scss";

function download(filename: string, text: string) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/csv;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
interface IMain {
  fields: Fields;
  inputs: Inputs;
}
const Main: FC<IMain> = ({ fields, inputs }) => {
  const [container] = useState(new Container(fields, inputs));
  const [finishLoad, setFinishLoad] = useState(false);

  const [curtInput, setcurtInput] = useState(container.getCurtInput());
  const next = useCallback(
    (output: Output) => {
      try {
        const hasNext = container.loadOutput(output);

        if (hasNext) {
          const curtInput = container.getCurtInput();
          setcurtInput(curtInput);
        } else {
          setFinishLoad(true);
        }
      } catch (error) {
        Notification.error({
          title: "Error",
          content: error instanceof Error ? error.message : String(error),
        });
      }
    },
    [container]
  );

  useEffect(() => {
    if (finishLoad) {
      download("output", container.export());
    }
  }, [container, finishLoad]);

  return finishLoad ? (
    <div>Done</div>
  ) : (
    <div className="main">
      <Workspace curtInput={curtInput} fields={fields} next={next} />
      <div className="progress">Progress</div>
    </div>
  );
};

export default Main;
