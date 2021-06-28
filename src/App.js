import React from 'react'
import AppNavigator from './AppNavigator';
import {GlobalContextProvider} from './contexts/GlobalContext';


function App() {
  return (
   <GlobalContextProvider>
     <AppNavigator/>
   </GlobalContextProvider>
  )
}

export default App
