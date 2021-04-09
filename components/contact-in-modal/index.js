import { Modal, Input } from "antd";
import { useEffect, useReducer } from "react";
import IndexPage from "modules/company";
import reducer from "./reducer";

export default function SelectContact({ value = {}, onChange }) {
  const [modal, dispatchModal] = ContactInModal();
  useEffect(() => {
    if (modal.rowValue) {
      onChange(modal.rowValue.id);
    }
  }, [modal]);
  return (
    <div>
      {ContactInModalComp({ modal, dispatchModal })}
      <Input
        value={
          (value?.first_name || modal.rowValue?.first_name || "") +
          " " +
          (value?.last_name || modal.rowValue?.last_name || "")
        }
        onClick={() => dispatchModal({ type: "MODAL_VISIBLE", visible: true })}
        readOnly
      />
    </div>
  );
}

function ContactInModal() {
  const [state, dispatch] = useReducer(reducer, { rowValue: null });
  return [state, dispatch];
}

function ContactInModalComp({ modal, dispatchModal }) {
  const handleOk = () => {
    dispatchModal({ type: "MODAL_VISIBLE", visible: false });
  };

  const handleCancel = () => {
    dispatchModal({ type: "MODAL_VISIBLE", visible: false });
  };

  return (
    <>
      <Modal
        title="Choose a contact"
        visible={modal.visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <IndexPage
          reqParam={{
            key: "contacts/get-all",
            body: { page: "all", where: { type: "company" } },
            options: { list: ["none"] },
            dispatchModal,
          }}
        />
      </Modal>
    </>
  );
}
