"use client";

import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils";

const Form = () => {
  // Define state for username and email
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // Handle form submission
  const handlePostUser = async () => {
    try {
      await axios.post(`${BASE_URL}/user`, {
        username,
        email
      });
      console.log("User posted successfully");
    } catch (error) {
      console.error("Error posting user:", error);
    }
  };

  return (
    <>
      <div>Form</div>
      
      {/* Username input field */}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="text-black"
      />

      {/* Email input field */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="text-black"
      />

      {/* Submit button */}
      <button onClick={handlePostUser}>Submit</button>
    </>
  );
};

export default Form;
