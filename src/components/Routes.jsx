import React from "react";
import { Route, Switch } from "react-router";

import Dashboard from "../pages/Dashboard";

//*Projects
import Projects from "../pages/projects/Projects";
//Proyecto
import FormProyecto from "../pages/projects/proyecto/FormProyecto";
import EditProyecto from "../pages/projects/proyecto/EditProyecto";
//Proceso
import FormProceso from "../pages/projects/proceso/FormProceso";
//Innovacion
import FormInnovacion from "../pages/projects/innovacion/FormInnovacion";

//*Trabajador
import Trabajadores from "../pages/trabajadores/Trabajadores";
import FormTrabajador from "../pages/trabajadores/FormTrabajador";
import EditTrabajador from "../pages/trabajadores/EditTrabajador";

import KanbanGeneral from "../pages/KanBan";
import Test from "../pages/KanBanTest";
import Actividades from "../pages/actividades/Actividades";
import Acciones from "../pages/acciones/Acciones";

const Routes = () => {
  return (
    <Switch>
      <Route path={["/", "/dashboard"]} exact component={Dashboard} />
      <Route path="/gant/:idproject" component={Test} />
      <Route path="/kanban" component={KanbanGeneral} />
      {/* Tablas */}
      <Route path="/projects" component={Projects} />
      <Route path="/actividades" component={Actividades} />
      <Route path="/acciones" component={Acciones} />
      <Route path="/trabajadores" component={Trabajadores} />
      {/* Formularios */}
      <Route path="/formularios/proyecto" component={FormProyecto} />
      <Route path="/formularios/innovacion" component={FormInnovacion} />
      <Route path="/formularios/proceso" component={FormProceso} />
      <Route path="/formularios/trabajador" component={FormTrabajador} />
      {/* Edit Formularios */}
      <Route path="/proyectos/:id" component={EditProyecto} />
      <Route path="/trabajador/:id" component={EditTrabajador} />
    </Switch>
  );
};

export default Routes;
