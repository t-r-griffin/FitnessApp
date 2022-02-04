import React, { useState } from 'react';
const SignUpContext = React.createContext({});
export const SignUpProvider = ({ children }) => {
    const [signUpVisible, setSignUpVisible] = useState(false);
    const showSignUp = () => {
        setSignUpVisible(true);
    };
    const closeSignUp = () => {
        setSignUpVisible(false);
    };
    return (<SignUpContext.Provider value={{ signUpVisible, showSignUp, closeSignUp }}>
      {children}
    </SignUpContext.Provider>);
};
export default SignUpContext;
