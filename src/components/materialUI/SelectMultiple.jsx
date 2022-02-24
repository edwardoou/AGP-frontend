import React from "react";
import { TextField, Autocomplete } from "@mui/material";
import { useField, useFormikContext } from "formik";

const SelectMultipleUI = ({ name, options, ...otherprops }) => {
  //field=data => name="equipo_trabajadores"
  const [field, data] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (event, valor) =>
    //Se le da al NAME, el VALUE donde esta el ID y se vuelve un string con join()
    setFieldValue(
      name,
      valor.map((elemento) => elemento.idtrabajadores).join()
    );

  const configSelect = {
    ...field,
    ...otherprops,
    variant: "outlined",
    fullWidth: true,
  };

  if (data && data.touched && data.error) {
    configSelect.error = true;
    configSelect.helperText = data.error;
  }
  return (
    <Autocomplete
      multiple
      options={options}
      getOptionLabel={(option) => option.nombre}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          {...configSelect}
          placeholder="Agregar minimo dos miembros."
        />
      )}
    />
  );
};

export { SelectMultipleUI };
