import { UserDeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

export default function DeactiveBtn({ dataOnPrompt, handleConfirm }) {
  return (
    <Popconfirm
      title={`Are you sure you want to deactivate - "${dataOnPrompt}"?`}
      onConfirm={handleConfirm}
      okText="yes"
      cancelText="no"
    >
      <Button size="small" type="danger">
        <UserDeleteOutlined />
      </Button>
    </Popconfirm>
  );
}
