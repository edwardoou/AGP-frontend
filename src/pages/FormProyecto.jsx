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
} from "../components/materialUI";
//Yup-> libreria de validacion
import * as Yup from "yup";
//Json data
import responsabilidad from "../assets/JsonData/responsabilidad.json";
import prioridad from "../assets/JsonData/prioridad.json";
import areas from "../assets/JsonData/areas.json";
import empresas from "../assets/JsonData/empresas.json";
import sedes from "../assets/JsonData/sedes.json";

//Uso withStyles en lugar de makeStyles debido a que es un compenente
const useStyles = (theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5)
  },
  buttonStyle: {
    marginTop: theme.spacing(2),
    width: 300,
  },
});

//Formato inicial
const INITIAL_FORM_STATE = {
  modelo: "Proyecto",
  estado: "To Do",
  tipo: "Estandar",
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
  costo: "",
  archivo: "",
  fecha_identificacion: "",
  fecha_inicio: "",
  fecha_cierre: "",
};

//Validacion con Yup
const FORM_VALIDATION = Yup.object().shape({
  nombre: Yup.string().required("Campo requerido"),
  responsable_id: Yup.number().required("Campo requerido"),
  area_usuario: Yup.string().required("Campo requerido"),
  area_responsable: Yup.string().required("Campo requerido"),
  empresa_usuario: Yup.string().required("Campo requerido"),
  empresa_responsable: Yup.string().required("Campo requerido"),
  sede_usuario: Yup.string().required("Campo requerido"),
  sede_responsable: Yup.string().required("Campo requerido"),
  prioridad: Yup.string().required("Campo requerido"),
  responsabilidad: Yup.string().required("Campo requerido"),
  descripcion: Yup.string().required("Campo requerido"),
  //Revisar cual es el minimo de valores en la db
  costo: Yup.number()
    .typeError("Por favor digitar un número valido")
    .required("Campo requerido"),
  //Esto lo pongo string porque no se si habra para field
  archivo: Yup.string(),
  fecha_identificacion: Yup.date().required("Fecha Requerida"),
  fecha_inicio: Yup.date().required("Fecha Requerida"),
  fecha_cierre: Yup.date().required("Fecha Requerida"),
});

class FormProyecto extends Component {
  state = {
    trabajadores: [],
  };
  //Axios GET para los selects
  componentDidMount() {
    //Trabajadores
    axios.get(process.env.REACT_APP_URL + "/trabajadores").then((res) => {
      //console.log(res.data);
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
                    resetForm();
                    //POST a la url
                    axios
                      .post(process.env.REACT_APP_URL + "/projects", values)
                      .then(console.log(values));
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
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextfieldUI
                          name="equipo_trabajo"
                          label="Equipo de Trabajo"
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
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                S/.
                              </InputAdornment>
                            ),
                          }}
                          type="number"
                          name="costo"
                          label="Costo"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldUI
                          //No sirve para nada, solo lo agrego para que el label este estatico
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                            ),
                          }}
                          //------------------------------------------------------------------
                          label="Archivo (Opcional)"
                          name="archivo"
                          type="file"
                        />
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
