import React, { useState, useContext } from "react";
import { Button } from 'react-bootstrap';
import { If, Then, Else } from 'react-if';
import { LoginContext } from './context.js';

function Login() {
  const [user, setUser] = useState({})
  const userContext = useContext(LoginContext);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    userContext.login(user)
  }

  return (
    <If condition={userContext.isLoggedIn}>
      <Then>
        <Button type="button" variant="danger" onClick={userContext.logout}>Logout</Button>
      </Then>
      <Else>
        <form onSubmit={handleSubmit}>
          <input placeholder="username" name="username" onChange={handleChange} />
          <input name="password" type="password" onChange={handleChange} />
          <Button type="submit" variant="outline-light primary">Login</Button>
        </form>
      </Else>
    </If>
  )

}

export default Login;
