import { Button, Form, Grid, Input, Typography, Upload as ArcoUpload } from '@arco-design/web-react'
import { FC, useCallback, useState } from 'react'
import { createOrigin } from '../../modal/origin'
import { Fields } from '../../modal/type'
import readBlob from '../../utils/readblob'
import './index.scss'

const { Title } = Typography
const { Row, Col } = Grid

const parseFields = (text: string): Fields => {
    return text.split(' ')
}

const Upload: FC = () => {
    const [name, setName] = useState('')
    const [fieldFile, setFieldFile] = useState<File | null>(null)
    const [textFiles, setTextsFile] = useState<File[]>([])

    const onSubmitData = useCallback(async () => {
        if (!(fieldFile && textFiles.length)) {
            return
        }

        const [fieldsFileText, ...dataFilesText] = await Promise.all([
            readBlob(fieldFile),
            ...textFiles.map((file) => readBlob(file))
        ])

        await createOrigin({
            name,
            fields: parseFields(fieldsFileText),
            inputs: dataFilesText,
            result: []
        })

        window.location.href = '/'
    }, [fieldFile, name, textFiles])

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
    )
}

export default Upload
