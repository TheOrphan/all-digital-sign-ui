import { Input, InputNumber } from "antd";

const quotaField = [
  {
    props: {
      key: "quota_limit",
      name: "quota_limit",
      label: "Quota Limit",
      rules: [
        {
          type: "number",
          message: "not a number!",
        },
      ],
    },
    ele: <InputNumber style={{ width: "100%" }} />,
  },
  {
    props: {
      key: "quota_desc",
      name: "quota_desc",
      label: "Quota Desc",
    },
    ele: <Input />,
  },
];

export default quotaField;
