"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils";

const Admin = () => {
  const [users, setUsers] = useState<any>([]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/users`)
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  async function activateUser(userId: string) {
    const response = await axios.put(`${BASE_URL}/admin/user/${userId}/activate`);
    const data = await response.data;
    alert(data);
  }

  async function deactivateUser(userId: string) {
    const response = await axios.put(`${BASE_URL}/admin/user/${userId}/deactivate`);
    const data = await response.data;
    alert(data);
  }

  async function freezeWallet(walletId: string) {
    const response = await axios.put(`${BASE_URL}/admin/wallet/${walletId}/freeze`);
    const data = await response.data;
    alert(data);
  }

  async function unfreezeWallet(walletId: string) {
    const response = await axios.put(`${BASE_URL}/admin/wallet/${walletId}/unfreeze`);
    const data = await response.data;
    alert(data);
  }

  return (
    <>
      <div className="text-lg">Hello</div>
      {users.map((user: any) => (
        <li key={user.id}>
          <p>
            {user.id}
          </p>
          <p>
            {user.username} - {user.email}
          </p>
          <p>Wallet Balance: {user.wallets?.[0]?.balance}</p>
          <button onClick={() => activateUser(user.id)}>Activate</button>
          <button onClick={() => deactivateUser(user.id)}>Deactivate</button>
          <button onClick={() => freezeWallet(user.wallets?.[0].id)}>
            Freeze Wallet
          </button>
          <button onClick={() => unfreezeWallet(user.wallets?.[0].id)}>
            Unfreeze Wallet
          </button>
        </li>
      ))}
    </>
  );
};

export default Admin;

