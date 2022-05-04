import React, { Component } from "react";
import {
  Container,
  Grid,
  Typography,
  withStyles,
  TextField,
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
const useStyles = (theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
  },
  buttonStyle: {
    marginTop: theme.spacing(2),
    width: 300,
  },
});

//Formato inicial
const INITIAL_FORM_STATE = {
  nombre: "",
  telefono: "",
  direccion: "",
  observacion: "",
  sexo: "",
  empresa: "",
  categoria: "",
  sede: "",
  area: "",
  puesto: "",
  fecha_nacimiento: "",
  fecha_ingreso: "",
  fecha_cese: "",
};

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

class FormProyecto extends Component {
  handleChange = (e) => {
    /* console.log(e.target.files[0]); */
    //El archivo
    e.preventDefault();
    this.setState({
      foto: e.target.files[0],
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="card">
        <Grid container>
          <Grid item xs={12}>
            <h2>Formulario de Trabajadores</h2>
          </Grid>
          <Grid item xs={12}>
            <Container maxWidth="md">
              <div className={classes.formWrapper}>
                <Formik
                  initialValues={{ ...INITIAL_FORM_STATE }}
                  //Esquema de validacion, propiedad de formik que lo une con yup
                  validationSchema={FORM_VALIDATION}
                  onSubmit={(values, { resetForm }) => {
                    /* console.log(values); */
                    let formData = new FormData();
                    for (let value in values) {
                      formData.append(value, values[value]);
                    }
                    formData.append("foto", this.state.foto);
                    /* for (let property of formData.entries()) {
                      console.log(property[0], property[1]);
                    } */

                    //POST a la url, uso el metodo largo por mejor orden
                    axios({
                      method: "post",
                      url: process.env.REACT_APP_URL + "/trabajadores",
                      data: formData,
                      headers: new Headers({ Accept: "application/json" }),
                      validateStatus: async (status) => {
                        if (status >= 200 && status < 299) {
                          await swal(
                            "Listo!",
                            "Formulario enviado con exito!",
                            "success"
                          );
                          return window.location.reload(false);
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
                          onChange={this.handleChange}
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
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                      >
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
  }
}

export default withStyles(useStyles)(FormProyecto);
