import React, { useState } from 'react';
const FocusedContext = React.createContext({});
export const FocusedProvider = ({ children }) => {
    const [isFocused, setFocused] = useState(false);
    const focus = () => {
        setFocused(true);
    };
    const unfocus = () => {
        setFocused(false);
    };
    return (<FocusedContext.Provider value={{ isFocused, focus, unfocus }}>
      {children}
    </FocusedContext.Provider>);
};
export default FocusedContext;
