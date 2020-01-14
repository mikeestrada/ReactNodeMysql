import React from 'react';

export default function Login() {
  return (
    <div>
      Login to view your saved gifs:
      <br />
      <input type="text" placeholder="email"/>
      <input type="password" placeholder="password"/>
      <input type="submit"/>
      <br />
      <br />
      <br />
      Or register:
      <br />
      <input type="text" placeholder="email"/>
      <input type="password" placeholder="password"/>
      <input type="submit"/>
    </div>
  );
}