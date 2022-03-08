import React from "react";
import { Route, Switch } from "react-router";

//Paginas
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import FormProyecto from "../pages/FormProyecto";
import FormProceso from "../pages/FormProceso";
import FormInnovacion from "../pages/FormInnovacion";
import FormTrabajador from "../pages/FormTrabajador";
import KanbanGeneral from "../pages/KanBan"
import Test from "../pages/KanBanTest";

const Routes = () => {
  return (
    <Switch>
      <Route path={["/", "/dashboard"]} exact component={Dashboard} />
      <Route path="/gant" component={Test} />
      <Route path="/kanban" component={KanbanGeneral} />
      <Route path="/projects" component={Projects} />
      {/* Formularios */}
      <Route path="/formularios/proyecto" component={FormProyecto} />
      <Route path="/formularios/innovacion" component={FormInnovacion} />
      <Route path="/formularios/proceso" component={FormProceso} />
      <Route path="/formularios/trabajador" component={FormTrabajador} />
    </Switch>
  );
};

export default Routes;
