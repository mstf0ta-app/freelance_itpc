import { Layout} from 'antd';
import React,{useEffect,useContext} from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
const { Header,Footer} = Layout;

export default function GlobalFooter(data) {
    const {appName} = useContext(GlobalContext)

    useEffect(()=>{

    })

  return (
    <Footer style={{ textAlign: 'center' }}> برمجة و تصميم  Code Mind </Footer>
  );
}




