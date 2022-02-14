import React from "react";
import { TextField } from "@material-ui/core";
import { useField } from "formik";

const DateUI = ({ name, ...otherProps }) => {
  const [field, data] = useField(name);

  const configDate = {
    ...field,
    ...otherProps,
    type: "date",
    variant: "outlined",
    fullWidth: true,
    //shrink -> necesario para los textfield de tipo date
    InputLabelProps: {
      shrink: true,
    },
  };
  if (data && data.touched && data.error) {
    configDate.error = true;
    configDate.helperText = data.error;
  }
  return <TextField {...configDate}></TextField>;
};

export {DateUI};
