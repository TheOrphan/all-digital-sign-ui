import SelectUser from "../components/select-user";
import SelectGroup from "../components/select-group";

const create = [
  {
    props: {
      key: "user_id",
      name: "user_id",
      label: "User",
      rules: [
        {
          required: true,
          message: "User is required!",
        },
      ],
    },
    ele: <SelectUser />,
  },
  {
    props: {
      key: "group_id",
      name: "group_id",
      label: "Group",
      rules: [
        {
          required: true,
          message: "Group is required!",
        },
      ],
    },
    ele: <SelectGroup />,
  },
];

export default create;
