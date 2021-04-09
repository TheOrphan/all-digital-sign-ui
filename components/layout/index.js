import React, { useState } from "react";
import { Card, Layout } from "antd";
import MyHeader from "./header";
import MySider from "./sider";
import { adminMenus } from "./menus";

const { Content } = Layout;

export default function MainLayout({ children, user }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed((prev) => !prev);
  };
  const childrenWithProps = React.Children.map(children, (child) => {
    // checking isValidElement is the safe way and avoids a typescript error too
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { user });
    }
    return child;
  });
  return (
    <Layout
      style={{
        height: "100vh",
        overflow: "hidden",
        left: 0,
      }}
    >
      <MySider collapsed={collapsed} menus={adminMenus} />
      <Layout>
        <MyHeader collapsed={collapsed} toggle={toggle} />
        <Content
          style={{
            height: "calc(100vh - 64px)",
            padding: "16px",
          }}
        >
          <Card style={{ height: "100%", overflow: "auto" }}>
            {childrenWithProps}
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}
