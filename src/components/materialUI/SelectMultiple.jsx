import React from "react";
import { TextField, Chip, MenuItem } from "@mui/material";
import { useField, useFormikContext } from "formik";

const SelectMultipleUI = ({ name, options, ...otherprops }) => {
  const [field, data] = useField(name);
  const [selectState, setSelectState] = React.useState([]);
  const { setFieldValue } = useFormikContext();

  //const que recibira un evento que es un objeto que debera ser desestructurado
  const handleChange = (evt) => {
    //obtener la opcion seleccionada (value)
    const { value } = evt.target;
    //Permite añadir varios valores
    setSelectState(typeof value === "string" ? value.split(",") : value);
    //setear al NAME el VALUE obtenido, luego el .join() lo convierte en String
    setFieldValue(name, value.join());
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
    <TextField
      {...configSelect}
      value={selectState || ""}
      SelectProps={{
        multiple: true,
      }}
    >
      {options.map((valor) => (
        <MenuItem key={valor.idtrabajadores} value={valor.idtrabajadores}>
          {valor.nombre}
        </MenuItem>
      ))}
      ;
    </TextField>
  );
};

export { SelectMultipleUI };
