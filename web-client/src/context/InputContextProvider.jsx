import React, {useState} from 'react';
import {InputContext} from "./InputContext";

export function InputContextProvider({children}) {

    const [state, updateState] = useState({
        loggedIn: false,
        user: {},
        userLikes: []
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

    const updateUserLikes = (value) => {
        updateState({
            ...state,
            userLikes: [...state.userLikes, value],
        });
    };

    return (
        <InputContext.Provider value={{
            state,
            updateLogin,
            updateUser,
            updateUserLikes
        }}>
            {children}
        </InputContext.Provider>
    );
}

export default InputContextProvider;

