"use client";
import { Form, Input, Button, Typography } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useLogin } from "../hooks/useLogin";

const { Title, Text } = Typography;

export default function LoginPage() {
  const { mutate, status } = useLogin();

  const onFinish = async (values: { username: string; password: string }) => {
    mutate(values);
  };

  return (
    <div className="loginContainer">
      <Title level={3} className="logo">
        WWC
      </Title>
      <div className="loginBox">
        <Title level={2} className="loginTitle">
          Login
        </Title>
        <Text className="loginSubtitle">Enter your username and password</Text>
        <div className="wrapper">
          <Form name="login-form" onFinish={onFinish} layout="vertical">
            <div className="input-wrapper">
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please enter your username" },
                ]}
              >
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
                className="password-input"
              >
                <Input.Password
                  placeholder="Password"
                  iconRender={(invisible) =>
                    invisible ? (
                      <EyeInvisibleOutlined
                        style={{ backgroundColor: "#0d0d0d", color: "#6C6C6C" }}
                      />
                    ) : (
                      <EyeOutlined
                        style={{ backgroundColor: "#0d0d0d", color: "#6C6C6C" }}
                      />
                    )
                  }
                />
              </Form.Item>
            </div>
            <Form.Item className="button-wrapper">
              <Button
                type="primary"
                htmlType="submit"
                className="login-button"
                loading={status === "pending"}
                block
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
