import { Input } from "antd";
const { TextArea } = Input;

const create = [
  {
    props: {
      key: "name",
      name: "name",
      label: "Name",
      rules: [
        {
          required: true,
          message: "Name is required!",
        },
      ],
    },
    ele: <Input />,
  },
  {
    props: {
      key: "level",
      name: "level",
      label: "Hierarchy level among others",
    },
    ele: <Input />,
  },
  {
    props: {
      key: "description",
      name: "description",
      label: "Description",
    },
    ele: <Input />,
  },
];

export default create;
