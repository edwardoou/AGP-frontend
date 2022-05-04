import React, { Component } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
//Alertas
import swal from "sweetalert";
import { GridActionsCellItem, DataGrid } from "@mui/x-data-grid";

class TableProjects extends Component {
  constructor(props) {
    super(props);
    this.state = { projects: [] };
  }

  componentDidMount() {
    //Projects
    axios.get(process.env.REACT_APP_URL + "/projects").then((res) => {
      this.setState({ projects: res.data.data });
    });
  }

  //Kanban
  kanban(id) {
    if (id > 0) {
      return (window.location.href = "/gant/" + id);
    } else {
      swal("Error", "Hay un error con la fila", "error");
    }
  }

  //Descarga
  descargar(id) {
    if (id > 0) {
      swal("Error", "No hay un archivo que descargar!", "warning");
    } else {
      swal("Error", "No hay un archivo que descargar!", "warning");
    }
  }

  //Editar
  editlink(id, modelo) {
    if (modelo === "Proyecto") {
      return (window.location.href = "/proyectos/" + id);
    } else if (modelo === "Innovacion") {
      window.location.href = "http://facebook.com";
    } else if (modelo === "Proceso") {
      window.location.href = "http://twitter.com";
    } else {
      swal("Error", "Hay un error con la fila", "error");
    }
  }

  //DELETE
  eliminar(id) {
    swal({
      title: "¿Esta seguro de eliminar la fila seleccionada?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar!"],
      dangerMode: true,
    }).then((value) => {
      if (value) {
        axios
          .delete(process.env.REACT_APP_URL + "/projects/" + id)
          .then((res) => {
            var temp = this.state.projects.filter(
              (project) => project.id !== id
            );
            this.setState({
              projects: temp,
            });
            swal("Se elimino la fila exitosamente!", {
              icon: "success",
            });
          });
      } else {
        swal("Se cancelo la eliminación!");
      }
    });
  }

  render() {
    return (
      <>
        <h2 className="page-header">Tabla General</h2>
        <div className="card" style={{ height: 762, width: "100%" }}>
          <DataGrid
            getRowId={(row) => row.id}
            rows={this.state.projects}
            columns={[
              {
                field: "modelo",
                headerName: "MODELO",
                width: 100,
              },
              { field: "estado", headerName: "ESTADO", width: 130 },
              { field: "tipo", headerName: "TIPO", width: 100 },
              { field: "nombre", headerName: "NOMBRE", width: 200 },
              {
                field: "responsable",
                headerName: "RESPONSABLE",
                width: 150,
                valueGetter(params) {
                  return `${params.row.responsable.nombre}`;
                },
              },
              {
                field: "areas",
                headerName: "AREA (USUARIA - RESPONSABLE)",
                width: 300,
                valueGetter(params) {
                  return `${params.row.area_usuario || "No hay"}\n - ${
                    params.row.area_responsable || "No hay"
                  }`;
                },
              },
              {
                field: "empresa_usuario",
                headerName: "EMPRESA USUARIO",
                width: 150,
              },
              {
                field: "empresa_responsable",
                headerName: "EMPRESA USUARIO",
                width: 150,
              },
              { field: "sede_usuario", headerName: "SEDE USUARIO", width: 130 },
              {
                field: "sede_responsable",
                headerName: "SEDE RESPONSABLE",
                width: 150,
              },
              { field: "prioridad", headerName: "PRIORIDAD", width: 100 },
              {
                field: "responsabilidad",
                headerName: "RESPONSABILIDAD",
                width: 150,
              },
              {
                field: "costo",
                headerName: "COSTO",
                type: "number",
                width: 70,
              },
              {
                field: "fecha_identificacion",
                headerName: "FECHA IDENTIF.",
                width: 130,
                valueGetter(params) {
                  return params.row.fecha_identificacion.split("T")[0];
                },
              },
              {
                field: "fecha_inicio",
                headerName: "FECHA INICIO",
                width: 130,
                valueGetter(params) {
                  return params.row.fecha_inicio.split("T")[0];
                },
              },
              {
                field: "fecha_cierre",
                headerName: "FECHA CIERRE",
                width: 130,
                type: "date",
                valueGetter(params) {
                  return params.row.fecha_cierre.split("T")[0];
                },
              },
              {
                field: "actions",
                headerName: "OPCIONES",
                type: "actions",
                width: 150,
                getActions: (params) => [
                  <GridActionsCellItem
                    icon={<DownloadForOfflineIcon />}
                    label="Descargar"
                    onClick={() => this.descargar(params.row.id)}
                  />,
                  <GridActionsCellItem
                    icon={<ViewKanbanIcon />}
                    label="KanBan"
                    onClick={() => this.kanban(params.row.id)}
                  />,
                  <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Editar"
                    onClick={() =>
                      this.editlink(params.row.id, params.row.modelo)
                    }
                  />,
                  <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Eliminar"
                    onClick={() => this.eliminar(params.row.id)}
                  />,
                ],
              },
            ]}
            pageSize={11}
            rowsPerPageOptions={[11]}
          />
        </div>
      </>
    );
  }
}

export default TableProjects;
