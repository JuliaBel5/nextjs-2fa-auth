"use client";
import { Form, Input, Button, Typography, message } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CopyOutlined } from "@ant-design/icons";
import { useCallback } from "react";
import { useVerifyTwoFa } from "../hooks/useVerifyTwoFa";

const { Title, Text } = Typography;

export default function CodeAuthPage() {
  const router = useRouter();

  const initialCode = "aCodeSentFromTheServerShouldBeHere";

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

  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(initialCode)
      .then(() => {
        message.success("Code copied to clipboard!");
      })
      .catch((err) => {
        message.error("Failed to copy the code.");
        console.error(err);
      });
  }, []);

  return (
    <div className="loginContainer">
      <Title level={3} className="logo">
        WWC
      </Title>
      <div className="loginBox">
        <Title level={2} className="loginTitle">
          Confirm login
        </Title>
        <Text className="loginSubtitle">Enter decrypted code</Text>

        <div className="wrapper">
          <Form name="code-form" onFinish={onFinish} layout="vertical">
            <div className="input-wrapper">
              <Form.Item name="string" initialValue={initialCode}>
                <Input
                  placeholder="Code"
                  value={initialCode}
                  suffix={<CopyOutlined onClick={handleCopy} />}
                />
              </Form.Item>

              <Form.Item
                name="code"
                rules={[
                  { required: true, message: "Please enter the code here" },
                ]}
              >
                <Input placeholder="Code" />
              </Form.Item>
            </div>

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
