import React, { useState } from "react";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword} from "firebase/auth";
import { Button, Typography, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginEmail = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await Login(form);

  };


  const Login = async ({ email, password }) => {

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/");
        // ...
      })
      .catch((error) => {
        setErrorMessage(error.code + ": " + error.message);
      });
  };

  return (
    <div>
      <h1>Login:</h1>
      <br />
      <form onSubmit={handleSubmit}>
      <div className="flexwrapper">
        <label style={{marginRight:'15px'}} htmlFor="email">Email:</label>
        <Input
          type="text"
          autoComplete="true"
          placeholder="email"
          id="mail"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        </div>
        <br /><br />
        <div className="flexwrapper">
        <label style={{marginRight:'15px'}} htmlFor="password">Password:</label>
        <Input
          type="password"
          placeholder="password"
          autoComplete="current-password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        </div>
        <br /><br />
        <div style={{textAlign:'center'}}>
        <Button variant="contained" type="submit">
          Login
        </Button>
        	<Typography style={{marginTop:'20px',maxWidth:'250px'}} color={"red"}>
          {errorMessage}
        </Typography>
        </div>
      </form>
    </div>
  );
};

export default LoginEmail;
