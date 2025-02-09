"use client";

import { Button, Typography, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useAuthCheck } from "./hooks/useAuthCheck";

const { Title, Text } = Typography;

export default function HomePage() {
  const { loading } = useAuthCheck();
  const router = useRouter();

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" className="loader" />
      </div>
    );
  }

  return (
    <div className="loginContainer">
      <Title level={3} className="logo">
        WWC
      </Title>
      <div className="loginBox">
        <Title level={2} className="loginTitle">
          Welcome
        </Title>
        <Text className="loginSubtitle">Start your journey with us</Text>
        <div className="button-wrapper">
          <Button
            type="primary"
            className="login-button"
            onClick={() => router.push("/login")}
            block
          >
            Go to Login Page
          </Button>
        </div>
      </div>
    </div>
  );
}
