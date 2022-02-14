import React, { useState } from "react";
import { Link } from "react-router-dom";

const SubMenu = ({ item, active }) => {
  //Si se pasa el argumento ACTIVE, agrega el valor activado, si no lo deja vacio
  const activado = active ? "active" : "";

  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <Link to={item.route} onClick={item.subNav && showSubnav}>
        <div className="sidebar__item">
          {/* Si tiene el valor active lo agrega, sino vacio */}
          <div className={`sidebar__item-inner ${activado}`}>
            <i className={item.icon}></i>
            <span>{item.display_name}</span>
            <i style={ {marginLeft : '50px'}}
              className={
                item.subNav && subnav
                  ? /* Icono de bajada */
                    item.iconOpened
                  : item.subNav
                  ? /* Icono de subida */
                    item.iconClosed
                  : null
              }
            ></i>
          </div>
        </div>
      </Link>

      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <Link to={item.route} key={index}>
              <div className="sidebar__item">
                <div className="sidebar__item-submenu">
                  <i className={item.icon}></i>
                  <span>{item.display_name}</span>
                </div>
              </div>
            </Link>
          );
        })}
    </>
  );
};

export default SubMenu;
