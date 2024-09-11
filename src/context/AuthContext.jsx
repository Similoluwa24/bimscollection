import React, { createContext, useReducer } from "react";

const AuthContext = createContext()

const initialstate  = {
    accessToken : null
}

function reducer(state, action) {
    if (action.type === "setToken") {
        state= {...state, accessToken: action.payload}
    }
    return state;
}

export const AuthProvider = ({children, defaultState = initialstate}) =>{
    const [state, dispatch] = useReducer(reducer, defaultState);

    return (
    <AuthContext.Provider value = {[state, dispatch]}>
        {children}
    </AuthContext.Provider>
    )
}

export default AuthContext; 