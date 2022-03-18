import React from "react";
import { Route, Switch } from "react-router";

//Paginas
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import Trabajadores from "../pages/Trabajadores"
import FormProyecto from "../pages/FormProyecto";
import FormProceso from "../pages/FormProceso";
import FormInnovacion from "../pages/FormInnovacion";
import FormTrabajador from "../pages/FormTrabajador";
import EditProyecto from "../pages/EditProyecto";
import KanbanGeneral from "../pages/KanBan";
import Test from "../pages/KanBanTest";

const Routes = () => {
  return (
    <Switch>
      <Route path={["/", "/dashboard"]} exact component={Dashboard} />
      <Route path="/gant/:idproject" component={Test} />
      <Route path="/kanban" component={KanbanGeneral} />
      {/* Tablas */}
      <Route path="/projects" component={Projects} />
      <Route path="/trabajadores" component={Trabajadores} />
      {/* Formularios */}
      <Route path="/formularios/proyecto" component={FormProyecto} />
      <Route path="/formularios/innovacion" component={FormInnovacion} />
      <Route path="/formularios/proceso" component={FormProceso} />
      <Route path="/formularios/trabajador" component={FormTrabajador} />
      {/* Edit Formularios */}
      <Route path="/proyectos/:id" component={EditProyecto} />
    </Switch>
  );
};

export default Routes;
