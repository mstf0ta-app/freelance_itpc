import React,{useState,useEffect, Fragment} from 'react';
import { Table, Tag, Space, Modal,Button,Affix,Drawer,Input,Form,message,Select,Typography,Switch } from 'antd';
import { addData, deleteData, getData, getLocal, globalUrl, updateData } from '../../globalFunction/api';
import { ExclamationCircleOutlined,PlusOutlined,DeleteOutlined,SendOutlined,EditOutlined } from '@ant-design/icons';
const { Column, ColumnGroup } = Table;
const { confirm } = Modal;
const { Option } = Select;
const { Text } = Typography;
const { TextArea } = Input;


export default function CategoriesTable() {

  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true)
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editVisible, setEditVisible] = useState(false);
  const [addLoading, setAddLoading] = useState(false)
  const [addCategoryForm] = Form.useForm()
  const [editCategoryForm] = Form.useForm()
  

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
    setSelectedCategory(null)
    editCategoryForm.resetFields()
    
  };

  const handleTableChange = (pagination, filters, sorter) => {
    const{current,pageSize} = pagination 
    
  };

  function showDeleteConfirm(categoryName,categoryId) {
    confirm({
      title: ` ${categoryName} هل انت متأكد انك تريد حذف الصنف `,
      icon: <ExclamationCircleOutlined style={{color:'red'}} />,
      content: 'ملاحظة : البيانات المحذوفة لا يمكن استعادتها لاحقا',
      okText: 'نعم',
      okType: 'danger',
      cancelText: 'الغاء',
      onOk() {
        deleteData(`Categories/Delete`,categoryId,
          (err,result)=>{
            if(!err){
              getCategories();
              message.success('تم حذف الصنف بنجاح');
            }else{
              message.error(result?.message,3);
            }
            
          }
        )
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }


  const getCategories = (pageNumber=1,pageSize=1000)=>{
    setloading(true);
      getData(`Categories/GetAll?PageNumber=${pageNumber}&PageSize=${pageSize}`,
        (response)=>{
          setloading(false);
          setData(response.data)
        }
      )
  }






  const addCategory = (values) => {
    setAddLoading(true)
    addData(`Categories/Create`,values,
    (err,result)=>{
      if(!err){
        setAddLoading(false);
        getCategories();
        message.success('تم اضافة صنف بنجاح');
        addCategoryForm.resetFields();

      }else{
        setAddLoading(false)
        console.log('error',err)
        message.error(result?.message,3);
      }
      
    })
    
  };


  const editCategory = (values) => {
    setAddLoading(true)
    updateData(`Categories/Update/${values.id}`,values,
    (err,result)=>{
      if(!err){
        setAddLoading(false);
        getCategories();
        onEditClose();
        message.success('تم تعديل الصنف بنجاح');
      }else{
        setAddLoading(false)
        message.error(result?.message,3);
      }
      
    })
  };







  const prepareEdit = (userData)=>{
    setSelectedCategory(userData)
    const newData = userData
     editCategoryForm.setFieldsValue(newData)
     showEditDrawer(true)
  }
  



  useEffect(() => {
    getCategories()
  }, [])



  return (
    <Fragment>
      <Affix offsetTop={0}>
        <div  style={{padding:15,backgroundColor:'#fff'}}>
          <Button type="primary"  icon={<PlusOutlined />} onClick={()=>showDrawer()} >
            اضافة صنف
          </Button>
        </div>
      </Affix>  


    {/* add new Category    */}

      <Drawer
        title="اضافة صنف جديد"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={350}
      >
      
      <Form 
      form={addCategoryForm} 
      onFinish={addCategory}
      
      >

     

        <Form.Item
          name="categoryName"
          rules={[
            {
              required: true,
              message: 'يرجى كتابة اسم الصنف',
            }
          ]}
        >
          <Input size="large" placeholder="اسم الصنف"  />
        </Form.Item>

        <Form.Item
          name="categoryCode"
          rules={[
            {
              required: true,
              message: 'يرجى كتابة رمز الصنف',
            }
          ]}
        >
          <Input size="large" placeholder="رمز الصنف"  />
        </Form.Item>

        <Form.Item
          name="description"
        >
          <TextArea  placeholder="الوصف"  />
        </Form.Item>

        <Form.Item label="فعال" name="isActive" valuePropName="checked" >
          <Switch  />
        </Form.Item>
        
        
      

      </Form>
      <Button type="primary"  icon={<SendOutlined />} onClick={()=>{addCategoryForm.submit()}} loading={addLoading} >
            ارسال 
      </Button>

      </Drawer>



    {/* edit Category  */}

      <Drawer
        title="تعديل الصنف "
        placement="left"
        closable={false}
        onClose={onEditClose}
        visible={editVisible}
        width={350}
      >
      
      <Form 
      form={editCategoryForm} 
      onFinish={editCategory}
      >

        <Form.Item
          name="categoryName"
          rules={[
            {
              required: true,
              message: 'يرجى كتابة اسم الصنف',
            }
          ]}
        >
          <Input size="large" placeholder="اسم الصنف"  />
        </Form.Item>

        <Form.Item
          name="categoryCode"
          rules={[
            {
              required: true,
              message: 'يرجى كتابة رمز الصنف',
            }
          ]}
        >
          <Input size="large" placeholder="رمز الصنف"  />
        </Form.Item>

        <Form.Item
          name="description"
        >
          <TextArea  placeholder="الوصف"  />
        </Form.Item>

        <Form.Item label="فعال" name="isActive" valuePropName="checked" >
          <Switch  />
        </Form.Item>

        <Form.Item
          name="id"
          hidden="true"
        >
          <Input />
        </Form.Item>


      </Form>
      <Button type="primary"  style={{backgroundColor:'#4CAF50',borderWidth:0}} icon={<EditOutlined />} onClick={()=>{editCategoryForm.submit()}} loading={addLoading} >
            ارسال 
      </Button>

      </Drawer>

      
      <Table 
      dataSource={data}
      pagination={{ position: ['bottomCenter'],pageSize:9}}
      onChange={handleTableChange}
      loading={loading}
      >


      <Column title="رمز الصنف" dataIndex="categoryCode" key="categoryCode" sorter={(a, b) => a.categoryCode.localeCompare(b.categoryCode)}  /> 
      <Column title="الصنف" dataIndex="categoryName" key="categoryName" sorter={(a, b) => a.categoryName.localeCompare(b.categoryName)}  /> 
      <Column title="الوصف" dataIndex="description" key="description" width="30%" /> 
      <Column title="فعال"  width="200px" key="isActive" sorter={(a, b) => a.isActive.localeCompare(b.isActive) } 
        render={(text, record) => (
         record.isActive?<Text className="activeStatus">فعال</Text>:<Text className="inactiveStatus">غير فعال</Text>
        )}
      />
      
      
      
      <Column
        title="العمليات"
        key="action"
        render={(text, record) => (
          <Space size="middle">
             <Button type="primary" icon={<EditOutlined />} size={'small'} className="editButton" onClick={()=>{prepareEdit(record)}} />
             <Button type="primary" icon={<DeleteOutlined />} size={'small'} className="deleteButton" onClick={()=>showDeleteConfirm(record.categoryName,record.id)} />
            {/* {record.roleName[0]==='Dealer'&&<a className={'infoButton'} onClick={()=>{prepareEdit(record)}}  >ملئ معلومات</a>} */}
          </Space>
        )}
      />
    </Table>

  </Fragment>
  );
}
