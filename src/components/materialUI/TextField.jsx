import React from "react";
import { TextField } from "@material-ui/core";
import { useField } from "formik";

const TextfieldUI = ({ name, ...otherProps }) => {
  //se guarda en FIELD la DATA que proviene del field NAME del componente
  const [field, data] = useField(name);
  //Config para el text field
  const configTextField = {
    ...field,
    //otherProps permite pasar props para de material ui y modificar el textfield
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
  };
  //si la data ha sido seleccionada o tiene un error
  if (data && data.touched && data.error) {
    //el textfield se pondra rojo al ser true
    configTextField.error = true;
    //mensaje de error de ayuda
    configTextField.helperText = data.error;
  }

  // Se le añade la config a la etiqueta TextField
  return <TextField {...configTextField} />;
};

export {TextfieldUI};
