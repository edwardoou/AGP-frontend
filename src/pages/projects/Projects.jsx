import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
//import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import swal from "sweetalert";
import { GridActionsCellItem, DataGrid } from "@mui/x-data-grid";
import fileDownload from "js-file-download";
import { useHistory } from "react-router-dom";

const TableProjects = () => {
  const history = useHistory();
  const [dataProject, setDataProject] = useState([]);
  const url = process.env.REACT_APP_URL;

  //Projects
  useEffect(() => {
    axios.get(url + "/projects").then((res) => {
      setDataProject(res.data.data);
    });
  }, [url, setDataProject]);

  //Kanban(a futuro)
  function kanban(id) {
    if (id > 0) {
      history.push("/gant/" + id);
    } else {
      swal("Error", "Hay un error con la fila", "error");
    }
  }

  //Descarga
  function descargar(id) {
    for (let i = 0; i < dataProject.length; i++) {
      if (dataProject[i].id === id) {
        const archivoURL = dataProject[i].archivo;
        if (archivoURL) {
          //en replace([\\/ le quite un / por recomendacion de eslint])
          const filename = archivoURL.replace(/^.*[\\/]/, "");
          let ext = archivoURL.split(".");
          ext = ext[ext.length - 1];
          axios({
            url: url + "/descarga/" + filename,
            method: "get",
            responseType: "blob",
          }).then((res) => {
            fileDownload(res.dataProject, `${dataProject[i].nombre}.${ext}`);
          });
          swal("Se descargo el archivo exitosamente!", {
            icon: "success",
          });
        } else {
          swal("Error", "Este proyecto no contiene un archivo", "error");
        }
      }
    }
  }

  //Editar
  function editlink(id, modelo) {
    if (modelo === "Proyecto") {
      history.push("/proyectos/" + id);
    } else if (modelo === "Innovacion") {
      history.push("/innovaciones/" + id);
    } else if (modelo === "Proceso") {
      history.push("/procesos/" + id);
    } else {
      swal("Error", "Hay un error con la fila", "error");
    }
  }

  //DELETE
  function eliminar(id) {
    swal({
      title: "¿Esta seguro de eliminar la fila seleccionada?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar!"],
      dangerMode: true,
    }).then((value) => {
      if (value) {
        axios.delete(url + "/projects/" + id).then((res) => {
          var temp = dataProject.filter((project) => project.id !== id);
          //Actualiza la tabla automaticamente
          setDataProject(temp);
          swal("Se elimino la fila exitosamente!", {
            icon: "success",
          });
        });
      } else {
        swal("Se cancelo la eliminación!");
      }
    });
  }

  return (
    <>
      <h2 className="page-header">Tabla General</h2>
      <div className="card" style={{ height: 762, width: "100%" }}>
        <DataGrid
          getRowId={(row) => row.id}
          rows={dataProject}
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
                  onClick={() => descargar(params.row.id)}
                />,
                /* <GridActionsCellItem
                    icon={<ViewKanbanIcon />}
                    label="KanBan"
                    onClick={() => this.kanban(params.row.id)}
                  />, */
                <GridActionsCellItem
                  icon={<EditIcon />}
                  label="Editar"
                  onClick={() => editlink(params.row.id, params.row.modelo)}
                />,
                <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Eliminar"
                  onClick={() => eliminar(params.row.id)}
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
};

export default TableProjects;
