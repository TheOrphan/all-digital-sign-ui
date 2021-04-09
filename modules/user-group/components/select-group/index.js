import { Select } from "antd";
import { useState } from "react";
import { getGroups } from "../../datas/fetch";
const { Option } = Select;

export default function SelectGroup({ value = {}, onChange }) {
  const [group, setGroup] = useState(value.id);
  const { getGroupData, getGroupLoading } = getGroups();
  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange({
        group,
        ...value,
        ...changedValue,
      });
    }
  };

  const handleChange = (newValue) => {
    // const newValue = value || "";
    if (!("group" in value)) {
      setGroup(newValue);
    }
    triggerChange({
      group: newValue,
    });
  };
  return (
    <Select
      value={value.group || group}
      onChange={handleChange}
      loading={getGroupLoading}
    >
      {getGroupData?.map((each) => {
        let option = "";
        const level = " - (level : " + each?.level + ")";
        const name = each?.name;
        if (name) {
          option += name;
        }
        if (level) {
          option += level;
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
