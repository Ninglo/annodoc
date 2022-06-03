import { Button, Form, Input, Select, Table, Typography, Grid } from '@arco-design/web-react'
import { ColumnProps } from '@arco-design/web-react/es/Table'
import { FC } from 'react'
import { GetOriginsProps, Origin, OriginType } from '../../modal/origin'
import { Noop } from '../../modal/type'
import { ITagWorkspaceDataProps } from '../workspace/main'
const { Row, Col } = Grid
const { Item: FormItem } = Form

export interface IOriginTableProps {
    origins: Origin[]
    setQuery: React.Dispatch<React.SetStateAction<GetOriginsProps>>
    removeOrigin: (id: number) => void
    gotoTagWorkspace: (workspace: Omit<ITagWorkspaceDataProps, 'container'>, type: 'human' | 'machine') => void
    updateResult: (result: Origin, submit: boolean) => void
    gotoCreateOrigin: Noop
}
export const OriginTable: FC<IOriginTableProps> = ({
    origins,
    setQuery,
    removeOrigin,
    gotoTagWorkspace,
    updateResult: gotoResult,
    gotoCreateOrigin
}) => {
    const columns: ColumnProps<Origin>[] = [
        {
            title: '名称',
            dataIndex: 'name'
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
    return <div>
        <Row>
            <Col span={20}>
                <Typography.Title>标注列表</Typography.Title>
            </Col>
            <Col span={4} style={{ display: 'flex', alignItems: 'center', marginTop: 44 }}>
                <Button type="primary" onClick={gotoCreateOrigin}>
                    创建标注
                </Button>
            </Col>
        </Row>
        <Form
            style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row' }}
            onSubmit={setQuery}
        >
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
            <FormItem>
                <Button
                    style={{
                        justifyContent: 'flex-end'
                    }}
                    type="primary"
                    htmlType="submit"
                >
                    提交
                </Button>
            </FormItem>
        </Form>
        <Table columns={columns} data={origins}></Table>
    </div>
}
