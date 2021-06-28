import React,{useState,useContext} from 'react';
import {Helmet} from "react-helmet";
import { Row, Col,Form, Input, Spin, message  } from 'antd';
import { GlobalContext } from '../../contexts/GlobalContext';
import { globalUrl, saveLocal } from '../../globalFunction/api';
import { useHistory,Redirect } from "react-router-dom";
import logo from '../../assets/logo.png'
import loginVector from '../../assets/loginVector.png'
import colors from '../../assets/themes/colors';
import './style.scss'

export default function Login(props) {

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [form] = Form.useForm();
  const {loggedIn,setLoggedIn,appName,companyName} = useContext(GlobalContext)

  const history = useHistory();




  const login =  ()=>{


    if(loading === false){
      setLoading(true);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        email,
        password
      });
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };
  
      fetch(`${globalUrl}/Account/login`, requestOptions)
        .then((response) => response.json())
        .then(result => {
          setLoading(false)
          console.log('result',result)
          if(result.Succeeded===false){
            message.error(result.Message,3);
          }else{
            saveLocal('userData',result.data);
            setLoggedIn(true)
            history.replace("/");
          }
        })
        .catch(error => {
          setLoading(false)
          console.log('error', error)
        });
    }
  }

 


  return (
   loggedIn ? (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    ) :
    <>
     <Helmet>
        <meta charSet="utf-8" />
        <title>   تسجيل الدخول || {appName} </title>
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
    </Helmet>

    <Row className="loginMain" >
     
      <Col md={14} lg={14} sm={24} xs={24} className="LoginImageContainer" >
        <h1 style={{position: 'absolute', top:10 ,right:'12vw',width:'100%',fontWeight:'bold',color:colors.base}} > اهلا بكم في {appName}</h1>
        <h2 style={{position: 'absolute', top:70 ,right:'12vw',width:'100%',}} >يرجى تسجيل معلومات الدخول</h2>
        <img alt="loginVector" src={loginVector} className={"loginVector"} />

      </Col>
      <Col md={10} lg={10} sm={24} xs={24} className="loginContainer" style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}} >
        <div style={{position:'absolute',top:60,display:'flex',alignItems:'center'}} >
          <img alt="logo" src={logo} height={80}   />
          <h2 style={{paddingTop:5,color:colors.background,fontWeight:'bold'}} >{companyName}</h2>
        </div>
         
          <Form
          style={{width:'100%',height:'38vh',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:10}}
          name="login"
          form={form}
          // onFinish={onSubmit}
          initialValues={{
            remember: true,
          }}
          onFinish={login}
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            
            label=""
            name="email"
            rules={[
              {
                required: true,
                message: 'يرجى كتابة اسم المستخدم',
              },
            ]}
          >
            <Input 
            onChange={(email)=>setEmail(email.target.value)}
            className="loginUserInput" placeholder="اسم المستخدم" />
          </Form.Item>

          <Form.Item
          onKeyDown={(e)=> {
            if(e.keyCode === 13){
              form.submit();
            }
             
          }}
            label=""
            name="password"
            rules={[
              {
                required: true,
                message: 'يرجى كتابة كلمة المرور',
              },
            ]}
          >
            <Input.Password
           
            onChange={(password)=>setPassword(password.target.value)} 
            value={password}
            className="loginPasswordInput" placeholder="كلمة المرور" />
          </Form.Item>

          {/* <Form.Item  name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item >

          
            <a onClick={()=>form.submit()} className="loginButton" >
              {
                loading?
                <Spin spinning={loading} />
                :
                <h3 >تسجيل الدخول</h3>
              }
              
            </a>
            
            
          </Form.Item>
        </Form>
      </Col>
    </Row>
    
    </>
  );
}
