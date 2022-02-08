import { FC, useCallback, useState } from "react";
import { Notification } from "@arco-design/web-react";
import Container from "../../modal/container";
import { Fields, Inputs, Output } from "../../modal/type";
import Workspace from "../workspace/workspace";
import Result from "./components/result";
import "./index.scss";

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

  return finishLoad ? (
    <Result
      fields={fields}
      dataList={container.exportList()}
      dataText={container.export()}
    />
  ) : (
    <div className="main">
      <Workspace curtInput={curtInput} fields={fields} next={next} />
      {/* <div className="progress">Progress</div> */}
    </div>
  );
};

export default Main;
