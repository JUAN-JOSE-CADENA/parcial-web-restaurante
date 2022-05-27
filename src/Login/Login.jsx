import { Button, Input, Loading } from "@nextui-org/react";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Styles from "./Login.module.scss";
import { doLoginAction } from "../reduxDucks/userDuck";

function Login({ fetching, error, doLoginAction }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = user;
    doLoginAction(email, password);
  };
  return (
    <div>
      <form className={Styles.formulario} onSubmit={handleSubmit}>
        <h1>Inicio de sesión</h1>
        <Input
          bordered
          width="25rem"
          required
          onChange={handleChange}
          type="email"
          name="email"
          label="Correo"
          placeholder="tuemail@mail.com"
          value={user.email}
        />
        <Input.Password
          bordered
          width="25rem"
          required
          onChange={handleChange}
          name="password"
          label="Contraseña"
          value={user.password}
        />
        <Button type={"submit"}>
          {fetching ? (
              <Loading color="currentColor" size="sm"></Loading>
          ) : "Inicia Sesión" }
        </Button>
        {error ? (
          error.includes("already") ? (
            <p className={Styles.error}>
              Ya existe una cuenta asociada a este correo
            </p>
          ) : null
        ) : null}
        <div className={Styles.login}>
          <p>¿Aún no tienes una cuenta?</p>
          <Link to="/signup">Registrate</Link>
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

export default connect(mapState, { doLoginAction })(Login);
