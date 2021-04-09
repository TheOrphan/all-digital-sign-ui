import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Header } = Layout;

export default function MyHeader({ collapsed, toggle }) {
  return (
    <Header style={{ padding: 0 }}>
      {collapsed ? (
        <MenuUnfoldOutlined className="trigger" onClick={toggle} />
      ) : (
        <MenuFoldOutlined className="trigger" onClick={toggle} />
      )}
    </Header>
  );
}
