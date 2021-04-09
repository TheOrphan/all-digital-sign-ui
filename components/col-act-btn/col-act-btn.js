import { Button, Col, Popconfirm, Row } from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import ModalForm from "components/form-in-modal";

export default function ActBtn({
  list = ["update", "delete"],
  id,
  handleDelete,
  dataOnPrompt = "",
  modalUpdateProps,
}) {
  return (
    <Row gutter={[4, 4]}>
      {list.includes("update") && (
        <Col>
          <ModalForm
            name={modalUpdateProps?.title.toLowerCase()}
            initialValues={modalUpdateProps.records}
            type={"update"}
            rowName={modalUpdateProps?.title.toLowerCase()}
            handleSubmit={modalUpdateProps.handleCreate}
            fields={modalUpdateProps.fields}
            buttonProps={{ ...modalUpdateProps.buttonProps }}
          />
        </Col>
      )}
      {list.includes("delete") && (
        <Col>
          <Popconfirm
            title={`Are you sure you want to delete - "${dataOnPrompt}"?`}
            onConfirm={() => handleDelete(id)}
            okText="yes"
            cancelText="no"
          >
            <Button type="primary" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Col>
      )}
    </Row>
  );
}
