import { FC } from 'react'
import { Button, PageHeader, Table } from '@arco-design/web-react'
import { download } from '../../utils/download'
import { ColumnProps } from '@arco-design/web-react/es/Table'
import { useResult } from '../../hooks/data/useResult'
import './index.scss'

const columns: ColumnProps[] = [
    {
        title: '行数',
        dataIndex: 'position.lineNumber',
        sorter(a, b) {
            return a - b
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
]

const Result: FC = () => {
    const { result } = useResult()
    if (!result) {
        return null
    }

    const dataList = result.result
    const dataText = JSON.stringify(dataList)

    const downloadResult = () => {
        download('output.json', dataText)
    }

    const needPagination = dataList.length > 10

    return (
        <div className="result">
            <PageHeader
                title='结果页'
                subTitle='标注的最终结果'
                extra={
                    <Button type="primary" onClick={downloadResult}>
                        下载
                    </Button>
                }
            />
            <Table border={false} columns={columns} data={dataList} pagination={needPagination} />
        </div>
    )
}

export default Result
