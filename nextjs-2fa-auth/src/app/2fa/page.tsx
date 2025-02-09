"use client";

import { Form, Input, Button, Typography } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useVerifyTwoFa } from "../hooks/useVerifyTwoFa";

const { Title, Text } = Typography;

export default function TwoFactorAuthPage() {
  const router = useRouter();

  const { mutate, status } = useVerifyTwoFa();
  const onFinish = async (values: { code: string }) => {
    mutate(values.code, {
      onSuccess: () => {
        toast.success("Verification was successful!", { theme: "dark" });
        router.push("/main");
      },
      onError: (error: Error) => {
        toast.error(error.message || "Verification failed", { theme: "dark" });
      },
    });
  };

  return (
    <div className="loginContainer">
      <Title level={3} className="logo">
        WWC
      </Title>
      <div className="faBox">
        <Title level={2} className="loginTitle">
          Confirm login
        </Title>
        <Text className="loginSubtitle">Enter verification code</Text>

        <div className="wrapper">
          <Form
            name="2fa-form"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{ code: "319648" }}
          >
            <Form.Item
              name="code"
              rules={[
                { required: true, message: "Please enter verification code" },
                { len: 6, message: "Code must be 6 digits" },
              ]}
            >
              <Input.OTP length={6} size="large" className="code-input" />
            </Form.Item>

            <div className="button-group">
              <Button
                type="link"
                onClick={() => router.push("/login")}
                className="back-button"
              >
                Back to login
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                className="verify-button"
                loading={status === "pending"}
              >
                Continue
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
