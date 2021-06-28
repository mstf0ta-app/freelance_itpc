import React,{useEffect,useState,useContext} from 'react';
import { Layout} from 'antd';
import {Helmet} from "react-helmet";
import GlobalHeader from '../../components/GlobaHeader';
import GlobalSider from '../../components/GlobalSider';
import GlobalFooter from '../../components/GlobaFooter';
import {GlobalContext} from '../../contexts/GlobalContext'
import ItemsTable from './itemsTable';
import './style.scss'
const { Content } = Layout;

export default function Items() {

  const {appName} = useContext(GlobalContext)



  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>    الخدمات || {appName} </title>
       
    </Helmet>
    <GlobalHeader name={'test name'} />
    <Layout className="mainLayout">
        <GlobalSider current="items" sub={'sub2'} />  
        <Layout>
            <Content style={{ margin: '24px 16px 0'}}>
                <div className="site-layout-background" >
                    <ItemsTable/>
                </div>
            </Content>
            <GlobalFooter/>
        </Layout>
    </Layout>
    </>
  );
}
