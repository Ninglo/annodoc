import { Button, Form, Grid, Input, Select, Table, Typography } from '@arco-design/web-react';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import { FC, useEffect, useState } from 'react';
import { Path } from '../../app';
import { getAuth } from '../../modal/auth';
import { getOrigins, GetOriginsProps, Origin, OriginType } from '../../modal/origin';
import Workspace, { WorkspaceProps } from '../workspace/main';
const { Row, Col } = Grid;
const FormItem = Form.Item;

const createColumns = (setWorkspace: React.Dispatch<React.SetStateAction<{} | WorkspaceProps>>): ColumnProps[] => [
    {
        title: '名称',
        dataIndex: 'name'
    },
    {
        title: '字段列表',
        dataIndex: 'fields'
    },
    {
        title: '状态',
        dataIndex: 'status'
    },
    {
        title: '操作',
        dataIndex: 'inputs',
        render(_, item) {
            const { status } = item;
            const { type } = getAuth();
            const onTag = () => setWorkspace({ fields: item.fields, inputs: item.inputs });
            return (
                <div>
                    {status !== OriginType.finish && <Button onClick={onTag}>标注</Button>}
                    {type === 'root' && <Button>Remove</Button>}
                </div>
            );
        }
    }
];

function isValid(workspace: WorkspaceProps | {}): workspace is WorkspaceProps {
    return !!Object.keys(workspace).length;
}

interface OriginsProps {
    goto(path: Path): void;
}
const Origins: FC<OriginsProps> = ({ goto }) => {
    const [origins, setOrigins] = useState<Origin[]>([]);
    const [workspace, setWorkspace] = useState<WorkspaceProps | {}>({});
    const columns = createColumns(setWorkspace);

    const updateTable = async (data: GetOriginsProps) => {
        const origins = await getOrigins(data);
        setOrigins(origins);
    };

    useEffect(() => {
        updateTable({});
    }, []);

    return isValid(workspace) ? (
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
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </FormItem>
            </Form>
            <Table columns={columns} data={origins}></Table>
        </div>
    );
};

export default Origins;
