import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import GeeksLogo from "../../img/geeksLogo.png";

export const Navbar = () => {
  const navigate = useNavigate()
  const { store, actions } = useContext(Context);
 

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </ button>
        <Link className="navbar-brand" to="/">
          <img className=" imag "
            src={GeeksLogo}
            height="15"
            alt="GeoCaching logo"
          />
        </Link>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="#">
                DASHBOARD
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                SOBRE NOSOTROS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                CODING BOOTCAMP
              </Link>
            </li>
          </ul>
        </div>

        <div className="row me-1">
          {store.currentUserEmail ?
            <button type="button" className="col btn btn-outline-danger" onClick={async () => {
              if (await actions.logout()) {
                navigate("/")
              }
            }}>
              Logout
            </button> :
            <div className="">
              <Link to="/login">
                <button type="button" className="col btn btn-outline-success mx-2">Iniciar sesión</button>
              </Link>
              <Link to="/register">
                <button type="button" className="col btn btn-outline-danger"> Registrarse</button>
              </Link>

            </div>}
        </div>
      </div>
    </nav>
  );
};
