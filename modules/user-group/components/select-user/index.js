import { Select } from "antd";
import { useState } from "react";
import { getUsers } from "../../datas/fetch";
const { Option } = Select;

export default function SelectUser({ value = {}, onChange }) {
  const [user, setUser] = useState(value.id);
  const { getUserData, getUserLoading } = getUsers();
  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange({
        user,
        ...value,
        ...changedValue,
      });
    }
  };

  const handleChange = (newValue) => {
    // const newValue = value || "";
    if (!("user" in value)) {
      setUser(newValue);
    }
    triggerChange({
      user: newValue,
    });
  };

  return (
    <Select
      value={value.user || user}
      onChange={handleChange}
      loading={getUserLoading}
    >
      {getUserData?.map((each) => {
        let option = "";
        const name =
          " - (" +
          each?.contact_id?.first_name +
          " " +
          each?.contact_id?.last_name +
          ")";
        const email = each?.email;
        if (email) {
          option += email;
        }
        if (each?.contact_id?.first_name && each?.contact_id?.last_name) {
          option += name;
        }
        return (
          <Option key={each?.key} value={each?.id}>
            {option}
          </Option>
        );
      })}
    </Select>
  );
}
