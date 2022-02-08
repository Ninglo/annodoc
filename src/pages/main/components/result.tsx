import { FC } from "react";
import { Button, Table } from "@arco-design/web-react";
import { Fields } from "../../../modal/type";
import { download } from "../../../utils/download";

interface IResult {
  fields: Fields;
  dataList: string[][];
  dataText: string;
}
const Result: FC<IResult> = ({ fields, dataList, dataText }) => {
  const columns = fields.map((field) => ({ dataIndex: field, title: field }));
  const data = dataList.map((data) =>
    data.reduce((prev, curt, i) => ({ ...prev, [fields[i]]: curt }), {})
  );

  const downloadResult = () => {
    download("output", dataText);
  };

  return (
    <div>
      <Table columns={columns} data={data} />
      <Button type="primary" onClick={downloadResult}>
        Download
      </Button>
    </div>
  );
};

export default Result;
