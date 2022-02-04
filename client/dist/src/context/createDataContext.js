/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { useReducer } from 'react';
export default (reducer, actions, defaultValue) => {
    const Context = React.createContext({});
    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, defaultValue);
        const boundActions = {};
        for (const key in actions) {
            boundActions[key] = actions[key](dispatch);
        }
        return <Context.Provider value={Object.assign({ state }, boundActions)}>{children}</Context.Provider>;
    };
    return { Context, Provider };
};
