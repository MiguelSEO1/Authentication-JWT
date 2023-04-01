import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Register = () => {
  const navigate = useNavigate()
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);


  const sendRegisterCredential = async () => {
    const response = await fetch("https://3001-ses123456789-geocaching-w4mu5kd8u62.ws-eu93.gitpod.io/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password_hash: password
      })
    });
    const data = await response.json();
    if (response.ok) {
      navigate("/login");
    } else {
      setError(data.response)
    }
  }


  return (
    <div className="  container justify-content-center align-items-center mb-5">
      <div className="container-fluid text-center mt-5 border bg-warning text-danger fs-1">
        PÁGINA DE REGISTER
      </div>

      <form className=" border m-5 p-5">
        <div className="md-form mb-3">
          <i className="fas fa-envelope prefix grey-text mb-3"></i>
          <input type="email" id="defaultForm-email" class="form-control validate" value={email} onChange={(e) => {
            setError(false)
            setEmail(e.target.value)

          }} />
          <label data-error="wrong" data-success="right" for="defaultForm-email" className="mt-1">Your email</label>
        </div>
        <div className="md-form">
          <i className="fas fa-lock prefix grey-text mb-3"></i>
          <input type="password" id="defaultForm-pass" class="form-control validate" value={password} onChange={(e) => {
            setError(false)
            setPassword(e.target.value)

          }} />
          <label data-error="wrong" data-success="right" for="defaultForm-pass" className="mt-1">Your password</label>
        </div>
        <div className="text-center">
          <button type="button" class="btn btn-primary  mt-3" onClick={() => sendRegisterCredential()}>Register</button>
          {error ? <p className="alert alert-danger">{error}</p> : null}
        </div>
      </form>
    </div>



  );
};
