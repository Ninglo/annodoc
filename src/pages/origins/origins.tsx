import { Button, Form, Grid, Input, Select, Table, Typography } from '@arco-design/web-react';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import { FC, useEffect, useState } from 'react';
import { Path } from '../../app';
// import { getAuth } from '../../modal/auth';
import { getOrigins, GetOriginsProps, Origin, OriginType, removeOrigin } from '../../modal/origin';
import Result from '../workspace/components/result';
import Workspace, { WorkspaceProps } from '../workspace/main';
const { Row, Col } = Grid;
const FormItem = Form.Item;

const createColumns = (
    setWorkspace: React.Dispatch<React.SetStateAction<null | WorkspaceProps>>,
    setResult: React.Dispatch<React.SetStateAction<Origin | null>>
): ColumnProps[] => [
    {
        title: '名称',
        dataIndex: 'name'
    },
    {
        title: '字段列表',
        dataIndex: 'fields',
        render(fields) {
            return fields?.join(' ');
        }
    },
    {
        title: '状态',
        dataIndex: 'status',
        render(status) {
            return status === OriginType.begin ? '待标注' : '已完成';
        }
    },
    {
        title: '操作',
        dataIndex: 'inputs',
        render(_, item) {
            const { status } = item;
            // const { type } = getAuth();
            const onTag = () => setWorkspace({ fields: item.fields, inputs: item.inputs, origin: item });
            const onResult = () => setResult(item);
            const onDelete = async () => {
                await removeOrigin(item._id);
                window.location.href = '';
            };
            return (
                <div>
                    {status !== OriginType.finish && (
                        <Button onClick={onTag} style={{ marginRight: 8 }}>
                            标注
                        </Button>
                    )}
                    {status === OriginType.finish && (
                        <Button onClick={onResult} style={{ marginRight: 8 }}>
                            查看结果
                        </Button>
                    )}
                    {<Button onClick={onDelete}>移除</Button>}
                </div>
            );
        }
    }
];

function isValid(workspace: WorkspaceProps | null): workspace is WorkspaceProps {
    return !!workspace;
}

interface OriginsProps {
    goto(path: Path): void;
}
const Origins: FC<OriginsProps> = ({ goto }) => {
    const [origins, setOrigins] = useState<Origin[]>([]);
    const [workspace, setWorkspace] = useState<WorkspaceProps | null>(null);
    const [result, setResult] = useState<Origin | null>(null);
    const columns = createColumns(setWorkspace, setResult);

    const updateTable = async (data?: GetOriginsProps) => {
        const origins = (await getOrigins()) ?? [];
        setOrigins(
            data?.name && data?.status
                ? origins
                      .filter((origin) => origin.name.includes(data?.name ?? ''))
                      .filter((origin) => origin.status === data?.status)
                : data?.name
                ? origins.filter((origin) => origin.name.includes(data?.name ?? ''))
                : data?.status
                ? origins.filter((origin) => origin.status === data?.status)
                : origins
        );
    };

    useEffect(() => {
        updateTable();
    }, []);

    return result ? (
        <Result fields={result.fields} dataList={result.result} dataText={JSON.stringify(result.result)} />
    ) : isValid(workspace) ? (
        <Workspace {...workspace} />
    ) : (
        <div>
            <Row>
                <Col span={20}>
                    <Typography.Title>标注列表</Typography.Title>
                </Col>
                {/* <Button onClick={() => goto('/createUser')}>Create User</Button> */}
                <Col span={4} style={{ display: 'flex', alignItems: 'center', marginTop: 44 }}>
                    <Button type="primary" onClick={() => goto('/createOrigin')}>
                        创建标注
                    </Button>
                </Col>
            </Row>
            <Form
                style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row' }}
                onSubmit={updateTable}
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
                        ]}
                    ></Select>
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
    );
};

export default Origins;
