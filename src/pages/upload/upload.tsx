import { Button, Form, Input, PageHeader, Upload as ArcoUpload } from '@arco-design/web-react'
import { FC, useCallback, useState } from 'react'
import { createOrigin } from '../../modal/origin'
import { Fields } from '../../modal/type'
import readBlob from '../../utils/readblob'
import './index.scss'

const parseFields = (text: string): Fields => {
    return text.split(' ')
}

const Upload: FC = () => {
    const [name, setName] = useState('')
    const [fields, setFields] = useState('')
    const [textFiles, setTextsFile] = useState<File[]>([])

    const onSubmitData = useCallback(async () => {
        if (!(fields && textFiles.length)) {
            return
        }

        const dataFilesText = await Promise.all(
            textFiles.map((file) => readBlob(file))
        )

        await createOrigin({
            name,
            fields: parseFields(fields),
            inputs: dataFilesText,
            result: []
        })

        window.location.href = '/'
    }, [fields, name, textFiles])

    return (
        <div className='upload-content'>
            <PageHeader
                title='上传标注文本'
                subTitle='上传标注数据至服务器'
            />
            <Form.Item labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="名称" required>
                <Input onChange={setName} />
            </Form.Item>
            <Form.Item labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="字段列表" required extra="字段间以空格分隔, 如 “field1 field2 field3“">
                <Input onChange={(text) => setFields(text)} />
            </Form.Item>
            <Form.Item labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="数据文件">
                <ArcoUpload
                    onChange={(datas) =>
                        setTextsFile(datas.filter((data) => data.originFile).map((data) => data.originFile!))
                    }
                />
            </Form.Item>
            <div className='upload-btn'>
                <Button type="primary" onClick={onSubmitData} disabled={!(fields && textFiles.length)}>
                    上传
                </Button>
            </div>
        </div>
    )
}

export default Upload
