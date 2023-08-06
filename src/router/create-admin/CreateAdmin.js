import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addAdmin } from "../../context/admins";
import { PatternFormat } from "react-number-format";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  tel: "",
  address: "",
  username: "",
  password: "",
};

function CreateAdmin() {
  const [admin, setAdmin] = useState(initialState);
  const admins = useSelector(s=>s.admins.value)
  const dispatch = useDispatch();
  const navidate = useNavigate();

  const handleChange = (e) => {
    setAdmin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newAdmin = {
      ...admin,
      id: uuidv4(),
      date: new Date().getTime(),
    };
    if(admins.find(i=> i.username === newAdmin.username)){
        return toast.error("username band")
    }
    dispatch(addAdmin(newAdmin));
    setAdmin(initialState);
    toast.success("Admin muvaffaqiyatli qo'shildi");
    // navidate("/");
  };

  return (
    <div className="create__customer">
      <h2>Admin yaratish</h2>
      <form onSubmit={handleSubmit} action="">
        <input
          value={admin["name"]}
          onChange={handleChange}
          autoComplete="off"
          required
          type="text"
          className="inp"
          placeholder="ism"
          name="name"
        />

        <PatternFormat
          onChange={handleChange}
          format="+998 ## ### ## ##"
          className="inp"
          allowEmptyFormatting
          mask="_"
          value={admin["tel"]}
          name="tel"
          required
        />

        <input
          value={admin["address"]}
          onChange={handleChange}
          autoComplete="off"
          required
          type="text"
          className="inp"
          placeholder="manzil"
          name="address"
        />
        <input
          value={admin["username"]}
          onChange={handleChange}
          autoComplete="off"
          required
          type="text"
          className="inp"
          placeholder="username"
          name="username"
        />
        <input
          value={admin["password"]}
          onChange={handleChange}
          autoComplete="off"
          required
          type="password"
          className="inp"
          placeholder="password"
          name="password"
          minLength={4}
          maxLength={16}
        />
        <button className="btn regular">Yaratish</button>
      </form>
    </div>
  );
}

export default CreateAdmin;
