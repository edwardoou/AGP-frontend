import React from "react";
import "./sidebar.css";
import logo from "../../assets/images/logo.png";
//Links, nombre e icono de los items del sidebar
import sidebar_items from "../../assets/JsonData/sidebar_routes.json";
import SubMenu from "./SubMenu";

const Sidebar = (props) => {
  //Resaltado del fondo del sidebar-item, si es que la ruta de la pagina coincide con el url actual
  const activeItem = sidebar_items.findIndex(
    (item) => item.route === props.location.pathname
  );

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={logo} alt="precor logo" />
      </div>
      {/* Iteracion para los items del sidebar */}
      {sidebar_items.map((item, index) => {
        return (
          <SubMenu
            item={item}
            key={index}
            active={index === activeItem}
          />
        );
      })}
    </div>
  );
};

export default Sidebar;
