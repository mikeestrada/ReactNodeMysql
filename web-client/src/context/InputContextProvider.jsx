import React, {useState} from 'react';
import {InputContext} from "./InputContext";

export function InputContextProvider({children}) {

    const [state, updateState] = useState({
        loggedIn: false,
        user: {},
    });

  const logInUser = (key, value) => {
    updateState({
      ...state,
      loggedIn: true,
      [key]: value,
    });
  };

  const logOutUser = () => {
      updateState({
        loggedIn: false,
        user: {},
      });
    };

    return (
        <InputContext.Provider value={{
            state,
            logInUser,
            logOutUser,
        }}>
            {children}
        </InputContext.Provider>
    );
}

export default InputContextProvider;

