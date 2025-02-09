"use client";
//import { loginRequest } from "./loginRequest";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

/*export function useLogin() {
  const router = useRouter();

  return useMutation(loginRequest, {
    onError: (error) => {
      toast.error(error.message || "Login failed!", { theme: "dark" });
    },
    onSuccess: (response) => {
      if (response.twoFaType === "google-authenticator") {
        toast.success("Login successful! Redirecting to 2FA page.", { theme: "dark" });
        router.push("/2fa");
      } else if (response.twoFaType === null) {
        toast.success("Login successful! Redirecting to main page.", { theme: "dark" });
        router.push("/main");
      } else {
        toast.success("Login successful! Redirecting to code page.", { theme: "dark" });
        router.push("/code-page");
      }
    },
  });
}
*/

interface LoginResponse {
  twoFaType: "google-authenticator" | "pgp" | null | string;
}

interface LoginRequest {
  username: string;
  password: string;
}

async function mockLoginRequest(values: LoginRequest): Promise<LoginResponse> {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (values.username === "error") {
        reject(new Error("Invalid credentials"));
      } else {
        const twoFaType = Math.random() < 0.5 ? "google-authenticator" : "pgp";

        resolve({
          twoFaType: twoFaType,
        });
      }
    }, 500);
  });
}

export function useLogin() {
  const router = useRouter();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: mockLoginRequest,
    onError: (error: Error) => {
      toast.error(error.message || "Login failed!", { theme: "dark" });
    },
    onSuccess: (response: LoginResponse) => {
      if (response.twoFaType === "google-authenticator") {
        toast.success("Login successful! Redirecting to 2FA page.", {
          theme: "dark",
        });
        router.push("/2fa");
      } else if (response.twoFaType === "pgp") {
        toast.success("Login successful! Redirecting to PGP page.", {
          theme: "dark",
        });
        router.push("/code-page");
      } else if (response.twoFaType === null) {
        toast.success("Login successful! Redirecting to main page.", {
          theme: "dark",
        });
        router.push("/main");
      }
    },
  });
}
