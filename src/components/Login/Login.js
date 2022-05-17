import React, { useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}


export default function Login({setToken}) {

    const[username, setUserName] = useState();
    const[password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
    }

  return(
    <div className="login-wrapper">
      <h1>Por favor ingresa tus datos</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Usuario</p>
          <input type="text" onChange={e => setUserName(e.target.value)}/> 
        </label>
        <label>
          <p>Contraseña</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}