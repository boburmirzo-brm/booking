import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeAdmin } from "../../context/admins";
import { FiTrash2, FiEdit3 } from "react-icons/fi";
import EditCustomer from "../../components/edit-customer/EditCustomer";


function Admins() {
  const admins = useSelector((s) => s.admins.value);
  const [editShow, setEditShow] = useState(null);
  const [realod, setRealod] = useState(false);
  const [data, setDate] = useState([]);
  const dispatch = useDispatch();

  useEffect(()=>{
      setDate(admins)
  }, [realod])

  const handleDelete = (id) => {
    if (window.confirm("Ishonchingiz komilmi?")) {
      dispatch(removeAdmin({ id }));
      setRealod(p=>!p)
    }
  };

  return (
    <div>
      <div className="home__navbar">
        <h2>Barcha adminlar</h2>
      </div>
      <div className="home__wrapper">
        {data?.map((item) => (
          <div key={item.id} className="home__card">
            <div>
              <h3>{item.name}</h3>
              <p>{item.address}</p>
            </div>
            <div>
                <p><b>username</b>: {item.username}</p>
                <p><b>password</b>: {item.password}</p>
            </div>
            <div>
              <p>Telefon raqam</p>
              <a href={`tel:${item.tel}`}>{item.tel}</a>
            </div>
            <div>
              <p>Ro'yhatgan olingan sana</p>
              <p>{new Date(item.date).toLocaleString()}</p>
            </div>
            <div>
              <div onClick={() => handleDelete(item.id)} className="home__btn">
                <FiTrash2 />
              </div>
              <div onClick={() => setEditShow({...item, admin: true})} className="home__btn">
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

export default Admins;
