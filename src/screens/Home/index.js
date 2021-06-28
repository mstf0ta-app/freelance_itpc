import React,{useState,useEffect,useContext} from 'react';
import { Layout,Spin,Card, Col, Row, Divider,Typography} from 'antd';
import { DollarCircleOutlined,UserOutlined,CodepenOutlined,ShopOutlined,UserSwitchOutlined,PlusCircleOutlined,SettingOutlined } from '@ant-design/icons';
import {Helmet} from "react-helmet";
import GlobalHeader from '../../components/GlobaHeader';
import GlobalSider from '../../components/GlobalSider';
import GlobalFooter from '../../components/GlobaFooter';
import { getLocal, globalUrl } from '../../globalFunction/api';
import {GlobalContext} from '../../contexts/GlobalContext'
import {  useHistory } from "react-router-dom";
const { Link } = Typography;
const { Content } = Layout;
export default function Home() {
  const [statistics, setStatistics] = useState([]);
  const [loading, setloading] = useState(true);
  const history = useHistory();
  const {appName} = useContext(GlobalContext)

  const getstatistics = ()=>{
    setloading(true);
    const token = getLocal('userData').jwToken
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch(`${globalUrl}/Lookup/GetStatistics`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setloading(false)
        setStatistics(result.data[0])
      })
      .catch(error => {
        setloading(false)
        console.log('error', error)
      });

  }

  useEffect(() => {
    // getstatistics()

    
  }, [])


  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>   الرئيسية || {appName} </title>
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
    </Helmet>
    <GlobalHeader name={''} />
    <Layout className="mainLayout">
        <GlobalSider current="invoices"/>  
        <Layout>
            <Content style={{ margin: '24px 16px 0'}}>
                {/* <div className="site-layout-background" style={{ padding: 24, }}>
                  <Spin spinning={loading} >

                    <Row gutter={16}  >
                      <Link onClick={()=>history.push('/dealersbills',{pageType:'add'})} style={{fontSize:15, marginRight:10 }} >
                        <PlusCircleOutlined /> اضافة فاتورة جديدة
                      </Link>

                      <Link onClick={()=>history.push('/dealersbills')} style={{fontSize:15, marginRight:40 }} >
                        <DollarCircleOutlined /> تسديد دين زبون
                      </Link>
                      <Link onClick={()=>history.push('/ExchangeManagement')} style={{fontSize:15, marginRight:40 }} >
                        <SettingOutlined /> ادارة قيمة صرف العملة
                      </Link>
                    </Row>

                    <Divider />
                    <Row gutter={16}>

                      <Col  xs={{ span: 24,}} md={{ span: 8,}} style={{marginBottom:15,cursor:'pointer'}} onClick={()=>history.push("/stores")} >
                        <Card title="المتاجر" bordered={false} headStyle={{backgroundColor:'#f94144',color:'#fff'}} bodyStyle={{backgroundColor:'#f9f9f9',color:'#f94144',fontSize:20}} >
                          <span style={{backgroundColor:'#f94144',marginLeft:15,borderRadius:30,padding:5}} >
                            <ShopOutlined style={{fontSize:20,marginLeft:9,marginRight:9,color:'#fff'}} />
                          </span>
                          {statistics.stores} متاجر
                        </Card>
                      </Col>

                      <Col  xs={{ span: 24,}} md={{ span: 8,}} style={{marginBottom:15,cursor:'pointer'}} onClick={()=>history.push("/users")}>
                        <Card title="المستخدمين" bordered={false} headStyle={{backgroundColor:'#f8961e',color:'#fff'}} bodyStyle={{backgroundColor:'#f9f9f9',color:'#f8961e',fontSize:20}} >
                          <span style={{backgroundColor:'#f8961e',marginLeft:15,borderRadius:30,padding:5}} >
                            <UserOutlined style={{fontSize:20,marginLeft:9,marginRight:9,color:'#fff'}} />
                          </span>
                          {statistics.users} مستخدم
                        </Card>
                      </Col>

                      <Col  xs={{ span: 24,}} md={{ span: 8,}} style={{marginBottom:15,cursor:'pointer'}} onClick={()=>history.push("/users")}>
                        <Card title="التجار" bordered={false} headStyle={{backgroundColor:'#90be6d',color:'#fff'}} bodyStyle={{backgroundColor:'#f9f9f9',color:'#90be6d',fontSize:20}} >
                          <span style={{backgroundColor:'#90be6d',marginLeft:15,borderRadius:30,padding:5}} >
                            <UserSwitchOutlined style={{fontSize:20,marginLeft:9,marginRight:9,color:'#fff'}} />
                          </span>
                          {statistics.dealers} تاجر
                        </Card>
                      </Col>

                    </Row>

                    <Row gutter={16} justify={'center'}  >
                    <Col  xs={{ span: 24,}} md={{ span: 8,}} style={{marginBottom:15,cursor:'pointer'}} onClick={()=>history.push("/materials")} >
                        <Card title="المنتجات" bordered={false} headStyle={{backgroundColor:'#277da1',color:'#fff'}} bodyStyle={{backgroundColor:'#f9f9f9',color:'#277da1',fontSize:20}} >
                          <span style={{backgroundColor:'#277da1',marginLeft:15,borderRadius:30,padding:5}} >
                            <CodepenOutlined style={{fontSize:20,marginLeft:9,marginRight:9,color:'#fff'}} />
                          </span>
                          {statistics.materials} منتج
                        </Card>
                      </Col>
                    </Row>
                      
                  </Spin>
                </div> */}
            </Content>
            <GlobalFooter/>
        </Layout>
    </Layout>
    </>
  );
}
