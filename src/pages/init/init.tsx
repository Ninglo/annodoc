import { Button, Form, Grid, Typography, Upload } from "@arco-design/web-react";
import React, { FC, useCallback, useState } from "react";
import { Fields } from "../../modal/type";
import readBlob from "../../utils/readblob";
import "./index.scss";
const { Title } = Typography;
const { Row, Col } = Grid;

const parseFields = (text: string): Fields => {
  return text.split(" ");
};

interface IInit {
  setInited: React.Dispatch<React.SetStateAction<boolean>>;
  setFields: React.Dispatch<React.SetStateAction<Fields>>;
  setInputs: React.Dispatch<React.SetStateAction<string[]>>;
}
export const Init: FC<IInit> = ({ setInited, setFields, setInputs }) => {
  const [fieldFile, setFieldFile] = useState<File | null>(null);
  const [textFiles, setTextsFile] = useState<File[]>([]);
  const onSubmitData = useCallback(async () => {
    if (!(fieldFile && textFiles.length)) {
      return;
    }

    const [fieldsFileText, ...dataFilesText] = await Promise.all([
      readBlob(fieldFile),
      ...textFiles.map((file) => readBlob(file)),
    ]);

    setFields(parseFields(fieldsFileText));
    setInputs(dataFilesText);
    setInited(true);
  }, [fieldFile, textFiles, setFields, setInputs, setInited]);

  return (
    <div>
      <Row style={{ marginBottom: 10 }}>
        <Col span={5} />
        <Title>Load</Title>
      </Row>
      <Form.Item label="Field">
        <Upload
          limit={1}
          onChange={(fileList) => setFieldFile(fileList[0]?.originFile ?? null)}
        />
      </Form.Item>
      <Form.Item label="Datas">
        <Upload
          onChange={(datas) =>
            setTextsFile(
              datas
                .filter((data) => data.originFile)
                .map((data) => data.originFile!)
            )
          }
        />
      </Form.Item>
      <Row>
        <Col span={5} />
        <Button
          type="primary"
          onClick={onSubmitData}
          disabled={!(fieldFile && textFiles.length)}
        >
          上传
        </Button>
      </Row>
    </div>
  );
};
