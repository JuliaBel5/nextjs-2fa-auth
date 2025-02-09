"use client";

import { Button, Typography } from "antd";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

export default function MainPage() {
  const router = useRouter();

  return (
    <div className="loginContainer">
      <Title level={3} className="logo">
        WWC
      </Title>
      <div className="loginBox">
        <Title level={2} className="loginTitle">
          Welcome!
        </Title>
        <Text className="loginSubtitle">
          One day something will appear here. Maybe.
        </Text>
        <div className="button-wrapper">
          <Button
            type="primary"
            onClick={() => router.push("/login")}
            className="login-button"
          >
            Return to Login page
          </Button>
        </div>
      </div>
    </div>
  );
}
