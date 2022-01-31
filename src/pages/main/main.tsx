import {
  FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useUpdateView } from "../../hooks/updateView";
import { Notification, Table } from "@arco-design/web-react";

import Container from "../../modal/container";
import { Fields, Inputs, Output, Outputs } from "../../modal/type";

let listened = false;
function listenNumberEvent(ref: MutableRefObject<Output>, cb?: Function): void {
  if (listened) {
    return;
  }
  listened = true;

  document.addEventListener("keydown", (ev: KeyboardEvent) => {
    const selection = getSelection()?.toString();
    if (selection) {
      ref.current.datas.push(selection);
      cb?.();
    }
  });
}

interface IMain {
  fields: Fields;
  inputs: Inputs;
}
const Main: FC<IMain> = ({ fields, inputs }) => {
  const updateView = useUpdateView();
  const [container] = useState(new Container(fields, inputs, updateView));
  const [finishLoad, setFinishLoad] = useState(false);

  const [currentInput, setCurrentInput] = useState(container.getCurrentInput());
  const outputRef = useRef<Output>({ id: 0, datas: [] });
  const next = useCallback(() => {
    try {
      const hasNext = container.loadOutput(outputRef.current);

      if (hasNext) {
        const currentInput = container.getCurrentInput();
        setCurrentInput(currentInput);
      } else {
        setFinishLoad(true);
      }

      outputRef.current = { id: outputRef.current.id + 1, datas: [] };
    } catch (error) {
      Notification.error({
        title: "Error",
        content: error instanceof Error ? error.message : String(error),
      });
    }
  }, [container]);

  useEffect(() => {
    listenNumberEvent(outputRef, () => {
      updateView();
      if (outputRef.current.datas.length > container.getFieldsLength()) {
        outputRef.current.datas.pop();
      }
    });
  }, [container, next, updateView]);

  return (
    <Workspace
      finishLoad={finishLoad}
      currentInput={currentInput}
      fields={fields}
      outputs={container.export()}
      output={outputRef.current}
      next={next}
    />
  );
};

interface IWorkspace {
  finishLoad: boolean;
  currentInput: string;
  fields: Fields;
  outputs: Outputs;
  output: Output;
  next: () => void;
}
const Workspace: FC<IWorkspace> = ({
  finishLoad,
  currentInput,
  fields,
  outputs,
  output,
  next,
}) => {
  return finishLoad ? (
    <div>
      {"done"}
      <Table
        columns={fields.map((field) => ({
          title: field,
          dataIndex: field,
        }))}
        data={outputs.map((output) =>
          output.datas.reduce(
            (prev, data, i) => ({
              ...prev,
              [fields[i]]: data,
            }),
            {}
          )
        )}
      />
    </div>
  ) : (
    <div>
      <div>{currentInput}</div>
      <button onClick={next}>Next</button>
      <DataTable fields={fields} output={output} />
    </div>
  );
};

interface IDataTable {
  fields: Fields;
  output: Output;
}
const DataTable: FC<IDataTable> = ({ fields, output }) => {
  return (
    <Table
      columns={fields.map((field) => ({
        title: field,
        dataIndex: field,
      }))}
      data={[
        output.datas.reduce(
          (prev, data, i) => ({
            ...prev,
            [fields[i]]: data,
          }),
          {}
        ),
      ]}
    />
  );
};

export default Main;
