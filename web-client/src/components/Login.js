import React, {useState} from 'react';
import crypt from 'bcryptjs'

const saltRounds = 10;

export default function Login() {
  const [register, setRegister] = useState({});
  const [login, setLogin] = useState({});

  const loginToAccount = async() => {
    await crypt.genSalt(saltRounds, (err, salt) => {
      crypt.hash(login.pw, salt, (err, hash) => {
        fetch('http://localhost:5000/login', {
          method: 'POST',
          body: {
            un: login.un,
            pw: hash
          }
        })
          .then(response => response.json())
          .then(response => {
            console.log(response);
          })
          .catch((err) => {
            console.log('Error logging in: ' + err);
          });
      });
    });
  };

  const registerAccount = async() => {
    await crypt.genSalt(saltRounds, (err, salt) => {
      crypt.hash(login.pw, salt, (err, hash) => {
        fetch('http://localhost:5000/register', {
          method: 'POST',
          body: {
            un: login.un,
            pw: hash
          }
        })
          .then(response => response.json())
          .then(response => {
            console.log(response);
          })
          .catch((err) => {
            console.log('Error logging in: ' + err);
          });
      });
    });
  };

  return (
    <div>
      Login to view your saved gifs:
      <br/>
      <form>
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
      </form>
      <br/>
      <br/>
      <br/>
      Or register:
      <br/>
      <form>
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
               ...login,
               pw: e.target.value
             });
           }}
        />
        <input type="submit" onClick={registerAccount}/>
      </form>
    </div>
  );
}