import { Input } from "antd";
const { TextArea } = Input;

const create = [
  {
    props: {
      key: "type",
      name: "type",
      hidden: true,
    },
    ele: <Input />,
  },
  {
    props: {
      key: "first_name",
      name: "first_name",
      label: "First name",
      rules: [
        {
          required: true,
          message: "First name is required!",
        },
      ],
    },
    ele: <Input />,
  },
  {
    props: {
      key: "last_name",
      name: "last_name",
      label: "Last name",
      rules: [
        {
          required: true,
          message: "Last name is required!",
        },
      ],
    },
    ele: <Input />,
  },
  {
    props: {
      key: "phone",
      name: "phone",
      label: "Phone",
    },
    ele: <Input />,
  },
  {
    props: {
      key: "address",
      name: "address",
      label: "Address",
    },
    ele: <TextArea rows={4} />,
  },
];

export default create;
