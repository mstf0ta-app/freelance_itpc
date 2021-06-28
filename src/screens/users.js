import React,{useEffect,useState} from 'react';
import { Layout} from 'antd';
import {Helmet} from "react-helmet";
import GlobalHeader from '../components/GlobaHeader';
import GlobalSider from '../components/GlobalSider';
import GlobalFooter from '../components/GlobaFooter';
import UsersTable from '../components/tables/UsersTable';
const { Content } = Layout;

export default function Users() {

  const [users, setUser] = useState([])

  useEffect(() => {
    console.log('users start')
  }, [users]);

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>   ادارة المستخدمين ||  </title>
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
    </Helmet>
    <GlobalHeader name={'test name'} />
    <Layout className="mainLayout">
        <GlobalSider current="users"/>  
        <Layout>
            <Content style={{ margin: '24px 16px 0'}}>
                <div className="site-layout-background" >
                <UsersTable/>
                </div>
            </Content>
            <GlobalFooter/>
        </Layout>
    </Layout>
    </>
  );
}
