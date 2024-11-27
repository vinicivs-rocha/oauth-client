"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const errors: { [error: string]: string } = {
  access_denied: "Você negou o acesso ao aplicativo",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const authorizationCode = searchParams.get("code");
    const error = searchParams.get("error");

    if (!authorizationCode && error) {
      setError(error);
      return;
    }

    const fetchAccessToken = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/oauth/access-token?projectId=9fdb9fc1-127a-43c2-ba38-89077ef1a0ce&scope=full&redirectUrl=http://localhost:3001/auth&code=${authorizationCode}`,
          {
            method: "POST",
          }
        );
        const data = await response.json();
        localStorage.setItem("accessToken", data.access_token);
        router.push("/user");
      } catch (err) {
        if (err instanceof Error) return setError(err.message);
        setError("An unexpected error has occurred");
      }
    };

    if (authorizationCode) {
      fetchAccessToken();
    }
  }, [router, searchParams]);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {error && (
        <h2 className="text-center text-4xl">{errors[error] || error}</h2>
      )}
      {children}
    </div>
  );
}
