import React from "react";
import { Button } from "@material-ui/core";
import { useFormikContext } from "formik";

const ButtonUI = ({ children, ...otherProps }) => {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  const configButton = {
    ...otherProps,
    variant: "contained",
    color: "primary",
    onClick: handleSubmit,
    size: "large",
  };
  //Renderizar el button text(children) que es pasado al componente
  return <Button {...configButton}>{children}</Button>;
};

export { ButtonUI, Button };
