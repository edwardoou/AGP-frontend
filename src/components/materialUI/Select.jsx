import React from "react";
import { TextField, MenuItem } from "@material-ui/core";
//UseFormikContext ->  hook personalizado de React que devolverá el FormikBag de Formik
import { useField, useFormikContext } from "formik";

const SelectUI = ({ name, options, ...otherprops }) => {
  const [field, data] = useField(name);
  const { setFieldValue } = useFormikContext();

  //const que recibira un evento que es un objeto que debera ser desestructurado
  const handleChange = (evt) => {
    //obtener la opcion seleccionada (value)
    const { value } = evt.target;
    //setear al NAME el VALUE obtenido
    setFieldValue(name, value);
  };

  const configSelect = {
    ...field,
    ...otherprops,
    select: true,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
  };

  if (data && data.touched && data.error) {
    configSelect.error = true;
    configSelect.helperText = data.error;
  }
  return (
    <TextField {...configSelect}>
      {/* Los objetos no se pueden mapear */}
      {/* Se obtiene los valores(options) de los objects y estos se mapean */}
      {Object.keys(options).map((valor, index) => {
        return (
          //Se ve en las opciones el VALUE, y se envia el INDEX
          <MenuItem key={index} value={valor}>
            {options[valor]}
          </MenuItem>
        );
      })}
      ;
    </TextField>
  );
};

export { SelectUI, MenuItem };
