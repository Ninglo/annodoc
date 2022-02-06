import { Button, Upload } from "@arco-design/web-react";
import React, { FC, useCallback, useState } from "react";
import { Fields, Inputs } from "../../modal/type";
import readBlob from "../../utils/readblob";

const parseFields = (text: string): Fields => {
  return text.split(" ");
};

const parseInputs = (text: string): Inputs => {
  return text.split("\n");
};

interface IInit {
  setInited: React.Dispatch<React.SetStateAction<boolean>>;
  setFields: React.Dispatch<React.SetStateAction<string[]>>;
  setInputs: React.Dispatch<React.SetStateAction<string[]>>;
}
export const Init: FC<IInit> = ({ setInited, setFields, setInputs }) => {
  const [fieldFile, setFieldFile] = useState<File | null>(null);
  const [textsFile, setTextsFile] = useState<File | null>(null);
  const onSubmitData = useCallback(async () => {
    if (!fieldFile || !textsFile) {
      return;
    }

    const [fieldsFileText, inputsFileText] = await Promise.all([
      readBlob(fieldFile),
      readBlob(textsFile),
    ]);

    setFields(parseFields(fieldsFileText));
    setInputs(parseInputs(inputsFileText));
    setInited(true);
  }, [fieldFile, textsFile, setFields, setInited, setInputs]);

  return (
    <div>
      <Upload
        limit={1}
        onChange={(fileList) => setFieldFile(fileList[0]?.originFile ?? null)}
      />
      <Upload
        limit={1}
        onChange={(fileList) => setTextsFile(fileList[0]?.originFile ?? null)}
      />
      <Button onClick={onSubmitData} disabled={!(fieldFile && textsFile)}>
        上传
      </Button>
    </div>
  );
};
