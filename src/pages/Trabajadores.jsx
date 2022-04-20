import React, { Component } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
//Alertas
import swal from "sweetalert";
import { GridActionsCellItem, DataGrid } from "@mui/x-data-grid";

class TableTrabajadores extends Component {
  constructor(props) {
    super(props);
    this.state = { trabajadores: [] };
  }

  componentDidMount() {
    //Projects
    axios.get(process.env.REACT_APP_URL + "/trabajadores").then((res) => {
      /* console.log(res.data); */
      this.setState({ trabajadores: res.data });
    });
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

  /* 
  TODO: DELETE accion
  no se si implementar el casade al eliminar el trabajador, todavia estoy en duda, no se si dar la posibilidad de eliminar al trabajador o negar esa funcion
  */
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
          .delete(process.env.REACT_APP_URL + "/trabajadores/" + id)
          .then((res) => {
            var temp = this.state.trabajadores.filter(
              (trabajador) => trabajador.idprojects !== id
            );
            this.setState({
              trabajadores: temp,
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
            rows={this.state.trabajadores}
            columns={[
              {
                field: "nombre",
                headerName: "NOMBRE",
                width: 180,
              },
              {
                field: "foto",
                headerName: "FOTO",
                width: 80,
                renderCell: (params) => (
                  <img
                    src={params.value}
                    display="flex"
                    height="50"
                    width="50"
                    aspectRatio="1"
                    alt={params.value}
                  />
                ), // renderCell will render the component
              },
              { field: "telefono", headerName: "TELEFONO", width: 120 },
              { field: "direccion", headerName: "DIRECCION", width: 150 },
              { field: "observacion", headerName: "OBSERVACION  ", width: 200 },
              {
                field: "sexo",
                headerName: "SEXO",
                width: 100,
              },
              {
                field: "categoria",
                headerName: "CATEGORIA",
                width: 100,
              },
              {
                field: "sede",
                headerName: "SEDE",
                width: 80,
              },
              {
                field: "area",
                headerName: "AREA",
                width: 150,
              },
              { field: "puesto", headerName: "PUESTO", width: 130 },
              {
                field: "empresa",
                headerName: "EMPRESA",
                width: 150,
              },
              {
                field: "fecha_nacimiento",
                headerName: "FECHA NACIMI.",
                width: 130,
                valueGetter(params) {
                  var date = new Date(params.row.fecha_nacimiento);
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
                field: "fecha_ingreso",
                headerName: "FECHA INGRESO",
                width: 130,
                valueGetter(params) {
                  var date = new Date(params.row.fecha_ingreso);
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
                field: "fecha_cese",
                headerName: "FECHA CESE",
                width: 130,
                type: "date",
                valueGetter(params) {
                  var date = new Date(params.row.fecha_cese);
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
                field: "actions",
                headerName: "OPCIONES",
                type: "actions",
                width: 150,
                getActions: (params) => [
                  <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Editar"
                    onClick={() =>
                      this.editlink(params.row.idprojects, params.row.modelo)
                    }
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
            rowsPerPageOptions={[11]}
          />
        </div>
      </>
    );
  }
}

export default TableTrabajadores;
