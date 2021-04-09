import { Input } from "antd";
import createInput from "./create";

const update = [
  {
    props: {
      key: "id",
      name: "id",
      hidden: true,
    },
    ele: <Input />,
  },
  ...createInput,
];

export default update;
