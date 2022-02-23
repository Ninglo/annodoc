import { FC } from "react";
import { Button, List, Table } from "@arco-design/web-react";
import { DataList, Fields } from "../../../modal/type";
import { download } from "../../../utils/download";
import { ColumnProps } from "@arco-design/web-react/es/Table";
import Title from "@arco-design/web-react/es/Typography/title";

const createColumns = (fields: Fields): ColumnProps[] =>
  fields.map((field) => ({
    dataIndex: field,
    title: field,
    render: (item) =>
      item.length <= 1 ? (
        item[0] ?? ""
      ) : (
        <List
          size="small"
          dataSource={item}
          render={(item, index) => <List.Item key={index}>{item}</List.Item>}
        />
      ),
  }));

const createData = (fields: Fields, dataList: DataList) =>
  dataList.map((data) =>
    data.reduce(
      (prev, curt, i) => ({ ...prev, [fields[i]]: curt }),
      {} as Record<string, string[]>
    )
  );

interface IResult {
  fields: Fields;
  dataList: DataList;
  dataText: string;
}
const Result: FC<IResult> = ({ fields, dataList, dataText }) => {
  const columns = createColumns(fields);
  const data = createData(fields, dataList);

  const downloadResult = () => {
    download("output", dataText);
  };

  const needPagination = dataList.length > 10;

  return (
    <div className="result">
      <Title className="title">
        <span>Finish!</span>
        <Button type="primary" onClick={downloadResult}>
          Download
        </Button>
      </Title>
      <Table columns={columns} data={data} pagination={needPagination} />
    </div>
  );
};

export default Result;
