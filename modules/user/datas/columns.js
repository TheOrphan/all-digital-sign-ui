import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Space } from "antd";
import * as dayjs from "dayjs";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text, record) =>
      record.contact_id
        ? record.contact_id.first_name + " " + record.contact_id.last_name
        : "-",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Perurica Account",
    children: [
      {
        title: "Username",
        dataIndex: "sa_user",
        key: "sa_user",
      },
      {
        title: "Password",
        dataIndex: "sa_pass",
        key: "sa_pass",
        render: (text) => (
          <Space direction="vertical">
            <Input.Password
              value={text}
              readOnly
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              bordered={false}
            />
          </Space>
        ),
      },
    ],
  },
  {
    title: "Quota",
    children: [
      {
        title: "Usage",
        dataIndex: "quota_usage",
        key: "quota_usage",
      },
      {
        title: "Limit",
        dataIndex: "quota_limit",
        key: "quota_limit",
      },
      {
        title: "Desc",
        dataIndex: "quota_desc",
        key: "quota_desc",
      },
    ],
  },
  {
    title: "Status",
    dataIndex: "active",
    key: "active",
    render: (text) => (text == 1 ? "active" : "deactivated"),
  },
  {
    title: "Last login",
    dataIndex: "last_login",
    key: "last_login",
    render: (text) =>
      text ? dayjs(text).format("DD/MM/YYYY HH:mm:ss") : "N / A",
  },
  {
    title: "Action",
    dataIndex: "act",
    key: "act",
  },
];

export default columns;
