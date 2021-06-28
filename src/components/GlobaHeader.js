import { Layout,Dropdown,Menu,Typography,Avatar } from 'antd';
import { DownOutlined,UserOutlined } from '@ant-design/icons';
import React,{useEffect,useContext} from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import { useHistory } from "react-router-dom";
import logo from '../assets/logo.png'
import { Fragment } from 'react';
const { Header} = Layout;
const { Text, Link } = Typography;


export default function GlobalHeader(data) {
    const {appName,setLoggedIn} = useContext(GlobalContext)
    const history = useHistory();
    useEffect(()=>{

    })

    const userData = localStorage.getItem("userData");
    const parsedUserData = userData?JSON.parse(userData):null
    let roles = parsedUserData?.roles[0];

    const returnUSerInfo = ()=>{
      const userData = localStorage.getItem("userData");
      if(userData){
       return (JSON.parse(userData).userName )
      }
    }

    const logOut = ()=>{
      localStorage.removeItem("userData");
      setLoggedIn(false)
      history.replace('/Login');
      
    }

    const menu = (
      <Menu>
         <Menu.Item key="0">
          <a onClick={()=>history.push('/profile')} >
          <Text >الملف الشخصي</Text>
          </a>
        </Menu.Item>
        <Menu.Divider />
        {
          
          roles === "SuperAdmin"?
            <Fragment>
              <Menu.Item key="0">
                <a onClick={()=>history.push('/ExchangeManagement')} >
                <Text >ادارة قيمة صرف العملة</Text>
                </a>
              </Menu.Item>
              <Menu.Divider />
            </Fragment>
            :
            null

        }

        <Menu.Item key="1">
          <a onClick={logOut} >
            <Text type="danger">تسجيل الخروج</Text>
          </a>
        </Menu.Item>
       
        
        
      </Menu>
    );

    


    

  return (
    <Header className="site-layout-sub-header-background" >
      <div style={{display:'flex',flexDirection:'row',alignItems:'center',paddingRight:25}} >
        <h1 className="headerText" >{appName}</h1>
        <img src={logo} className="logo"/>
      </div>
      <div style={{display:'flex',flexDirection:'row',alignItems:'center',paddingLeft:25}} >
       
      <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <DownOutlined />
            <Link style={{paddingLeft:10,paddingRight:5}} >{returnUSerInfo()}</Link>
            <Avatar size="large" icon={<UserOutlined />} />
            
          </a>
        </Dropdown>
              
      </div>
        
    </Header>
  );
}




