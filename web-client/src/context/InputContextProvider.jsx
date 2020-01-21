import React, {useState} from 'react';
import {InputContext} from "./InputContext";

export function InputContextProvider({children}) {

    const [state, updateState] = useState({
        loggedIn: false
    });

    const updateLogin = (value) => {
        updateState({
            ...state,
            loggedIn: value,
        });
    };

    return (
        <InputContext.Provider value={{
            state,
            updateLogin
        }}>
            {children}
        </InputContext.Provider>
    );
}

export default InputContextProvider;

