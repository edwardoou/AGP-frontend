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
  SelectTrabajadores,
  SelectMultipleUI,
} from "../components/materialUI";
//Yup-> libreria de validacion
import * as Yup from "yup";
//Alertas
import swal from "sweetalert";
//Json data
import responsabilidad from "../assets/JsonData/responsabilidad.json";
import prioridad from "../assets/JsonData/prioridad.json";
import areas from "../assets/JsonData/areas.json";
import empresas from "../assets/JsonData/empresas.json";
import sedes from "../assets/JsonData/sedes.json";

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
  modelo: "Proyecto",
  estado: "To-Do",
  tipo: "None",
  nombre: "",
  responsable_id: "",
  area_usuario: "",
  area_responsable: "",
  empresa_usuario: "",
  empresa_responsable: "",
  sede_usuario: "",
  sede_responsable: "",
  prioridad: "",
  responsabilidad: "",
  descripcion: "",
  costo: 0,
  fecha_identificacion: "",
  fecha_inicio: "",
  fecha_cierre: "",
  equipo_trabajo: "",
};

//Validacion con Yup
const FORM_VALIDATION = Yup.object().shape({
  nombre: Yup.string()
    .max(100, "Superaste el numero de carácteres permitidos")
    .required("Campo requerido"),
  responsable_id: Yup.number().required("Campo requerido"),
  area_usuario: Yup.string().required("Campo requerido"),
  area_responsable: Yup.string().required("Campo requerido"),
  empresa_usuario: Yup.string().required("Campo requerido"),
  empresa_responsable: Yup.string().required("Campo requerido"),
  sede_usuario: Yup.string().required("Campo requerido"),
  sede_responsable: Yup.string().required("Campo requerido"),
  prioridad: Yup.string().required("Campo requerido"),
  responsabilidad: Yup.string().required("Campo requerido"),
  descripcion: Yup.string()
    .max(200, "Superaste el numero de carácteres permitidos")
    .required("Campo requerido"),
  //en la bd esta de tipo decimal(10,2)
  costo: Yup.number()
    .max(99999999.99, "Número muy elevado, max. 99999999.99")
    .typeError("Por favor digitar un número valido")
    .required("Campo requerido"),
  fecha_identificacion: Yup.date().required("Fecha Requerida"),
  fecha_inicio: Yup.date().required("Fecha Requerida"),
  fecha_cierre: Yup.date().required("Fecha Requerida"),
  equipo_trabajo: Yup.string().required("Campo requerido"),
});

class FormProyecto extends Component {
  constructor(props) {
    super(props);
    this.state = { trabajadores: [] };
  }

  handleChange = (e) => {
    /* console.log(e.target.files[0]); */
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
      /* console.log(res.data); */
      this.setState({ trabajadores: res.data });
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className="card">
        <Grid container>
          <Grid item xs={12}>
            <h2>Formulario de Proyectos</h2>
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
                    /* for (let property of formData.entries()) {
                      console.log(property[0], property[1]);
                    } */

                    //POST a la url, uso el metodo largo por mejor orden
                    axios({
                      method: "post",
                      url: process.env.REACT_APP_URL + "/projects",
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
                        <Typography variant="h6">Datos del Proyecto</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <TextfieldUI
                          name="nombre"
                          label="Nombre del Proyecto"
                          inputProps={{
                            maxLength: 100,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <SelectMultipleUI
                          name="equipo_trabajo"
                          label="Equipo de Trabajadores"
                          options={this.state.trabajadores}
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
                        <SelectUI
                          name="responsabilidad"
                          label="Responsabilidad"
                          options={responsabilidad}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <SelectUI
                          name="area_responsable"
                          label="Área Responsable"
                          options={areas}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <SelectUI
                          name="empresa_responsable"
                          label="Empresa Responsable"
                          options={empresas}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <SelectUI
                          name="sede_responsable"
                          label="Sede Responsable"
                          options={sedes}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <SelectUI
                          name="area_usuario"
                          label="Área del Usuario"
                          options={areas}
                        />
                      </Grid>

                      <Grid item xs={4}>
                        <SelectUI
                          name="empresa_usuario"
                          label="Empresa del Usuario"
                          options={empresas}
                        />
                      </Grid>

                      <Grid item xs={4}>
                        <SelectUI
                          name="sede_usuario"
                          label="Sede del Usuario"
                          options={sedes}
                        />
                      </Grid>

                      <Grid item xs={3}>
                        <SelectUI
                          name="prioridad"
                          label="Prioridad"
                          options={prioridad}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextfieldUI
                          //InputProps -> propiedades al componente <Input> directamente, que esta dentro de TextField
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                S/.
                              </InputAdornment>
                            ),
                          }}
                          //inputProps -> atributos al elemento <input> de HTML
                          inputProps={{
                            max: 99999999.99,
                            min: 0,
                            step: 0.5,
                            inputMode: "decimal",
                          }}
                          type="number"
                          name="costo"
                          label="Costo"
                        />
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
                          label="Archivo (Opcional)"
                          type="file"
                          variant="outlined"
                          fullWidth
                          onChange={this.handleChange}
                        ></TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextfieldUI
                          name="descripcion"
                          label="Descripción del Proyecto"
                          multiline={true}
                          rows={4}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6">Fechas</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <DateUI
                          name="fecha_identificacion"
                          label="Fecha de Identificación"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <DateUI name="fecha_inicio" label="Fecha de Inicio" />
                      </Grid>
                      <Grid item xs={4}>
                        <DateUI name="fecha_cierre" label="Fecha de Cierre" />
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
