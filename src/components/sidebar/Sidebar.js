import React, { useState, memo } from "react";
import "./Sidebar.css";
import { ROTUES_FOR_SIDEBAR } from "../../static";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsChevronLeft } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const adminOrOwner = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    if(window.confirm("Ishonchingiz komilmi?")){
      localStorage.removeItem("user")
      navigate("/login")
    }
  }
  return (
    <div>
      <div
        onClick={() => setShow((p) => !p)}
        style={{ transform: `scale(${show ? 60 : 0})` }}
        className="sidebar__shadow"
      ></div>
      <div className={`sidebar ${show ? "sidebar__show" : ""}`}>
        <div>
          <h2>
            Admin dashboard
          </h2>
          <ul className="sidebar__collection">
            {ROTUES_FOR_SIDEBAR?.map((item) => 
                <li onClick={() => setShow(false)} key={item.id} className="sidebar__item">
                  <NavLink to={item.to} className="sidebar__link">
                    {item.title}
                  </NavLink>
                </li>
              )}
              <li onClick={handleLogout} className="sidebar__item sidebar__link sidebar__exit">Tizimdan chiqish</li>
          </ul>
        </div>
        <div className="sidebar__brand">
          <p>Boburmirzo Rasulov</p>
        </div>
      </div>
      <div className="mobile__bottom">
        <button onClick={() => setShow((p) => !p)}>
          {show ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
        <button onClick={() => navigate(-1)}>
          <BsChevronLeft />
        </button>
      </div>
    </div>
  );
}

export default memo(Sidebar);
