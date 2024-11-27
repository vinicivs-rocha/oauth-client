"use client";

import { useEffect, useState } from "react";

export default function UserData() {
  const [userData, setUserData] = useState<{
    name: string;
    id: string;
    email: string;
    phone: string;
  }>();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response);
        const data = await response.json();
        setUserData(data.userData);
      } catch (err) {
        console.error(err);
      }
    };

    if (accessToken) {
      fetchUserData();
    }
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {userData ? (
        <div className="w-98 p-6 bg-slate-400 rounded">
          <h2 className="text-4xl">Olá, {userData.name}</h2>
          <ul className="flex flex-col gap-6 p-3">
            <li>Id: {userData.id}</li>
            <li>Email: {userData.email}</li>
            <li>Telefone: {userData.phone}</li>
          </ul>
        </div>
      ) : (
        <h2 className="text-center text-4xl">Loading...</h2>
      )}
    </div>
  );
}
