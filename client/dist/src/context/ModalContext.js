import React, { useState } from 'react';
const ModalContext = React.createContext({});
export const ModalProvider = ({ children }) => {
    const [signInVisible, setSignInVisible] = useState(false);
    const showSignIn = () => {
        setSignInVisible(true);
    };
    const closeSignIn = () => {
        setSignInVisible(false);
    };
    return (<ModalContext.Provider value={{ data: signInVisible, showSignIn, closeSignIn }}>
      {children}
    </ModalContext.Provider>);
};
export default ModalContext;
