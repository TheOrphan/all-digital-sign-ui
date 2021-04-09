import { Input } from "antd";

const passField = [
  {
    props: {
      key: "password",
      name: "password",
      label: "Password",
      rules: [
        {
          required: true,
          message: "required!",
        },
      ],
    },
    ele: <Input.Password />,
  },
];

export default passField;
