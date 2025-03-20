import React, { useEffect, useState } from "react";
import "./Menustyle.css";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Menu() {
  const [isopen, setisopen] = useState(window.innerWidth >= 600);
  const Open_Close_Menu = () => {
    const openclose_id = document.getElementById("openclose_id");
    const menu_id = document.getElementById("menu_id");
    const menu_open_close =
      document.getElementsByClassName("menu_open_close")[0];
    if (openclose_id.className === "fa-solid fa-chevron-left") {
      menu_id.style.width = "0px";
      menu_id.className = "Menu close";
      menu_open_close.style.right = "-20px";
      setTimeout(() => {
        setisopen(false);
      }, 200);
    } else {
      menu_id.style.width = "80px";
      menu_id.className = "Menu open";
      menu_open_close.style.right = "-10px";
      setTimeout(() => {
        setisopen(true);
      }, 300);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setisopen(window.innerWidth >= 1150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="Menu" id="menu_id">
      {isopen && (
        <>
          <div className="logo">
            <img src={require("../../img/musebuddy white.png")} alt="png"  />
          </div>
          <div className="menu_icon">
            <NavLink
              className={(e) => {
                return e.isActive ? "now" : "";
              }}
              to="/home"
            >
              <i class="fa-solid fa-house-chimney"></i>
            </NavLink>
            <NavLink
              className={(e) => {
                return e.isActive ? "now" : "";
              }}
              to="/attendence"
            >
              <i class="fa-solid fa-user"></i>
            </NavLink>
            <NavLink
              className={(e) => {
                return e.isActive ? "now" : "";
              }}
              to="/leave"
            >
              <i class="fa-solid fa-calendar"></i>
            </NavLink>
          </div>
          <div className="bottom_menu">
            <i class="fa-solid fa-gear"></i>
          </div>
        </>
      )}
      <div className="menu_open_close" onClick={Open_Close_Menu}>
        <i
          id="openclose_id"
          className={`fa-solid ${
            isopen ? "fa-chevron-left" : "fa-chevron-right"
          }`}
        ></i>
      </div>
    </div>
  );
}

export default Menu;
