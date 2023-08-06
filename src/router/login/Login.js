// @ts-nocheck
import React, { useState, memo } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  username: "",
  password: "",
};
function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    let key = e.target.getAttribute("name");
    let value = e.target.value.toLowerCase().trim();
    const cloneData = structuredClone(data);
    cloneData[key] = value;
    setData(cloneData);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if("boburmirzo" === data.username && "12345677" === data.password){
      let user = JSON.stringify({
        username: "boburmirzo",
        password: "12345677",
        role: "owner",
      })
      localStorage.setItem("user", user)
      navigate("/")
    }else{
      toast.error("username yoki parol noto'g'ri")
    }
  };

  return (
    <div className="login-main">
      <div className="login-center">
        <h1 className="login-h1">Tizimga kirish</h1>
        <form onSubmit={handleSignIn} className="login-form">
          <div className="txt_field">
            <input
              onChange={handleChange}
              value={data.username}
              type="text"
              name="username"
              id="username"
              className="login-input"
              autoComplete="off"
              required
            />
            <span></span>
            <label htmlFor="username" className="login-label">
              Username:
            </label>
          </div>
          <div className="txt_field">
            <input
              onChange={handleChange}
              value={data.password}
              type="password"
              name="password"
              id="password"
              className="login-input"
              autoComplete="off"
              required
            />
            <span></span>
            <label htmlFor="password" className="login-label">
              Parol:
            </label>
          </div>
          <button type="submit" disabled={loading} className="login-btn">
            <span>{loading ? "Kuting..." : "Kirish"} </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default memo(Login);
