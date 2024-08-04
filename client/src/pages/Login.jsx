import React, { useState } from "react";
import styles from "./login.module.css";

function Login({ setPath, setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch("api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        setToken(data.token);
        setPath("home");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label htmlFor="email-input" className={styles.label}>
          Email:
        </label>
        <input
          type="email"
          id="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          placeholder="Email"
          required
        />
      </div>
      <div>
        <label htmlFor="password-input" className={styles.label}>
          Password:
        </label>
        <input
          type="password"
          id="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          placeholder="Password"
          required
        />
      </div>
      <button type="submit" className={styles.button}>
        Login
      </button>
    </form>
  );
}

export default Login;
