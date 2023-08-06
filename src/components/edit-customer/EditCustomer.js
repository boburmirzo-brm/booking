// @ts-nocheck
import React, { useState, useEffect, memo } from "react";
import "./EditCustomer.css";
import { PatternFormat } from "react-number-format";
import { BsChevronLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateCustomer } from "../../context/customers"
import { updateAdmin } from "../../context/admins"

const initialState = {
  name: "",
  tel: "",
  address: "",
  status: 0,
  date: ""
};

function EditCustomer({ setEditShow, editShow, setRealod }) {
  const [data, setData] = useState(initialState);
  const dispatch = useDispatch();
  const admins = useSelector((s) => s.admins.value);
  useEffect(() => {
    if (editShow) {
      setData(editShow);
    }
  }, [editShow]);

  const handleChange = (e) => {
    let key = e.target.getAttribute("name");
    let value = e.target.value;
    const cloneData = { ...data };
    cloneData[key] = value;
    setData(cloneData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(editShow.admin){
      if(admins.find(i=> i.username === data.username)){
        return toast.error("username band")
      }
      dispatch(updateAdmin(data))
    }else{
      dispatch(updateCustomer(data))
    }
    setEditShow(null)
    setRealod(p=>!p)
    toast.success("Mijoz muvaffaqiyatli o'zgartirildi")
  };
  console.log(editShow?.tel);
  console.log(data?.tel);

  return (
    <>
      {editShow ? (
        <div onClick={() => setEditShow(null)} className="right__model-shadow"></div>
      ) : (
        <></>
      )}
      <div className={`right__model ${editShow ? "right__show" : ""}`}>
        <button type="button" onClick={() => setEditShow(null)} className="btn__exit">
          <BsChevronLeft />
        </button>
        <button type="button" onClick={() => setEditShow(null)} className="btn__cancel">
          <BsChevronLeft />
        </button>
        <div className="edit__customer-wrapper">
          <h2>Mijozni tahrirlash</h2>
          <form onSubmit={handleSubmit} className="cc-form">
            <label htmlFor="fname">Ism: </label>
            <input
              type="text"
              className="cc-input"
              id="fname"
              name="name"
              onChange={handleChange}
              value={data.name}
              required
            />
            <div className="cc-wrap">
              <label htmlFor="phones">Telefon raqam: </label>
              <PatternFormat
                onChange={handleChange}
                format="+(###) ## ### ## ##"
                className="cc-input"
                allowEmptyFormatting
                mask="_"
                name="tel"
                value={data.tel}
              />
              <br />
            </div>
            <label htmlFor="address">Mazil: </label>
            <input
              type="text"
              className="cc-input"
              id="address"
              name="address"
              onChange={handleChange}
              value={data.address}
              placeholder="Manzil"
              required
            />
            {
              editShow?.admin ? 
              <>
                <label htmlFor="address">username: </label>
              <input
                type="text"
                className="cc-input"
                id="username"
                name="username"
                onChange={handleChange}
                value={data.username}
                placeholder="username"
                required
              />
              <br />
                <label htmlFor="address">password: </label>
              <input
                type="text"
                className="cc-input"
                id="password"
                name="password"
                onChange={handleChange}
                value={data.password}
                placeholder="password"
                required
              />
              </>
              :<></>
            }
            <br />
            <br />
            <button className="btn regular">
               Saqlash
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default memo(EditCustomer);
