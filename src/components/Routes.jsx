import React from "react";
import { Route, Switch } from "react-router";

//Paginas
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import FormProyecto from "../pages/FormProyecto";
import FormProceso from "../pages/FormProceso";
import FormInnovacion from "../pages/FormInnovacion";

const Routes = () => {
  return (
    <Switch>
      <Route path={["/", "/dashboard"]} exact component={Dashboard} />
      <Route path="/projects" component={Projects} />
      {/* Formularios */}
      <Route path="/formularios/proyecto" component={FormProyecto} />
      <Route path="/formularios/innovacion" component={FormInnovacion} />
      <Route path="/formularios/proceso" component={FormProceso} />
    </Switch>
  );
};

export default Routes;
