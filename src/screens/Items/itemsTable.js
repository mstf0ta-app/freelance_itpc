import React,{useState,useEffect, Fragment} from 'react';
import { Table, Tag, Space, Modal,Button,Affix,Drawer,Input,Form,message,Select } from 'antd';
import { getData, getLocal, globalUrl } from '../../globalFunction/api';
import { ExclamationCircleOutlined,PlusOutlined,ItemOutlined,MailOutlined,SendOutlined,EditOutlined } from '@ant-design/icons';
const { Column, ColumnGroup } = Table;
const { confirm } = Modal;
const { Option } = Select;

export default function ItemsTable() {

  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true)
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editVisible, setEditVisible] = useState(false);
  const [addLoading, setAddLoading] = useState(false)
  const [addItemForm] = Form.useForm()
  const [editItemForm] = Form.useForm()
  

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const showEditDrawer = () => {
    setEditVisible(true)
  };
  const onEditClose = () => {
    setEditVisible(false);
    setSelectedItem(null)
    editItemForm.resetFields()
    
  };

  const handleTableChange = (pagination, filters, sorter) => {
    const{current,pageSize} = pagination 
    
  };

  function showDeleteConfirm(userName,userId) {
    confirm({
      title: `هل انت متأكد انك تريد حذف الخدمة ${userName} `,
      icon: <ExclamationCircleOutlined style={{color:'red'}} />,
      content: 'ملاحظة : البيانات المحذوفة لا يمكن استعادتها لاحقا',
      okText: 'نعم',
      okType: 'danger',
      cancelText: 'الغاء',
      onOk() {
        console.log(userId)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }


  const getItems = (pageNumber=1,pageSize=1000)=>{
    setloading(true);
      getData(`Items/GetAll?PageNumber=${pageNumber}&PageSize=${pageSize}`,
        (response)=>{
          setloading(false);
          setData(response.data)
        }
      )
  }




  // const addItem = (values) => {

  //   setAddLoading(true);
  //   const token = getLocal('userData').jwToken
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append("Authorization", `Bearer ${token}`);
  //   var raw = JSON.stringify({
  //     ...values
  //     });
  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw
  //   };

  //   fetch(`https://gstar1959fortrade.com/api/Account/registerItemsBySystemAdmin`, requestOptions)
  //   .then((response) => response.json())
  //   .then(result => {
  //     setAddLoading(false)
  //     if(result.Succeeded==false){
  //       message.error(result.Message,3);
  //     }else{
  //       message.success('تمت اضافة الخدمة بنجاح')
  //       addItemForm.resetFields();
  //       getItems()
  //     }
  //   })
  //   .catch(error => {
  //     setAddLoading(false)
  //     console.log('error', error)
  //   });
  // };


  // const editItem = (values) => {
  //   setAddLoading(true);
  //   const token = getLocal('userData').jwToken
  //   const id = selectedItem.id
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append("Authorization", `Bearer ${token}`);
  //   var raw = JSON.stringify({
  //     ...values
  //     });
  //   var requestOptions = {
  //     method: 'PUT',
  //     headers: myHeaders,
  //     body: raw
  //   };

  //   fetch(`https://gstar1959fortrade.com/api/Account/update-user-info-by-admin/${id}`, requestOptions)
  //   .then((response) => response.json())
  //   .then(result => {
  //     setAddLoading(false)
  //     if(result.Succeeded==false){
  //       message.error(result.Message,3);
  //     }else{
  //       message.success('تم تعديل الخدمة بنجاح')
  //       editItemForm.resetFields();
  //       onEditClose()
  //       getItems()
  //     }
  //   })
  //   .catch(error => {
  //     setAddLoading(false)
  //     console.log('error', error)
  //   });
  // };




  // const prepareEdit = (userData)=>{
  //   setSelectedItem(userData)
  //   const newData = userData
  //    newData.userRoleName = userData.roleName[0]
  //    editItemForm.setFieldsValue(newData)
  //    showEditDrawer(true)
    
  // }
  



  useEffect(() => {
    getItems()
  }, [])







  return (
    <Fragment>
      <Affix offsetTop={0}>
        <div  style={{padding:15,backgroundColor:'#fff'}}>
          <Button type="primary"  icon={<PlusOutlined />} onClick={()=>showDrawer()} >
            اضافة خدمة
          </Button>
        </div>
      </Affix>  


    {/* add new user    */}

      {/* <Drawer
        title="اضافة خدمة جديد"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={350}
      >
      
      <Form 
      form={addItemForm} 
      onFinish={addItem}
      
      >

      <Form.Item   name="userRoleName" rules={[{ required: true, message: 'يرجى اختيار نوع الخدمة' }]}>
        <Select options={userTypes} placeholder="نوع الخدمة" />
      </Form.Item>

        <Form.Item
          name="userName"
          rules={[
            {
              required: true,
              message: 'يرجى كتابة اسم الخدمة',
            },
            {
              min:6,
              message:'يجب ان يتكون اسم الخدمة من ٦ حروف او اكثر'
            }
          ]}
        >
        <Input size="large" placeholder="اسم الخدمة" prefix={<ItemOutlined />} />
      </Form.Item>

      <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: 'يرجى كتابةالاسم',
            },
          ]}
        >
        <Input size="large" placeholder="الاسم"  />
      </Form.Item>

      <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
              message: 'يرجى كتابة اللقب',
            },
          ]}
        >
        <Input size="large" placeholder="اللقب"  />
      </Form.Item>

      <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'يرجى كتابة بريد الكتروني صحيح',
            },
            {
              required: true,
              message: 'يرجى كتابةالبريد الالكتروني',
            },
          ]}
        >
        <Input size="large" placeholder="البريد الالكتروني" prefix={<MailOutlined />} />
      </Form.Item>
        

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'يرجى كتابة كلمة المرور',
          },
          { min: 8, message: 'يجب ان تتكون كلمة المرور من ٨ حروف او اكثر' },
          { pattern:`^(?=.*?[A-Z])(?=.*?[a-z])(?!.*?[=?<>()'"\/\&]).{8,20}$`, message: 'يجب تحتوي حروف كبيرة و صغيره و رمز' },
        ]}
        hasFeedback
      >
         <Input.Password placeholder="كلمة المرور" />
      </Form.Item>
      

      <Form.Item
        name="confirmPassword"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'يرجى كتابة كلمة المرور',
          },
          { min: 8, message: 'يجب ان تتكون كلمة المرور من ٨ حروف او اكثر' },
          { pattern:`^(?=.*?[A-Z])(?=.*?[a-z])(?!.*?[=?<>()'"\/\&]).{8,20}$`, message: 'يجب تحتوي حروف كبيرة و صغيره و رمز' },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('غير متطابق مع كلمة المرور');
            },
          }),
        ]}
      >
         <Input.Password placeholder="تأكيد كلمة المرور" />
      </Form.Item>


      </Form>
      <Button type="primary"  icon={<SendOutlined />} onClick={()=>{addItemForm.submit()}} loading={addLoading} >
            ارسال 
      </Button>

      </Drawer> */}



    {/* edit user  */}

      {/* <Drawer
        title="تعديل الخدمة "
        placement="left"
        closable={false}
        onClose={onEditClose}
        visible={editVisible}
        width={350}
      >
      
      <Form 
      form={editItemForm} 
      onFinish={editItem}
      
      >

      <Form.Item   name="userRoleName" rules={[{ required: true, message: 'يرجى اختيار نوع الخدمة' }]}>
        <Select defaultValue={selectedItem&&selectedItem.roleName[0]} options={userTypes} placeholder="نوع الخدمة " />
      </Form.Item>

        <Form.Item
          name="userName"
          rules={[
            {
              required: true,
              message: 'يرجى كتابة اسم الخدمة',
            },
            {
              min:6,
              message:'يجب ان يتكون اسم الخدمة من ٦ حروف او اكثر'
            }
          ]}
        >
        <Input defaultValue={selectedItem&&selectedItem.userName} size="large" placeholder="اسم الخدمة" prefix={<ItemOutlined />} />
      </Form.Item>

      <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: 'يرجى كتابةالاسم',
            },
          ]}
        >
        <Input size="large" placeholder="الاسم"  />
      </Form.Item>

      <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
              message: 'يرجى كتابة اللقب',
            },
          ]}
        >
        <Input size="large" placeholder="اللقب"  />
      </Form.Item>

      <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'يرجى كتابة بريد الكتروني صحيح',
            },
            {
              required: true,
              message: 'يرجى كتابةالبريد الالكتروني',
            },
          ]}
        >
        <Input size="large" placeholder="البريد الالكتروني" prefix={<MailOutlined />} />
      </Form.Item>
        



      </Form>
      <Button type="primary"  style={{backgroundColor:'#4CAF50',borderWidth:0}} icon={<EditOutlined />} onClick={()=>{editItemForm.submit()}} loading={addLoading} >
            ارسال 
      </Button>

      </Drawer> */}

      
      <Table 
      dataSource={data}
      pagination={{ position: ['bottomCenter'],pageSize:9}}
      onChange={handleTableChange}
      loading={loading}
      >
      
      {/* <Column title="الاسم"  key="name" sorter={(a, b) => a.firstName.localeCompare(b.firstName) } 
        render={(text, record) => (
        <span>{record.firstName} {record.lastName}</span>
        )}
      />
      <Column title="اسم الخدمة" dataIndex="userName" key="userName" sorter={(a, b) => a.userName.localeCompare(b.userName)}  /> */}
      
      <Column
        title=" "
        key="action"
        render={(text, record) => (
          <Space size="middle">
             {/* <Button type="primary" icon={<EditOutlined />} size={'small'} style={{ background: "#4CAF50",border:'#4CAF50'}} onClick={()=>{prepareEdit(record)}} /> */}
            {/* {record.roleName[0]==='Dealer'&&<a className={'infoButton'} onClick={()=>{prepareEdit(record)}}  >ملئ معلومات</a>} */}
            {/* <a className={'deleteButton'} onClick={()=>showDeleteConfirm(record.userName,record.id)}>حذف</a> */}
          </Space>
        )}
      />
    </Table>

  </Fragment>
  );
}
