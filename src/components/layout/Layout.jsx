import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import './layout.css'
//Sidebar
import Sidebar from "../sidebar/Sidebar";
//Rutas
import Routes from "../Routes";

const Layout = () => {
  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <div className="layout">
            <Sidebar {...props} />
            <div className="layout__content">
              <div className="layout__content-main">
                {/* Redireccionamiento correcto dependiendo de la url */}
                <Routes/>
              </div>
            </div>
          </div>
        )}
      />
    </BrowserRouter>
  );
};

export default Layout;
