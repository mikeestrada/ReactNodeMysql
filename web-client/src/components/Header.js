import React, {useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {InputContext} from "../context/InputContext";

export default function LoginHeader() {
  const {state, updateLogin} = useContext(InputContext);
  const history = useHistory();

  const logOut = () => {
    updateLogin(false);
    history.push('/');
  };

  const showLogin = () => {
    if (state.loggedIn) {
      return <h5><a onClick={logOut}>Logout</a></h5>
    } else {
      return <h5><Link to="/login">Login</Link></h5>
    }
  };


  return (
    showLogin()
  );
}