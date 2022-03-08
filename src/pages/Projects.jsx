import React, { Component } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
      /* console.log(res.data); */
      this.setState({ projects: res.data });
    });
  }

  eliminar(cod) {
    swal({
      title: "¿Esta seguro de eliminar la fila seleccionada?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      buttons: { cancelar: "Cancelar", aceptar: "Eliminar!" },
      dangerMode: true,
    }).then((value) => {
      if (value === "aceptar") {
        axios
          .delete(process.env.REACT_APP_URL + "/projects/" + cod)
          .then((res) => {
            var temp = this.state.projects.filter(
              (project) => project.idprojects !== cod
            );
            this.setState({
              projects: temp,
            });
            swal("Se elimino el archivo exitosamente!", {
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
            getRowId={(row) => row.idprojects}
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
                field: "trabajador_nombre",
                headerName: "RESPONSABLE",
                width: 150,
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
                  var date = new Date(params.row.fecha_identificacion);
                  return (
                    date.getDate() +
                    "/" +
                    (date.getMonth() + 1) +
                    "/" +
                    date.getFullYear()
                  );
                },
              },
              {
                field: "fecha_inicio",
                headerName: "FECHA INICIO",
                width: 130,
                valueGetter(params) {
                  var date = new Date(params.row.fecha_inicio);
                  return (
                    date.getDate() +
                    "/" +
                    (date.getMonth() + 1) +
                    "/" +
                    date.getFullYear()
                  );
                },
              },
              {
                field: "fecha_cierre",
                headerName: "FECHA CIERRE",
                width: 130,
                valueGetter(params) {
                  var date = new Date(params.row.fecha_cierre);
                  return (
                    date.getDate() +
                    "/" +
                    (date.getMonth() + 1) +
                    "/" +
                    date.getFullYear()
                  );
                },
              },
              {
                headerName: "OPCIONES",
                type: "actions",
                width: 100,
                getActions: (params) => [
                  <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Editar"
                    onClick={() => this.editar(params.row.idprojects)}
                  />,
                  <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Eliminar"
                    onClick={() => this.eliminar(params.row.idprojects)}
                  />,
                ],
              },
            ]}
            pageSize={11}
            rowsPerPageOptions={[5]}
          />
        </div>
      </>
    );
  }
}

export default TableProjects;
