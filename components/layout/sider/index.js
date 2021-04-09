import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Layout, Menu } from "antd";
import { UserContext } from "utils/context";
import { ExportOutlined } from "@ant-design/icons";
const { Sider } = Layout;

export default function MySider({ collapsed, menus }) {
  const router = useRouter();
  const { dispatchUser } = useContext(UserContext);
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[router.pathname !== "/" ? router.pathname : ""]}
      >
        {menus.map((menu) => (
          <Menu.Item
            key={menu.key}
            icon={menu.icon}
            style={{ textTransform: "capitalize" }}
          >
            <Link href={menu.key}>
              <a>{menu.title}</a>
            </Link>
          </Menu.Item>
        ))}
        <Menu.Item
          key="logout"
          icon={<ExportOutlined />}
          style={{ textTransform: "capitalize" }}
          onClick={() => dispatchUser({ type: "logout" })}
        >
          <a>Logout</a>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
