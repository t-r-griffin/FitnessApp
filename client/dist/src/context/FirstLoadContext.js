import React, { useState } from 'react';
const FirstLoadContext = React.createContext({});
export const FirstLoadProvider = ({ children }) => {
    const [firstLoad, setFirstLoad] = useState(true);
    return (<FirstLoadContext.Provider value={{ firstLoad }}>
      {children}
    </FirstLoadContext.Provider>);
};
export default FirstLoadContext;
