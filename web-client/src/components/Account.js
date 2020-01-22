import React, {useEffect, useContext} from 'react';
import {InputContext} from "../context/InputContext";

export default function Account() {
  const {state} = useContext(InputContext);

  useEffect(() => {
    console.log(state);
    if(state.user) {
      fetch('http://localhost:5000/user-like?userId=' + state.user.id)
        .then(res => console.log(res.json()))
        .then(raw => console.log(raw));
    }
    //api.giphy.com/v1/gifs/{gif_id}
  }, []);

  return (
    <h3>Your giphies:</h3>
  );
}