import React, {useState, useEffect, useContext} from 'react';
import crypt from 'bcryptjs'
import {InputContext} from "../context/InputContext";
import {post} from "../service/api";

const saltRounds = 10;

export default function Login() {
  const [register, setRegister] = useState({});
  const [login, setLogin] = useState({});
  const {state, logInUser} = useContext(InputContext);

  useEffect(() => {
  }, [register]);

  useEffect(() => {
  }, [login]);

  const loginToAccount = async() => {
    await crypt.genSalt(saltRounds, (err, salt) => {
      crypt.hash(login.pw, salt, (err, hash) => {
        if (err) {
          console.log(err);
        }
        post('http://localhost:5000/login', JSON.stringify({
            un: login.un,
            pw: hash
          }))
        .then((user) => user.json())
        .then((loginResponse) => {

          console.log('STATE: ', state);
          if(loginResponse.user) {
              logInUser('user', loginResponse.user);
            }
        })
        .catch((err) => {
          console.log('Error logging in: ' + err);
        });
      });
    });
  };

  const registerAccount = () => {
    crypt.genSalt(saltRounds, (err, salt) => {
      crypt.hash(register.pw, salt, (err, hash) => {
        if (err) {
          console.log(err);
        }
        post('http://localhost:5000/register', JSON.stringify({
            un: register.un,
            pw: hash
          }))
          .then(response => response.json())
          .then(response => {
            console.log(response);
          })
          .catch((err) => {
            console.log('Error registering in: ' + err);
          });
      });
    });
  };

  return (
    <div>
      Login to view your saved gifs:
      <br/>

      <input type="text" placeholder="email"
             onChange={(e) => {
               setLogin({
                 ...login,
                 un: e.target.value
               });
             }}
      />
      <input type="password" placeholder="password"
             onChange={(e) => {
               setLogin({
                 ...login,
                 pw: e.target.value
               });
             }}
      />
      <input type="submit" onClick={loginToAccount}/>
      <br/>
      <br/>
      <br/>
      Or register:
      <br/>

      <input type="text" placeholder="email"
             onChange={(e) => {
               setRegister({
                 ...register,
                 un: e.target.value
               });
             }}
      />
      <input type="password" placeholder="password"
             onChange={(e) => {
               setRegister({
                 ...register,
                 pw: e.target.value
               });
             }}
      />
      <input type="submit" onClick={registerAccount}/>

    </div>
  );
}