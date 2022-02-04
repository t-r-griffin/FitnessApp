import React, { useState } from 'react';

interface Props {
  children: any;
}

interface Context {
  showSignIn: () => void;
  closeSignIn: () => void;
  signInVisible: boolean;
}

const SignInContext = React.createContext({} as Context);

export const SignInProvider: React.FC<Props> = ({ children }: Props) => {
  const [signInVisible, setSignInVisible] = useState<boolean>(false);

  const showSignIn = () => {
    setSignInVisible(true);
  };

  const closeSignIn = () => {
    setSignInVisible(false);
  };
  return (
    <SignInContext.Provider value={{ signInVisible, showSignIn, closeSignIn }}>
      {children}
    </SignInContext.Provider>
  );
};

export default SignInContext;
