import React, {useContext, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {InputContext} from "../context/InputContext";

export default function LoginHeader() {
  const {state, updateLogin} = useContext(InputContext);
  const history = useHistory();

  useEffect(() => {
    console.log('state from header: ' + JSON.stringify(state))
  }, []);

  useEffect(() => {
    console.log('from header: ' + state.loggedIn)
  }, [state]);

  const logOut = () => {
    updateLogin(false);
    history.push('/');
  };

  const showLogin = () => {
    if (state.loggedIn) {
      return (
        <div>
          <h5><a onClick={logOut}>Logout</a></h5>
          <h5><Link to="/">Home</Link></h5>
          <h5><Link to="/account">Account</Link></h5>
        </div>
      );
    } else {
      return (
        <div>
          <h5><Link to="/login">Login</Link></h5>
          <h5><Link to="/">Home</Link></h5>
        </div>
      );
    }
  };


  return (
    showLogin()
  );
}