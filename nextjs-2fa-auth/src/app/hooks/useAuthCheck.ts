"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuthCheck() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const meResponse = await fetch(
          "https://dev.sangmata.app/api/users/me",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (meResponse.status === 401) {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  return { loading };
}
