import { FC } from 'react';
import { Button, Table } from '@arco-design/web-react';
import { Entitys, Fields } from '../../../modal/type';
import { download } from '../../../utils/download';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import Title from '@arco-design/web-react/es/Typography/title';

const columns: ColumnProps[] = [
    {
        title: '行数',
        dataIndex: 'position.lineNumber',
        sorter(a, b) {
            return a - b;
        }
    },
    {
        title: '实体名称',
        dataIndex: 'name'
    },
    {
        title: '值',
        dataIndex: 'value'
    },
    {
        title: '开始',
        dataIndex: 'position.start'
    },
    {
        title: '结束',
        dataIndex: 'position.end'
    }
];

interface IResult {
    fields: Fields;
    dataList: Entitys;
    dataText: string;
}
const Result: FC<IResult> = ({ fields, dataList, dataText }) => {
    const data = dataList;

    const downloadResult = () => {
        download('output.json', dataText);
    };

    const needPagination = dataList.length > 10;

    return (
        <div className="result">
            <Title className="title">
                <span>完成!</span>
                <div>
                    <Button
                        style={{ marginRight: 8 }}
                        type="primary"
                        onClick={() => {
                            window.location.href = '/';
                        }}
                    >
                        回到首页
                    </Button>
                    <Button type="primary" onClick={downloadResult}>
                        下载
                    </Button>
                </div>
            </Title>
            <Table columns={columns} data={data} pagination={needPagination} />
        </div>
    );
};

export default Result;
