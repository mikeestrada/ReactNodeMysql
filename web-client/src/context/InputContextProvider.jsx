import React, {useState} from 'react';
import {InputContext} from "./InputContext";

export function InputContextProvider({children}) {

    const [state, updateState] = useState({
        loggedIn: false,
        user: {},
        userLikes: []
    });

    const logInUser = (key, value) => {
      updateState({
        ...state,
        loggedIn: true,
        [key]: value,
      });
    };

    const updateUserLikes = (value) => {
        updateState({
            ...state,
            userLikes: [...state.userLikes, value],
        });
    };

    return (
        <InputContext.Provider value={{
            state,
            logInUser,
            updateUserLikes
        }}>
            {children}
        </InputContext.Provider>
    );
}

export default InputContextProvider;

