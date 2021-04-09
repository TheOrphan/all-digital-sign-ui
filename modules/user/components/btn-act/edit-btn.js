import ModalForm from "components/form-in-modal";
import { idFields, createFields } from "../../fields";

export default function EditBtn({ initialValues, handleSubmit, fields }) {
  const props = {
    type: "update",
    handleSubmit,
    fields: [...idFields, ...createFields],
    initialValues,
    rowName: initialValues.email,
    buttonProps: { size: "small" },
  };

  return <ModalForm {...props} />;
}
