import React, { useState } from 'react';

interface Props {
  children: any;
}

interface Context {
  showSignUp: () => void;
  closeSignUp: () => void;
  signUpVisible: boolean;
}

const SignUpContext = React.createContext({} as Context);

export const SignUpProvider: React.FC<Props> = ({ children }: Props) => {
  const [signUpVisible, setSignUpVisible] = useState<boolean>(false);

  const showSignUp = () => {
    setSignUpVisible(true);
  };

  const closeSignUp = () => {
    setSignUpVisible(false);
  };
  return (
    <SignUpContext.Provider value={{ signUpVisible, showSignUp, closeSignUp }}>
      {children}
    </SignUpContext.Provider>
  );
};

export default SignUpContext;
