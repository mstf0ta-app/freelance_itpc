import React,{useEffect,useState,Fragment} from 'react';
import { Layout,Divider,Space, Card,Spin,Typography,Tag,Modal,Input,Form,Button,message } from 'antd';
import {Helmet} from "react-helmet";
import GlobalHeader from '../components/GlobaHeader';
import GlobalSider from '../components/GlobalSider';
import GlobalFooter from '../components/GlobaFooter';
import { getLocal, globalUrl } from '../globalFunction/api';
import { useHistory } from "react-router-dom";
import {SendOutlined} from '@ant-design/icons'

const { Content } = Layout;
const { Text,Link } = Typography;
export default function Profile() {

  const history = useHistory();
  const [loading, setLoading] = useState(true)
  const [userInfoData, setUserInfoData] = useState([])
  const [stores, setStores] = useState([]);
  const userData = localStorage.getItem("userData");
  const parsedUserData = userData?JSON.parse(userData):null
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [resetPasswordForm] = Form.useForm();
  const [changeLoading, setChangeLoading] = useState(false)


  useEffect(() => {
    getUserInfo(parsedUserData?.id)
    
  }, [])

  const userTypes = [
    { value: 'SuperAdmin', label: 'مدير عام للنظام' },
    { value: 'Admin', label: 'مدير النظام' },
    { value: 'StoreManager', label: 'مدير مخزن' },
    { value: 'Dealer', label: 'تاجر' },
    { value: 'RepresentativesManager', label: 'مدير مندوبين' },
    { value: 'Representative', label: 'مندوب' },
    { value: 'StoreManagerAndRepresentativeManager', label: 'مدير مخزن و مدير مندوبين' },
    { value: 'Client', label: 'زبون مفرد عادي' },

  ];

  const getTypeName = (type)=>{
    const index = userTypes.findIndex(item => item.value ===type);
    return userTypes[index].label
  }


  const getUserInfo = (userId)=>{

    setLoading(true);
    const token = getLocal('userData').jwToken
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch(`${globalUrl}/Account/return-user-by-Id?Id=${userId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('user info result',result);
        setLoading(false)
        setUserInfoData(result)
        // if(result?.roleName?.length>0 && result?.roleName[0]){
          getAllStores()
        // }
      })
      .catch(error => {
        setLoading(false)
        console.log('error', error)
      });
  }

  const getAllStores = (pageNumber=1,pageSize=1000)=>{
    const token = getLocal('userData').jwToken
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch(`${globalUrl}/Lookup/GetAllStores?pageNumber=${pageNumber}&pageSize=${pageSize}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('Stores result',result);
        // setloading(false)
        setStores(result.data)
      })
      .catch(error => {
        // setloading(false)
        console.log('error', error)
      });
  }


  const resetPassword = (values) => {
    
    setChangeLoading(true);
    const token = getLocal('userData').jwToken
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    var raw = JSON.stringify({
      ...values,
      token
      });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw
    };


    fetch(`${globalUrl}/Account/reset-password`, requestOptions)
    .then((response) => response.json())
    .then(result => {
      console.log('result isss', result)
      setChangeLoading(false)
      if(result.Succeeded==false){
        message.error(result.Message,3);
      }else{
        message.success('تم تغيير كلمة المرور بنجاح')
        resetPasswordForm.resetFields();
        logOut();
        
      }
    })
    .catch(error => {
      setChangeLoading(false)
      console.log('error', error)
    });
  };

  const logOut = ()=>{
    localStorage.removeItem("userData");
    history.replace('/Login');
    
  }


  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>   الملف الشخصي ||  </title>
       
    </Helmet>
    <GlobalHeader name={''} />
    <Layout className="mainLayout">
        <GlobalSider current=""/>  
        <Layout>
          <Modal  title="تغيير كلمة المرور" visible={showPasswordModal} onCancel={()=>setShowPasswordModal(false)} footer={null} >
            <Form 
              form={resetPasswordForm} 
              onFinish={resetPassword}
              >
                
                <Form.Item
                    name="email"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'يرجى كتابة بريد الكتروني فعال',
                        pattern:/^\S+@\S+\.\S+$/
                      },
                    ]}
                  >
                  <Input size="large" placeholder="البريد الالكتروني"  />
                </Form.Item>
                
                <Form.Item
                    name="password"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'يرجى كتابة كلمة مرور اكثر من ٨ عناصر',
                        min:8
                      },
                    ]}
                  >
                  <Input.Password size="large" placeholder="كلمة المرور"  />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'يجب ان تكون مطابقة لكلمة المرور اعلاه',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(new Error('لا تطابق كلمة المرور في الحقل اعلاه'));
                      },
                    }),
                  ]}
                >
                  <Input.Password size="large" placeholder="تأكيد كلمة المرور" />
                </Form.Item>

              
              

              </Form>
              <Button type="primary"  icon={<SendOutlined />} onClick={()=>{resetPasswordForm.submit()}} loading={changeLoading} >
                    ارسال 
              </Button>
          </Modal>

          {
            !loading ? <Content style={{ margin: '24px 16px 0'}}>
                <div className="site-layout-background" >
                
                <Space direction="vertical"  >
                  <Card title={'الملف الشخصي'} extra={<Link onClick={()=>setShowPasswordModal(true)} style={{fontWeight:'bold'}} >تغيير كلمة المرور</Link>}  style={{ width: '80vw',marginRight:'6vh', }} headStyle={{backgroundColor:'#EFF2F5',}}>
                    
                    <p>{`${userInfoData?.firstName} ${userInfoData?.lastName}`}</p>
                    <p>{`${userInfoData?.email}`}</p>

                    {
                      userInfoData?.roleName?.length>0&&<Text style={{backgroundColor:'#E6F6FF',padding :'0 10px 0 10px',fontWeight:'bold',color:'#001628'}} >
                        {getTypeName(userInfoData?.roleName[0])}
                      </Text>
                    }

                    {
                       userInfoData?.roleName?.length>0&&userInfoData?.roleName[0]==="StoreManager"?
                      <Fragment>
                        <Divider/> 
                        <Text >{`المخازن`}</Text>
                        <br/>
                        <br/>
                      </Fragment>
                      :null
                    
                    }
                    
                    
                    {
                      userInfoData?.roleName?.length>0&&userInfoData?.roleName[0]==="StoreManager"?
                        stores?.map((element,index) => {
                          return (<Tag key={`${index}`} color="blue">{element.name}</Tag>)
                        })
                      :null
                    }

            
                  </Card>
                 
                </Space>

                </div>
            </Content>
            :
            <Content style={{ margin: '24px 16px 0'}}>
              <div className="site-layout-background" style={{height:'100%'}} >
                  
                  <div style={{display:'flex',height:'80%',alignItems:'center',justifyContent:'center', }} >
                    <Spin size="large" />
                  </div>
              </div>
                  
                  
                
            </Content>
          }
            
            <GlobalFooter/>
        </Layout>
    </Layout>
    </>
  );
}
