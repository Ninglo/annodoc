import { Button, Form, Grid, Input, Typography, Upload as ArcoUpload } from '@arco-design/web-react';
import React, { FC, useCallback, useState } from 'react';
import { Path } from '../../app';
import { createOrigin } from '../../modal/origin';
import { Fields } from '../../modal/type';
import readBlob from '../../utils/readblob';
import './index.scss';
const { Title } = Typography;
const { Row, Col } = Grid;

const parseFields = (text: string): Fields => {
    return text.split(' ');
};

interface UploadProps {
    goto(path: Path): void;
}
const Upload: FC<UploadProps> = ({ goto }) => {
    const [name, setName] = useState('');
    const [fieldFile, setFieldFile] = useState<File | null>(null);
    const [textFiles, setTextsFile] = useState<File[]>([]);

    const onSubmitData = useCallback(async () => {
        if (!(fieldFile && textFiles.length)) {
            return;
        }

        const [fieldsFileText, ...dataFilesText] = await Promise.all([
            readBlob(fieldFile),
            ...textFiles.map((file) => readBlob(file))
        ]);

        createOrigin({
            name,
            fields: parseFields(fieldsFileText),
            inputs: dataFilesText
        });

        goto('/');
    }, [fieldFile, goto, name, textFiles]);

    return (
        <div>
            <Row style={{ marginBottom: 10 }}>
                <Col span={5} />
                <Title>上传标注</Title>
            </Row>
            <Form.Item label="名称" required>
                <Input onChange={setName} />
            </Form.Item>
            <Form.Item label="字段">
                <ArcoUpload limit={1} onChange={(fileList) => setFieldFile(fileList[0]?.originFile ?? null)} />
            </Form.Item>
            <Form.Item label="数据文件">
                <ArcoUpload
                    onChange={(datas) =>
                        setTextsFile(datas.filter((data) => data.originFile).map((data) => data.originFile!))
                    }
                />
            </Form.Item>
            <Row>
                <Col span={5} />
                <Button type="primary" onClick={onSubmitData} disabled={!(fieldFile && textFiles.length)}>
                    上传
                </Button>
            </Row>
        </div>
    );
};

export default Upload;