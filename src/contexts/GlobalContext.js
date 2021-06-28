import React, { useState,useEffect } from 'react';
const GlobalContext = React.createContext();

const GlobalContextProvider = (props) => {
    const [appName, setAppName] = useState('نظام ادارة خدمات البنى التحتية');
    const [companyName, setCompanyName] = useState('الشركة العامة للاتصالات و المعلوماتية');
    const [loggedIn, setLoggedIn] = useState(false);


  return (
    <GlobalContext.Provider value={{appName,loggedIn,setLoggedIn,companyName}}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export {GlobalContext,GlobalContextProvider };