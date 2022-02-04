import React, { useState } from 'react';
const SignInContext = React.createContext({});
export const SignInProvider = ({ children }) => {
    const [signInVisible, setSignInVisible] = useState(false);
    const showSignIn = () => {
        setSignInVisible(true);
    };
    const closeSignIn = () => {
        setSignInVisible(false);
    };
    return (<SignInContext.Provider value={{ signInVisible, showSignIn, closeSignIn }}>
      {children}
    </SignInContext.Provider>);
};
export default SignInContext;
