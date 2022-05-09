import React, { Component } from "react";
import { Container, Grid, Typography, withStyles } from "@material-ui/core";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import { Formik, Form } from "formik";
import {
  ButtonUI,
  TextfieldUI,
  SelectUI,
  DateUI,
  SelectTrabajadores,
} from "../../components/materialUI";
//Yup-> libreria de validacion
import * as Yup from "yup";
//Alertas
import swal from "sweetalert";
//Json data

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
  responsabilidad: "",
  tipo: "",
  asistencia: "",
  descripcion: "",
  fecha_limite: "",
  estado: "",
  project_id: "",
  responsable_id: "",
};

//Validacion con Yup
const FORM_VALIDATION = Yup.object().shape({
  nombre: Yup.string()
    .max(100, "Superaste el numero de carácteres permitidos")
    .required("Campo requerido"),
  tipo: Yup.string().required("Campo requerido"),
  asistencia: Yup.string().required("Campo requerido"),
  descripcion: Yup.string().required("Campo requerido"),
  estado: Yup.string().required("Campo requerido"),
  project_id: Yup.number().required("Campo requerido"),
  responsable_id: Yup.number().required("Campo requerido"),
  fecha_limite: Yup.date().required("Fecha Requerida"),
});

class FormActividad extends Component {
  constructor(props) {
    super(props);
    this.state = { trabajadores: [], projects: [] };
  }

  handleChange = (e) => {
    console.log(e.target.files[0]);
    //El archivo
    e.preventDefault();
    this.setState({
      archivo: e.target.files[0],
    });
  };

  //Axios GET para los selects
  componentDidMount() {
    //Trabajadores
    axios.get(process.env.REACT_APP_URL + "/trabajadores").then((res) => {
      this.setState({ trabajadores: res.data.data });
    });
    //Trabajadores
    axios.get(process.env.REACT_APP_URL + "/projects").then((res) => {
      this.setState({ projects: res.data.data });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="card">
        <Grid container>
          <Grid item xs={12}>
            <h2>Formulario de Acciones</h2>
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
                    formData.append("archivo", this.state.archivo);
                    for (let property of formData.entries()) {
                      console.log(property[0], property[1]);
                    }

                    //POST a la url, uso el metodo largo por mejor orden
                    axios({
                      method: "post",
                      url: process.env.REACT_APP_URL + "/acciones",
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
                          label="Nombre de la accion"
                          inputProps={{
                            maxLength: 100,
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <SelectTrabajadores
                          name="responsable_id"
                          label="Responsable"
                          options={this.state.trabajadores}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <SelectTrabajadores
                          name="project_id"
                          label="Project"
                          options={this.state.projects}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldUI
                          name="estado"
                          label="Estado"
                          inputProps={{
                            maxLength: 15,
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldUI
                          name="tipo"
                          label="Tipo"
                          inputProps={{
                            maxLength: 100,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextfieldUI
                          name="asistencia"
                          label="Asistencia"
                          inputProps={{
                            maxLength: 15,
                          }}
                        />
                      </Grid>

                      {/* <Grid item xs={6}>
                        <TextField
                          //No sirve para nada, solo lo agrego para que el label este estatico
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                            ),
                          }}
                          //------------------------------------------------------------------
                          defaultValue=""
                          label="Archivo (Opcional)"
                          type="file"
                          variant="outlined"
                          fullWidth
                          onChange={this.handleChange}
                        ></TextField>
                      </Grid> */}
                      <Grid item xs={6}>
                        <DateUI name="fecha_limite" label="Fecha Limite" />
                      </Grid>
                      <Grid item xs={12}>
                        <TextfieldUI
                          name="descripcion"
                          label="Descripcion(Opcional)"
                          multiline={true}
                          rows={4}
                          inputProps={{
                            maxLength: 200,
                          }}
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

export default withStyles(useStyles)(FormActividad);
