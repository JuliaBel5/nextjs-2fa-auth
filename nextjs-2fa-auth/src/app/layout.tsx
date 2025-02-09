import type { Metadata } from "next";
import "antd/dist/reset.css";
import "./globals.scss";
import "react-toastify/dist/ReactToastify.css";
import Providers from "@/providers";
import "@ant-design/v5-patch-for-react-19";

export const metadata: Metadata = {
  title: "Next App with 2FA",
  description: "Test page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
