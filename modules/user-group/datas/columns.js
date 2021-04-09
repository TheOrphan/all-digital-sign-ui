const columns = [
  {
    title: "User",
    dataIndex: "user_id",
    key: "user_id",
    render: (text, record) => {
      let option = "";
      const name =
        " - (" +
        record?.user_id?.contact_id?.first_name +
        " " +
        record?.user_id?.contact_id?.last_name +
        ")";
      const email = record?.user_id?.email;
      if (email) {
        option += email;
      }
      if (
        record?.user_id?.contact_id?.first_name &&
        record?.user_id?.contact_id?.last_name
      ) {
        option += name;
      }
      return option;
    },
  },
  {
    title: "Group",
    dataIndex: "group_id",
    key: "group_id",
    render: (text, record) => {
      let option = "";
      const level = " - (level : " + record?.group_id?.level + ")";
      const name = record?.group_id?.name;
      if (name) {
        option += name;
      }
      if (level) {
        option += level;
      }
      return option;
    },
  },
  {
    title: "Action",
    dataIndex: "act",
    key: "act",
  },
];

export default columns;
