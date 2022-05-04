import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  TextField,
  makeStyles,
} from "@material-ui/core";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import { Formik, Form } from "formik";
import {
  ButtonUI,
  TextfieldUI,
  SelectUI,
  DateUI,
} from "../../components/materialUI";
//Yup-> libreria de validacion
import * as Yup from "yup";
//Alertas
import swal from "sweetalert";
//Json data
import sexos from "../../assets/JsonData/sexo.json";
import categorias from "../../assets/JsonData/categoria.json";
import areas from "../../assets/JsonData/areas.json";
import empresas from "../../assets/JsonData/empresas.json";
import sedes from "../../assets/JsonData/sedes.json";

//Uso withStyles en lugar de makeStyles debido a que es un componente
const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
  },
  buttonStyle: {
    marginTop: theme.spacing(2),
    width: 300,
  },
}));

//Validacion con Yup
const FORM_VALIDATION = Yup.object().shape({
  nombre: Yup.string()
    .max(100, "Superaste el numero de carácteres permitidos")
    .required("Campo requerido"),
  telefono: Yup.string().required("Campo requerido"),
  direccion: Yup.string().required("Campo requerido"),
  sexo: Yup.string().required("Campo requerido"),
  empresa: Yup.string().required("Campo requerido"),
  categoria: Yup.string().required("Campo requerido"),
  sede: Yup.string().required("Campo requerido"),
  area: Yup.string().required("Campo requerido"),
  puesto: Yup.string().required("Campo requerido"),
  fecha_nacimiento: Yup.date().required("Fecha Requerida"),
  fecha_ingreso: Yup.date().required("Fecha Requerida"),
});

const EditTrabajador = () => {
  const [dataTrabajadores, setDataTrabajadores] = useState([]);
  let { id } = useParams();
  const classes = useStyles();
  let formData = new FormData();
  const url = process.env.REACT_APP_URL;

  useEffect(() => {
    axios.get(url + "/trabajadores/" + id).then((res) => {
      setDataTrabajadores(res.data.data);
      console.log(res.data.data);
    });
  }, [url, id, setDataTrabajadores]); //se vuelve a ejecutar si alguno de estos valores cambia

  const handleChange = (e) => {
    //El archivo
    e.preventDefault();
    formData.append("foto", e.target.files[0]);
  };

  function dateFormat(date) {
    return date.split("T")[0];
  }

  return (
    <div className="card">
      <Grid container>
        <Grid item xs={12}>
          <h2>Edicion de Trabajador</h2>
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth="md">
            <div className={classes.formWrapper}>
              <Formik
                //Reinizialisa los valores del default a los que se obtienen de la api
                enableReinitialize
                initialValues={{
                  //Si NOMBRE tiene algun valor se añade NOMBRE, si no es VACIO ("")
                  //nombre: dataProject.nombre ? dataProject.nombre : "" (esto es la manera larga de lo que abajo)
                  nombre: dataTrabajadores?.nombre ?? "",
                  telefono: dataTrabajadores?.telefono ?? "",
                  direccion: dataTrabajadores?.direccion ?? "",
                  observacion: dataTrabajadores?.observacion ?? "",
                  sexo: dataTrabajadores?.sexo ?? "",
                  empresa: dataTrabajadores?.empresa ?? "",
                  categoria: dataTrabajadores?.categoria ?? "",
                  sede: dataTrabajadores?.sede ?? "",
                  area: dataTrabajadores?.area ?? "",
                  puesto: dataTrabajadores?.puesto ?? "",
                  fecha_nacimiento: dateFormat(
                    dataTrabajadores?.fecha_nacimiento ?? ""
                  ),
                  fecha_ingreso: dateFormat(
                    dataTrabajadores?.fecha_ingreso ?? ""
                  ),
                  //fecha_cese: dateFormat(dataTrabajadores?.fecha_cese ?? ""),
                  //archivo: "",
                }}
                //Esquema de validacion, propiedad de formik que lo une con yup
                validationSchema={FORM_VALIDATION}
                onSubmit={(values, { resetForm }) => {
                  for (let value in values) {
                    formData.append(value, values[value]);
                  }
                  for (let property of formData.entries()) {
                    console.log(property[0], property[1]);
                  }

                  //POST a la url, uso el metodo largo por mejor orden
                  axios({
                    method: "put",
                    url: url + "/projects/" + id,
                    data: formData,
                    headers: new Headers({ Accept: "application/json" }),
                    validateStatus: async (status) => {
                      if (status >= 200 && status < 299) {
                        await swal(
                          "Listo!",
                          "Formulario enviado con exito!",
                          "success"
                        );
                        return (window.location.href = "/projects");
                      } else if (status === 500) {
                        return swal(
                          "Error code " + status,
                          "Error al enviar al servidor, comprueba los campos por favor!",
                          "error"
                        );
                      } else {
                        return swal(
                          "Error code " + status,
                          "Abrir la consola y observar el error, en caso no hallar solucion contactar al programador",
                          "warning"
                        );
                      }
                    },
                  }).then(
                    (response) => {
                      console.log(response);
                    },
                    (error) => {
                      console.log(error);
                    }
                  );
                }}
              >
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h6">Datos Personales</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextfieldUI
                        name="nombre"
                        label="Nombre del Trabajador"
                        inputProps={{
                          maxLength: 100,
                        }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <TextfieldUI
                        name="direccion"
                        label="Direccion"
                        inputProps={{
                          maxLength: 100,
                        }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <TextfieldUI
                        name="telefono"
                        label="Telefono"
                        inputProps={{
                          maxLength: 15,
                        }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <SelectUI name="sexo" label="Sexo" options={sexos} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6">Datos Laborales</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <SelectUI
                        name="empresa"
                        label="Empresa"
                        options={empresas}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <SelectUI name="sede" label="Sede" options={sedes} />
                    </Grid>
                    <Grid item xs={2}>
                      <SelectUI
                        name="categoria"
                        label="Categoria"
                        options={categorias}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextfieldUI
                        name="puesto"
                        label="Puesto"
                        inputProps={{
                          maxLength: 100,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <SelectUI name="area" label="Area" options={areas} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        //No sirve para nada, solo lo agrego para que el label este estatico
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start"></InputAdornment>
                          ),
                        }}
                        //------------------------------------------------------------------
                        defaultValue=""
                        label="Foto (Opcional)"
                        type="file"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextfieldUI
                        name="observacion"
                        label="Observaciones(Opcional)"
                        multiline={true}
                        rows={4}
                        inputProps={{
                          maxLength: 200,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6">Fechas</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <DateUI
                        name="fecha_nacimiento"
                        label="Fecha de Nacimiento"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <DateUI name="fecha_ingreso" label="Fecha de Ingreso" />
                    </Grid>
                    <Grid item xs={4}>
                      <DateUI
                        name="fecha_cese"
                        label="Fecha de Cese(Opcional)"
                      />
                    </Grid>
                    <Grid container justifyContent="center" alignItems="center">
                      <ButtonUI className={classes.buttonStyle}>
                        Enviar
                      </ButtonUI>
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </div>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditTrabajador;
