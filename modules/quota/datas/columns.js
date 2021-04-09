const columns = [
  {
    title: "Company",
    dataIndex: "contact_id",
    key: "contact_id",
    render: (text, record) =>
      record.contact_id.first_name + " " + record.contact_id.last_name,
  },
  {
    title: "Quota",
    dataIndex: "quota",
    key: "quota",
  },
  {
    title: "Action",
    dataIndex: "act",
    key: "act",
  },
];

export default columns;
