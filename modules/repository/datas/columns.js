import { Image } from "antd";
import * as dayjs from "dayjs";
// import { getS3Png } from "../../../utils/helpers/helper";

const columns = [
  {
    title: "User",
    dataIndex: "user_id.contact_id.name",
    key: "user_id.contact_id.name",
    width: 100,
    render: (text, record) =>
      record.user_id.contact_id.first_name +
      " " +
      record.user_id.contact_id.last_name,
  },
  {
    title: "Filename",
    dataIndex: "name",
    key: "name",
    width: 180,
    render: (text) => <div style={{ width: 180 }}>{text}</div>,
  },
  {
    title: "Raw",
    dataIndex: "raw_doc",
    key: "raw_doc",
    width: 200,
    render: (text) =>
      text ? (
        <>
          <div>
            <object
              data={`${process.env.BE}/repositories/raw/${text}`}
              type="application/pdf"
              width="200"
              height="100"
            />
          </div>
          <div>
            <a
              target="_blank"
              href={`${process.env.BE}/repositories/raw/${text}`}
            >
              view in new tab
            </a>
          </div>
        </>
      ) : (
        "N/A"
      ),
  },
  {
    title: "Stamp",
    dataIndex: "stamp",
    key: "stamp",
    width: 80,
    render: (text) =>
      text ? (
        <Image
          src={`${process.env.BE}/repositories/stamp/${text}`}
          width={80}
        />
      ) : (
        "N/A"
      ),
  },
  {
    title: "Final",
    dataIndex: "final_doc",
    key: "final_doc",
    width: 200,
    render: (text) =>
      text ? (
        <>
          <div>
            <object
              data={`${process.env.BE}/repositories/final/${text}`}
              type="application/pdf"
              width="200"
              height="100"
            />
          </div>
          <div>
            <a
              target="_blank"
              href={`${process.env.BE}/repositories/final/${text}`}
            >
              view in new tab
            </a>
          </div>
        </>
      ) : (
        "N/A"
      ),
  },
  {
    title: "Serial number",
    dataIndex: "reference_doc",
    key: "reference_doc",
  },
  {
    title: "Created",
    dataIndex: "created_at",
    key: "created_at",
    width: 50,
    render: (text) => <div>{dayjs(text).format("DD/MM/YY HH:mm:ss")}</div>,
  },
  {
    title: "Modified",
    dataIndex: "updated_at",
    key: "updated_at",
    width: 50,
    render: (text) => <div>{dayjs(text).format("DD/MM/YY HH:mm:ss")}</div>,
  },
  {
    title: "Action",
    dataIndex: "act",
    key: "act",
    width: 80,
  },
];

export default columns;
