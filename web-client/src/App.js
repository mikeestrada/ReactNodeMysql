import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import SearchGif from './components/SearchGif';
import Login from './components/LoginRegister';

export default function App() {

  return (
    <div>
      <Router>
        <h5><Link to="/login">Login</Link></h5>
        <Route exact={true} path='/' component={SearchGif} />
        <Route exact={true} path='/login' component={Login} />
      </Router>
    </div>
  )
}