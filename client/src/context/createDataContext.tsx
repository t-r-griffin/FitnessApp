/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { useReducer } from 'react';

interface Props {
  children: any;
}

interface Context {
  signup: any;
  signin: any;
  signout: any;
  state: any;
  tryLocalSignin: any;
  updateGoogleUsername: any;
}

export default (reducer: any, actions: any, defaultValue: any) => {
  const Context = React.createContext({} as Context);

  const Provider: React.FC<Props> = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions: any = {};
    for (const key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return <Context.Provider value={{ state, ...boundActions }}>{children}</Context.Provider>;
  };

  return { Context, Provider };
};
