import { Button, Form, Input, PageHeader, Select, Table } from '@arco-design/web-react'
import { ColumnProps } from '@arco-design/web-react/es/Table'
import { FC } from 'react'
import { GetOriginsProps, Origin, OriginType } from '../../modal/origin'
import { ITagWorkspaceDataProps } from '../workspace/main'
import './index.scss'
const { Item: FormItem } = Form

export interface IOriginTableProps {
    origins: Origin[]
    setQuery: React.Dispatch<React.SetStateAction<GetOriginsProps>>
    removeOrigin: (id: number) => void
    gotoTagWorkspace: (workspace: Omit<ITagWorkspaceDataProps, 'container'>, type: 'human' | 'machine') => void
    updateResult: (result: Origin, submit: boolean) => void
}
export const OriginTable: FC<IOriginTableProps> = ({
    origins,
    setQuery,
    removeOrigin,
    gotoTagWorkspace,
    updateResult: gotoResult
}) => {
    const columns: ColumnProps<Origin>[] = [
        {
            title: '名称',
            dataIndex: 'name',
            headerCellStyle: {
                height: 64
            }
        },
        {
            title: '字段列表',
            dataIndex: 'fields',
            render(fields) {
                return fields?.join(' ')
            }
        },
        {
            title: '状态',
            dataIndex: 'status',
            render(status) {
                return status === OriginType.begin ? '待标注' : '已完成'
            }
        },
        {
            title: '操作',
            dataIndex: 'inputs',
            render(_, origin) {
                const { _id, status, fields, inputs } = origin ?? {}
                return (
                    <div>
                        {status !== OriginType.finish && (
                            <Button onClick={() => gotoTagWorkspace({ fields, inputs, origin }, 'human')} style={{ marginRight: 8 }}>
                                人标人审
                            </Button>
                        )}
                        {status !== OriginType.finish && (
                            <Button onClick={() => gotoTagWorkspace({ fields, inputs, origin }, 'machine')} style={{ marginRight: 8 }}>
                                机标人审
                            </Button>
                        )}
                        {status === OriginType.finish && (
                            <Button onClick={() => gotoResult(origin, false)} style={{ marginRight: 8 }}>
                                查看结果
                            </Button>
                        )}
                        {<Button onClick={() => removeOrigin(_id)}>移除</Button>}
                    </div>
                )
            }
        }
    ]
    return <div className='origin-list'>
        <PageHeader
            title='标注文本列表'
            subTitle='展示所有标注文本'
        />
        <Form
            labelCol={{ span: 3, offset: 0 }}
            wrapperCol={{ span: 16 }}
            style={{ display: 'flex', justifyContent: 'space-around' }}
            onSubmit={setQuery}
        >
            <div className="origin-form">
                <div className='form-left'>
                    <FormItem field="name" label="名称: ">
                        <Input />
                    </FormItem>
                    <FormItem field="status" label="状态: ">
                        <Select
                            options={[
                                { label: '未开始', value: OriginType.begin },
                                { label: '标记中', value: OriginType.doing },
                                { label: '完成', value: OriginType.finish }
                            ]} />
                    </FormItem>
                </div>
                <div className='form-right'>
                    <Button
                        style={{
                            justifyContent: 'flex-end'
                        }}
                        type="primary"
                        htmlType="submit"
                    >
                        提交
                    </Button>
                </div>
            </div>
        </Form >
        <Table border={false} columns={columns} data={origins}></Table>
    </div >
}
