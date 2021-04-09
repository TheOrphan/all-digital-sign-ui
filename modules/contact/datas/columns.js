const columns = (asCommon) => {
  const initial = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => record.first_name + " " + record.last_name,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  const action = [
    {
      title: "Action",
      dataIndex: "act",
      key: "act",
    },
  ];
  return asCommon ? initial : [...initial, ...action];
};

export default columns;
