import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Buscador from "./Buscador/Buscador";
import Register from "./Register/Register";
import Login from "./Login/Login";
import { connect } from "react-redux";
import Restaurante from "./Restuarante/Restaurante";

function App({ fetching, loggedIn }) {
  return (
    <>
      {loggedIn ? (
        <Routes>
          <Route path="/" element={<Buscador />} />
          <Route path="/search/:id" element={<Restaurante />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      )}
    </>
  );
}

const mapState = ({ user: { fetching, loggedIn } }) => {
  return {
    fetching,
    loggedIn,
  };
};

export default connect(mapState)(App);
