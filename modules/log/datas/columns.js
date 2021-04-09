import * as dayjs from "dayjs";

const columns = [
  {
    title: "Subject",
    dataIndex: "name",
    key: "name",
    render: (text, record) =>
      record.user_id.contact_id.first_name +
      " " +
      record.user_id.contact_id.last_name,
  },
  {
    title: "Activity",
    dataIndex: "activity",
    key: "activity",
  },
  {
    title: "Content",
    dataIndex: "content",
    key: "content",
    width: 300,
    render: (text) => (
      <pre style={{ margin: 0, fontSize: 10 }}>
        {text
          ?.replace("{", "")
          ?.replace("}", "")
          ?.split('",')
          ?.join(",")
          ?.split('"')
          ?.join(" ")
          ?.replace(/:([0-9,null,false])/g, ": $1")
          ?.split(",")
          ?.join(",\n")}
      </pre>
    ),
  },
  {
    title: "Module",
    dataIndex: "module",
    key: "module",
    width: 100,
  },
  {
    title: "On",
    dataIndex: "created_at",
    key: "created_at",
    render: (text) => dayjs(text).format("DD/MM/YY HH:mm:ss"),
  },
];

export default columns;
