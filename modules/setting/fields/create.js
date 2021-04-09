import { Input } from "antd";

const create = [
  {
    props: {
      key: "key",
      name: "key",
      label: "Key",
    },
    ele: <Input disabled />,
  },
  {
    props: {
      key: "value",
      name: "value",
      label: "Value",
      rules: [
        {
          required: true,
          message: "Value is required!",
        },
      ],
    },
    ele: <Input />,
  },
];

export default create;
