import React,{useState,useEffect,useContext, Fragment} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import  {ProtectedRoute}  from './ProtectedRoute';
import Home from './screens/Home';
import Login from './screens/Login/';
import NotMatch from './screens/NotMatch';
import {ConfigProvider} from 'antd';
import { GlobalContext } from './contexts/GlobalContext';
import Items from './screens/Items';
import Categories from './screens/Categories';
import Ports from './screens/Ports';




export default function AppNavigator() {

  const [loading, setLoading] = useState(true);
  const {loggedIn,setLoggedIn} = useContext(GlobalContext)
  const userData = localStorage.getItem("userData");
  const parsedUserData = userData?JSON.parse(userData):null
  let roles = parsedUserData?.roles[0];



  useEffect(() => {
    const token = localStorage.getItem("userData");
    setLoggedIn(true);
    setLoading(false);
    // if (token) {
    //   setLoggedIn(true);
    //   setLoading(false);
    // }else{
    //   setLoggedIn(false);
    //   setLoading(false);
    // }
  }, []);

  return (
    <Fragment>
      {
        loading?
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
          }}
        >
          <p>Loading....</p>
        </div>
        :
        <ConfigProvider direction={'rtl'} >
        <Router>
          <Switch>
            <Route exact path="/Login" >
              <Login/>
            </Route>

            <ProtectedRoute  exact path="/"  component={Home} />
            <ProtectedRoute  exact path="/items"  component={Items} />
            <ProtectedRoute  exact path="/categories"  component={Categories} />
            <ProtectedRoute  exact path="/ports"  component={Ports} />

            <Route path="*">
              <NotMatch/> 
            </Route>

            
          </Switch>
        </Router>
      </ConfigProvider>
      }

</Fragment>
   

  );
}

