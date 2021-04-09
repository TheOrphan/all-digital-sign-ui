import { Row, Col, Card, Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import useLogin from "../../utils/custom-hooks/login";
import { useEffect, useContext } from "react";
import Router from "next/router";
import { UserContext } from "../../utils/context";

export default function Login() {
  const { dispatchUser } = useContext(UserContext);
  const [form] = Form.useForm();
  const [signed, signing] = useLogin();
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    signing("/auth/login", values);
  };

  useEffect(() => {
    if (signed.code === 202) {
      dispatchUser({
        ...signed,
        type: "login",
        email: signed.data.email,
        currentRoute: process.env.INITIAL_PAGES,
      });
    }
  }, [signed]);

  return (
    <Row
      justify="space-around"
      align="middle"
      style={{ height: "100vh", width: "100vw" }}
    >
      <Col span={6}>
        <Card>
          <h1 style={{ textAlign: "center" }}>eMaterai Apps</h1>
          <Form
            requiredMark="optional"
            form={form}
            layout="vertical"
            name="normal_login"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            {/* <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a  href="">
                Forgot password
              </a>
            </Form.Item> */}

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
