import React, {useEffect, useContext} from 'react';
import {InputContext} from "../context/InputContext";

export default function Account() {
  const {state} = useContext(InputContext);

  useEffect(() => {
    console.log(state.user);
    //api.giphy.com/v1/gifs/{gif_id}
  }, []);

  return (
    <h3>Your giphies:</h3>
  );
}