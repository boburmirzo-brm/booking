import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCustomer, removeCustomer } from "../../context/customers";
import "./Home.css";
import { FiTrash2, FiEdit3 } from "react-icons/fi";
import EditCustomer from "../../components/edit-customer/EditCustomer";

const CUSTOMER_OPTIONS = [
  "Sotuv",
  "Uchrashuv",
  "Bog'lanib bo'lmadi",
  "Rad etildi",
];

function Home() {
  const customers = useSelector((s) => s.customers.value);
  const [editShow, setEditShow] = useState(null);
  const [realod, setRealod] = useState(false);
  const [comment, setComment] = useState("");
  const [target, setTarget] = useState(null);
  const [data, setDate] = useState([]);
  const [filter, setFilter] = useState("all");
  const dispatch = useDispatch();
  useEffect(()=>{
    if(filter === "all"){
      setDate(customers)
    }else{
      setDate(customers.filter(i=> i.status === filter))
    }
  }, [filter,realod])

  const handleDelete = (id) => {
    if (window.confirm("Ishonchingiz komilmi?")) {
      dispatch(removeCustomer({ id }));
      setRealod(p=>!p)
    }
  };

  const handleComment = (item)=>{
    dispatch(updateCustomer({ ...item, comment, statusDate: new Date().getTime() }))
    setRealod(p=>!p)
    setTarget(null)
    setComment("")
  }
  return (
    <div>
      <div className="home__navbar">
        <h2>Barcha mijozlar</h2>
        <select onChange={e=> setFilter(e.target.value)} name="" id="">
          <option value="all">Barchasi</option>
          {CUSTOMER_OPTIONS?.map((i, inx) => (
            <option key={inx} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>
      <div className="home__wrapper">
        {data?.map((item) => (
          <div key={item.id} className="home__card">
            <div>
              <h3>{item.name}</h3>
              <p>{item.address}</p>
            </div>
            <div>
              <p>Telefon raqam</p>
              <a href={`tel:${item.tel}`}>{item.tel}</a>
            </div>
            <div>
              <select
                onClick={()=>setTarget(item.id)}
                value={item.status}
                onChange={(e) =>{
                  dispatch(updateCustomer({ ...item, status: e.target.value }))
                  setRealod(p=>!p)
                }}
                name=""
                id=""
              >
                <option value="">Tanlang</option>
                {CUSTOMER_OPTIONS?.map((i, inx) => (
                  <option key={inx} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              {
                target === item.id ? 
                <div className="comment__section">
                  <input value={comment} onChange={e=> setComment(e.target.value)} type="text" placeholder="izoh" />
                  <button onClick={()=>handleComment(item)} type="button">Kiritish</button>
                  <button onClick={()=> setTarget(null)} type="button">Bekor qilish</button>
                </div>
                : <></>
              }
            </div>
            <div>
              <p>Ro'yhatgan olingan sana</p>
              <p>{new Date(item.date).toLocaleString()}</p>
            </div>
            <div>
              {!item.status ? (
                <b>Aloqaga chiqilmagan</b>
              ) : (
                <b
                  style={{
                    color:
                      item.status === "Sotuv"
                        ? "green"
                        : item.status === "Uchrashuv"
                        ? "dodgerblue"
                        : item.status === "Rad etildi"
                        ? "crimson"
                        : item.status === "Bog'lanib bo'lmadi"
                        ? "gold"
                        : "#555",
                  }}
                >
                  {item.status}
                </b>
              )}
              <p>{item.comment}</p>
              <p>{item.statusDate ? new Date(item.statusDate).toLocaleString() : ""}</p>
            </div>
            <div>
              <div onClick={() => handleDelete(item.id)} className="home__btn">
                <FiTrash2 />
              </div>
              <div onClick={() => setEditShow(item)} className="home__btn">
                <FiEdit3 />
              </div>
            </div>
          </div>
        ))}
        {
          !data.length ? <h3 className="home__not-found">Malumot topilmadi</h3> : <></>
        }
      </div>
      <EditCustomer setEditShow={setEditShow} editShow={editShow} setRealod={setRealod} />
    </div>
  );
}

export default Home;
