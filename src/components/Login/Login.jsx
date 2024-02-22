import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import loginConfig from "./credentials";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const expectedUsername = loginConfig.VITE_APP_USERNAME;
  const expectedPassword = loginConfig.VITE_APP_PASSWORD;

  const handleLogin = () => {
    if (username === expectedUsername && password === expectedPassword) {
      setLoginError(false);
      localStorage.setItem("username", username);
      navigate("/dashboard");
    } else {
      setLoginError(true);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src={logo}
        className="img-fluid"
        alt="logo"
        style={{ width: "300px" }}
      />
      <div>
        <input
          class="form-control"
          type="text"
          placeholder="Ingrese su usuario"
          aria-label="default input example"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label for="inputPassword5" class="form-label"></label>
        <input
          type="password"
          id="inputPassword5"
          placeholder="Ingrese su contraseña"
          class="form-control"
          aria-describedby="passwordHelpBlock"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {loginError && (
          <div className="form-text" style={{ color: "red" }}>
            Credenciales incorrectas
          </div>
        )}
      </div>
      <br />
      <button type="button" className="btn btn-primary" onClick={handleLogin}>
        Iniciar sesión
      </button>
    </div>
  );
}

export default Login;
