import { Input, Select } from "antd";
const { Option } = Select;

import SelectContact from "components/contact-in-modal";

const create = [
  {
    props: {
      key: "contact_id",
      name: "contact_id",
      label: "Contact",
      rules: [
        {
          required: true,
          message: "required!",
        },
      ],
    },
    ele: <SelectContact readOnly />,
  },
  {
    props: {
      key: "email",
      name: "email",
      label: "E-mail",
      rules: [
        { type: "email", message: "Email is not a valid format!" },
        {
          required: true,
          message: "required!",
        },
      ],
    },
    ele: <Input />,
  },
  {
    props: {
      key: "sa_user",
      name: "sa_user",
      label: "Perurica username",
      rules: [
        {
          required: true,
          message: "required!",
        },
      ],
    },
    ele: <Input.Password />,
  },
  {
    props: {
      key: "sa_pass",
      name: "sa_pass",
      label: "Perurica password",
      rules: [
        {
          required: true,
          message: "required!",
        },
      ],
    },
    ele: <Input.Password />,
  },
  {
    props: {
      key: "active",
      name: "active",
      label: "Status",
    },
    ele: (
      <Select>
        <Option value={1}>Active</Option>
        <Option value={0}>Deactivated</Option>
      </Select>
    ),
  },
];

export default create;
