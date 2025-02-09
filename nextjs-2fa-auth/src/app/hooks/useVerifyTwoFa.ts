import { useMutation } from "@tanstack/react-query";
//import { verifyTwoFa } from "../api/authApi";

/*export function useVerifyTwoFa() {
  return useMutation({
    mutationFn: verifyTwoFa,
  });
}*/

export async function mockVerifyTwoFa(
  code: string
): Promise<{ success: boolean }> {
  console.log("Mock 2FA verification request:", code);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (code === "123456" || code === "aCodeSentFromTheServerShouldBeHere") {
        resolve({ success: true });
      } else {
        reject(new Error("Invalid 2FA code"));
      }
    }, 500);
  });
}

export function useVerifyTwoFa() {
  return useMutation({
    mutationFn: mockVerifyTwoFa,
  });
}
