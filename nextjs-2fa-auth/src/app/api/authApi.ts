export async function loginRequest(values: {
  username: string;
  password: string;
}) {
  const response = await fetch("https://dev.sangmata.app/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    if (response.status === 204) {
      const meResponse = await fetch("https://dev.sangmata.app/api/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!meResponse.ok) {
        const errorData = await meResponse.json();
        throw new Error(errorData.message || "Failed to fetch user data");
      }

      return meResponse.json();
    }
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
}

export async function verifyTwoFa(code: string) {
  const response = await fetch("https://dev.sangmata.app/api/users/me/two-fa", {
    // ну, или другой эндпоинт, я у вас не нашла более подходящего
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Verification failed");
  }

  return response.json();
}
