import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import SearchGif from './components/SearchGif';
import Login from './components/LoginRegister';
import InputContextProvider from "./context/InputContextProvider";
import LoginHeader from "./components/Header";
import Account from "./components/Account";

export default function App() {

  return (
    <div>
      <Router>
        <InputContextProvider>
          <LoginHeader />
          <Route exact={true} path='/' component={SearchGif} />
          <Route exact={true} path='/login' component={Login} />
          <Route exact={true} path='/account' component={Account} />
        </InputContextProvider>
      </Router>
    </div>
  )
}