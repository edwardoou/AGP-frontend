import React from "react";
import { TextField, MenuItem } from "@material-ui/core";
//UseFormikContext ->  hook personalizado de React que devolverá todo el estado de Formik y los helpers
import { useField, useFormikContext } from "formik";

const SelectTrabajadores = ({ name, options, ...otherprops }) => {
  const [field, data] = useField(name);
  // obtiene el setFieldValue del context
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
      {options.map((elemento) => (
        <MenuItem key={elemento.idtrabajadores} value={elemento.idtrabajadores}>
          {elemento.nombre}
        </MenuItem>
      ))}
      ;
    </TextField>
  );
};

export { SelectTrabajadores };
