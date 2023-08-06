import React, { useState } from "react";
import "./CreateCustomer.css";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addCustomer } from "../../context/customers";
import { PatternFormat } from "react-number-format";
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"

const initialState = {
  name: "",
  tel: "",
  address: "",
  status: "",
  comment: "",
  statusDate: "",
};

function CreateCustomer() {
  const [customer, setCustomer] = useState(initialState);
  const dispatch = useDispatch();
  const navidate = useNavigate()

  const handleChange = (e) => {
    setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      ...customer,
      id: uuidv4(),
      date: new Date().getTime(),
    };
    dispatch(addCustomer(newCustomer));
    setCustomer(initialState);
    toast.success("Mijoz muvaffaqiyatli qo'shildi")
    navidate("/")
  };

  return (
    <div className="create__customer">
      <h2>Mijoz yaratish</h2>
      <form onSubmit={handleSubmit} action="">
        <input
          value={customer["name"]}
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
          // onBlur={handleAddPhoneToPhones}
          format="+998 ## ### ## ##"
          className="inp"
          allowEmptyFormatting
          mask="_"
          value={customer["tel"]}
          name="tel"
          required
        />

        <input
          value={customer["address"]}
          onChange={handleChange}
          autoComplete="off"
          required
          type="text"
          className="inp"
          placeholder="manzil"
          name="address"
        />
        <button className="btn regular">Yaratish</button>
      </form>
    </div>
  );
}

export default CreateCustomer;
