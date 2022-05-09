import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import swal from "sweetalert";
import { GridActionsCellItem, DataGrid } from "@mui/x-data-grid";
import { useHistory } from "react-router-dom";

const TableActividades = () => {
  const history = useHistory();
  const [dataActividades, setDataActividades] = useState([]);
  const url = process.env.REACT_APP_URL;

  //Actividades
  useEffect(() => {
    axios.get(url + "/actividades").then((res) => {
      setDataActividades(res.data.data);
    });
  }, [url, setDataActividades]);

  //Editar
  function editlink(id) {
    if (id) {
      history.push("/actividades/" + id);
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
        axios.delete(url + "/acciones/" + id).then((res) => {
          var temp = dataActividades.filter((actividad) => actividad.id !== id);
          //Actualiza la tabla automaticamente
          setDataActividades(temp);
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
      <h2 className="page-header">Tabla Actividades</h2>
      <div className="card" style={{ height: 762, width: "100%" }}>
        <DataGrid
          getRowId={(row) => row.id}
          rows={dataActividades}
          columns={[
            {
              field: "nombre",
              headerName: "NOMBRE",
              width: 100,
            },
            {
              field: "responsabilidad",
              headerName: "RESPONSABILIDAD",
              width: 130,
            },
            {
              field: "fecha_limite",
              headerName: "FECHA LIMITE",
              width: 130,
              type: "date",
              valueGetter(params) {
                return params.row.fecha_limite.split("T")[0];
              },
            },
            { field: "estado", headerName: "ESTADO", width: 200 },
            {
              field: "actions",
              headerName: "OPCIONES",
              type: "actions",
              width: 150,
              getActions: (params) => [
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

export default TableActividades;
