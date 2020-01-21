import React, {useState} from 'react';
import {InputContext} from "./InputContext";

export function InputContextProvider({children}) {

    const [state, updateState] = useState({
        loggedIn: false,
        user: {},
    });

    const updateLogin = (value) => {
        updateState({
            ...state,
            loggedIn: value,
        });
    };

    const updateUser = (value) => {
        updateState({
            ...state,
            user: value,
        });
    };

    return (
        <InputContext.Provider value={{
            state,
            updateLogin,
            updateUser
        }}>
            {children}
        </InputContext.Provider>
    );
}

export default InputContextProvider;

