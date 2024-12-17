"use client";

import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils";

const Wallet = () => {
  const [userId, setUserId] = useState("");
  const [balance, setBalance] = useState("");

  // Handle form submission
  const handlePostWallet = async () => {
    if (!userId || !balance) {
      console.error("User ID and balance are required.");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/wallet`, {
        userId,
        balance: parseFloat(balance),
      });
      console.log("Wallet posted successfully");
    } catch (error) {
      console.error("Error posting wallet:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Wallet Form</h2>

      {/* User ID Input */}
      <div className="mb-4">
        <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
          User ID
        </label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Balance Input */}
      <div className="mb-4">
        <label htmlFor="balance" className="block text-sm font-medium text-gray-700">
          Balance
        </label>
        <input
          type="number"
          id="balance"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          placeholder="Enter Balance"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handlePostWallet}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Submit
      </button>
    </div>
  );
};

export default Wallet;
