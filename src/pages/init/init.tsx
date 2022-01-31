import React, { FC, useCallback } from "react";
import { Fields, Inputs } from "../../modal/type";
import readBlob from "../../utils/readblob";

const parseFields = (text: string): Fields => {
  return text.split(" ");
};

const parseInputs = (text: string): Inputs => {
  return text.split("\n");
};

const ID_ENUMS = {
  FIELDS: "fields",
  INPUTS: "inputs",
} as const;
const SUBMIT_DATA = "Submit files";

interface IInit {
  setInited: React.Dispatch<React.SetStateAction<boolean>>;
  setFields: React.Dispatch<React.SetStateAction<string[]>>;
  setInputs: React.Dispatch<React.SetStateAction<string[]>>;
}
export const Init: FC<IInit> = ({ setInited, setFields, setInputs }) => {
  const onSubmitData = useCallback(async () => {
    const [fieldsFileText, inputsFileText] = await Promise.all([
      readBlob(ID_ENUMS.FIELDS),
      readBlob(ID_ENUMS.INPUTS),
    ]);

    setFields(parseFields(fieldsFileText));
    setInputs(parseInputs(inputsFileText));
    setInited(true);
  }, [setFields, setInited, setInputs]);

  return (
    <div>
      <input type="file" id={ID_ENUMS.FIELDS} name={ID_ENUMS.FIELDS} />
      <input type="file" id={ID_ENUMS.INPUTS} name={ID_ENUMS.INPUTS} />
      <button onClick={onSubmitData}>{SUBMIT_DATA}</button>
    </div>
  );
};
