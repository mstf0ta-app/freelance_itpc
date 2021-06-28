import React,{useEffect} from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined} from '@ant-design/icons';
import { useHistory } from "react-router-dom";



const {  Sider } = Layout;
const { SubMenu } = Menu;


export default function GlobalSider(data) {
    const history = useHistory();
    const {current,sub} = data
    // const userData = localStorage.getItem("userData");
    // const parsedUserData = userData?JSON.parse(userData):null
    // let roles = parsedUserData?.roles[0];
    

  return (
    <>
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      
      
    >
    
      <Menu theme="dark" mode="inline" 
            defaultSelectedKeys={[current||"invoices"]}  
            defaultOpenKeys={[sub||'sub1']}
            onSelect={({item, key, keyPath, selectedKeys, domEvent} )=>{console.log('key is',key)}} 
      >

        <SubMenu key="sub1" icon={<HomeOutlined />} title="العمليات اليومية">
         
            <Menu.Item key="invoices"  style={{marginTop:0}} onClick={()=>history.push("/")} >
              حركات الزبائن
            </Menu.Item>
            <Menu.Item key="stops"  style={{marginTop:0}} onClick={()=>history.push("/")} >
             توقفات الخدمة
            </Menu.Item>
           
         
        </SubMenu>

        <SubMenu key="sub2" icon={<HomeOutlined />} title="البيانات الاساسية">
         
            <Menu.Item key="items"  style={{marginTop:0}} onClick={()=>history.push("/items")} >
             الخدمات
            </Menu.Item>
            <Menu.Item key="categories"  style={{marginTop:0}} onClick={()=>history.push("/categories")} >
             اصناف الخدمات
            </Menu.Item>
            <Menu.Item key="ports"  style={{marginTop:0}} onClick={()=>history.push("/ports")} >
             المنافذ
            </Menu.Item>
            
           
         
        </SubMenu>



      </Menu>
    </Sider>
    </>
  );
}
