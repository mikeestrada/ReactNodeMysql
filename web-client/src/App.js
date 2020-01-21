import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import SearchGif from './components/SearchGif';
import Login from './components/LoginRegister';
import InputContextProvider from "./context/InputContextProvider";

export default function App() {

  return (
    <div>
      <Router>
        <InputContextProvider>
          <h5><Link to="/login">Login</Link></h5>
          <Route exact={true} path='/' component={SearchGif}/>
          <Route exact={true} path='/login' component={Login}/>
        </InputContextProvider>
      </Router>
    </div>
  )
}