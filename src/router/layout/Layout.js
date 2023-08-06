import React, { memo } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./Layout.css";

function Layout() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout__content">
        <Outlet />
      </div>
    </div>
  );
}

export default memo(Layout);
