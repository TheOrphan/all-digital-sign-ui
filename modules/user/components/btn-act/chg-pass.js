import { KeyOutlined } from "@ant-design/icons";
import ModalForm from "components/form-in-modal";
import { idFields, passFields } from "../../fields";

export default function ChgPassBtn({ initialValues, handleSubmit }) {
  const props = {
    type: "update",
    handleSubmit,
    fields: [...idFields, ...passFields],
    initialValues,
    rowName: " password " + initialValues.email,
    buttonProps: { size: "small" },
    iconComp: <KeyOutlined />,
  };

  return <ModalForm {...props} />;
}
