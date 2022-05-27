import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { doRegisterAction } from "../reduxDucks/userDuck";
import Styles from "./Register.module.scss";

function Register({ fetching, error, doRegisterAction }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, passwordConfirm } = user;
    doRegisterAction(email, password, passwordConfirm);
  };

  return (
    <div>
      <form className={Styles.formulario} onSubmit={handleSubmit}>
        <h1>Registro</h1>
        <Input
          bordered
          width="25rem"
          required
          onChange={handleChange}
          helperText={
            error
              ? error.includes("formatted")
                ? "El correo debe ser valido"
                : null
              : null
          }
          helperColor={
            error ? (error.includes("formatted") ? "error" : "") : null
          }
          status={error ? (error.includes("formatted") ? "error" : "") : null}
          type="email"
          name="email"
          label="Correo"
          placeholder="tuemail@mail.com"
          value={user.email}
        />
        <Input.Password
          bordered
          helperText={
            error
              ? error.includes("password")
                ? "La contraseña debe tener al menos 6 caracteres"
                : null
              : null
          }
          helperColor={
            error ? (error.includes("password") ? "error" : "") : null
          }
          status={error ? (error.includes("password") ? "error" : "") : null}
          width="25rem"
          required
          onChange={handleChange}
          name="password"
          label="Contraseña"
          value={user.password}
        />
        <Input.Password
          bordered
          helperText={
            error
              ? error.includes("passConfirm")
                ? "Las contraseñas deben coincidir"
                : null
              : null
          }
          helperColor={
            error ? (error.includes("passConfirm") ? "error" : "") : null
          }
          status={error ? (error.includes("passConfirm") ? "error" : "") : null}
          required
          width="25rem"
          name="passwordConfirm"
          onChange={handleChange}
          label="Confirmar Contraseña"
        />
        <Button type={"submit"}>Registrate</Button>
        {error ? (
          error.includes("already") ? (
            <p className={Styles.error}>Ya existe una cuenta asociada a este correo</p>
          ) : null
        ) : null}
        <div className={Styles.login}>
          <p>¿Ya tienes una cuenta?</p>
          <Link to="/">Inicia Sesión</Link>
        </div>
      </form>
    </div>
  );
}

const mapState = ({ user: { fetching, loggedIn, error } }) => {
  return {
    fetching,
    loggedIn,
    error,
  };
};

export default connect(mapState, { doRegisterAction })(Register);
