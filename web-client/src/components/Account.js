import React, {useEffect, useContext} from 'react';
import {InputContext} from "../context/InputContext";

export default function Account() {
  const {state} = useContext(InputContext);

  useEffect(() => {
    console.log(state.user);
  }, []);

  return (
    <h3>Your giphies:</h3>
  );
}