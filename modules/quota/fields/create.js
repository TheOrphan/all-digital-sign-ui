import { Input } from "antd";
import SelectContact from "components/contact-in-modal";

const create = [
  {
    props: {
      key: "contact_id",
      name: "contact_id",
      label: "Company",
    },
    ele: <SelectContact readOnly />,
  },
  {
    props: {
      key: "quota",
      name: "quota",
      label: "Quota",
    },
    ele: <Input />,
  },
];

export default create;
