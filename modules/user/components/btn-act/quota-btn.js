import { WalletOutlined } from "@ant-design/icons";
import ModalForm from "components/form-in-modal";
import { idFields, quotaFields } from "../../fields";

export default function QuotaBtn({ initialValues, handleSubmit }) {
  const props = {
    type: "update",
    handleSubmit,
    fields: [...idFields, ...quotaFields],
    initialValues,
    rowName: " quota " + initialValues.email,
    buttonProps: { size: "small" },
    iconComp: <WalletOutlined />,
  };

  return <ModalForm {...props} />;
}
