import React,{useState,useEffect, Fragment} from 'react';
import { Table, Tag, Space, Modal,Button,Affix,Drawer,Input,Form,message,Select,Typography,Switch } from 'antd';
import { addData, deleteData, getData, getLocal, globalUrl, updateData } from '../../globalFunction/api';
import { ExclamationCircleOutlined,PlusOutlined,DeleteOutlined,SendOutlined,EditOutlined } from '@ant-design/icons';
const { Column, ColumnGroup } = Table;
const { confirm } = Modal;
const { Option } = Select;
const { Text } = Typography;
const { TextArea } = Input;


export default function PortsTable() {

  const [data, setData] = useState([]);
  const [uomData, setUomData] = useState([]);
  const [loading, setloading] = useState(true)
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editVisible, setEditVisible] = useState(false);
  const [addLoading, setAddLoading] = useState(false)
  const [addPortForm] = Form.useForm()
  const [editPortForm] = Form.useForm()
  

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
    editPortForm.resetFields()
    
  };

  const handleTableChange = (pagination, filters, sorter) => {
    const{current,pageSize} = pagination 
    
  };

  function showDeleteConfirm(categoryName,categoryId) {
    confirm({
      title: ` ${categoryName} هل انت متأكد انك تريد حذف المنفذ `,
      icon: <ExclamationCircleOutlined style={{color:'red'}} />,
      content: 'ملاحظة : البيانات المحذوفة لا يمكن استعادتها لاحقا',
      okText: 'نعم',
      okType: 'danger',
      cancelText: 'الغاء',
      onOk() {
        deleteData(`Port/Delete`,categoryId,
          (err,result)=>{
            if(!err){
              getPorts();
              message.success('تم حذف المنفذ بنجاح');
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


  const getPorts = (pageNumber=1,pageSize=1000)=>{
    setloading(true);
      getData(`Port/GetAll?PageNumber=${pageNumber}&PageSize=${pageSize}`,
        (response)=>{
          setloading(false);
          setData(response.data)
        }
      )
  }


  const getUoms = (pageNumber=1,pageSize=1000)=>{
    setloading(true);
      getData(`Uom/GetAll?PageNumber=${pageNumber}&PageSize=${pageSize}`,
        (response)=>{
          setloading(false);
          setUomData(response.data);
          getPorts();

        }
      )
  }



  const getUomNameById = (id)=>{
    return uomData?.filter((x)=>x.id === id)[0].uoMsymbole
  }







  const addPort = (values) => {
    const newValues = {...values,
      maxCapacity:parseInt(values.maxCapacity),
      price:parseInt(values.price)
    }
    setAddLoading(true)
    addData(`Port/Creat`,newValues,
    (err,result)=>{
      if(!err){
        console.log('result',result)
        setAddLoading(false);
        getPorts();
        message.success('تم اضافة منفذ بنجاح');
        addPortForm.resetFields();

      }else{
        setAddLoading(false)
        console.log('error',err)
        message.error(result?.message,3);
      }
      
    })
    
  };


  const editPort = (values) => {
    const newValues = {...values,
      maxCapacity:parseInt(values.maxCapacity),
      price:parseInt(values.price)
    }
    setAddLoading(true)
    updateData(`Port/Update/${values.id}`,newValues,
    (err,result)=>{
      if(!err){
        setAddLoading(false);
        getPorts();
        onEditClose();
        message.success('تم تعديل المنفذ بنجاح');
      }else{
        setAddLoading(false)
        message.error(result?.message,3);
      }
      
    })
  };







  const prepareEdit = (userData)=>{
    setSelectedCategory(userData)
    const newData = userData
     editPortForm.setFieldsValue(newData)
     showEditDrawer(true)
  }
  



  useEffect(() => {
    getUoms();
  })



  return (
    <Fragment>
      <Affix offsetTop={0}>
        <div  style={{padding:15,backgroundColor:'#fff'}}>
          <Button type="primary"  icon={<PlusOutlined />} onClick={()=>showDrawer()} >
            اضافة منفذ
          </Button>
        </div>
      </Affix>  


    {/* add new Category    */}

      <Drawer
        title="اضافة منفذ جديد"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={350}
      >
      
      <Form 
      form={addPortForm} 
      onFinish={addPort}
      
      >

     

        <Form.Item
          name="portName"
          rules={[
            {
              required: true,
              message: 'يرجى كتابة اسم المنفذ',
            }
          ]}
        >
          <Input size="large" placeholder="اسم المنفذ"  />
        </Form.Item>

        <Form.Item
          name="maxCapacity"
          rules={[
            {
              required: true,
              message: 'يرجى كتابة السعة ',
            }
          ]}
        >
          <Input type="number" onChange={(data)=>{if(data.target.value<0){addPortForm.setFieldsValue({maxCapacity:0})}}} size="large" placeholder="السعة" min={0} />
        </Form.Item>

        <Form.Item    name="uoMId" rules={[{ required: true, message: 'يرجى اختيار وحدة القياس' }]}>
          <Select size="large"  placeholder="وحدة القياس" >
              {
                  uomData?.map(({uoMsymbole,id},index) => {
                      return(<Option value={id} key={id} >{uoMsymbole}</Option>)
                  })
              }
          </Select>
        </Form.Item>


        <Form.Item
          name="price"
          rules={[
            {
              required: true,
              message: 'يرجى كتابة سعر المنفذ ',
            }
          ]}
        >
          <Input type="number" onChange={(data)=>{if(data.target.value<0){addPortForm.setFieldsValue({maxCapacity:0})}}} size="large" placeholder="سعر المنفذ" min={0} />
        </Form.Item>




        
      

      </Form>
      <Button type="primary"  icon={<SendOutlined />} onClick={()=>{addPortForm.submit()}} loading={addLoading} >
            ارسال 
      </Button>

      </Drawer>



    {/* edit Category  */}

      <Drawer
        title="تعديل المنفذ "
        placement="left"
        closable={false}
        onClose={onEditClose}
        visible={editVisible}
        width={350}
      >
      
      <Form 
      form={editPortForm} 
      onFinish={editPort}
      >

        <Form.Item name="id" hidden={true} >

        </Form.Item>

        <Form.Item
          name="portName"
          rules={[
            {
              required: true,
              message: 'يرجى كتابة اسم المنفذ',
            }
          ]}
        >
          <Input size="large" placeholder="اسم المنفذ"  />
        </Form.Item>

        <Form.Item
          name="maxCapacity"
          rules={[
            {
              required: true,
              message: 'يرجى كتابة السعة ',
            }
          ]}
        >
          <Input type="number" onChange={(data)=>{if(data.target.value<0){addPortForm.setFieldsValue({maxCapacity:0})}}} size="large" placeholder="السعة" min={0} />
        </Form.Item>

        <Form.Item    name="uoMId" rules={[{ required: true, message: 'يرجى اختيار وحدة القياس' }]}>
          <Select size="large"  placeholder="وحدة القياس" >
              {
                  uomData?.map(({uoMsymbole,id},index) => {
                      return(<Option value={id} key={id} >{uoMsymbole}</Option>)
                  })
              }
          </Select>
        </Form.Item>


        <Form.Item
          name="price"
          rules={[
            {
              required: true,
              message: 'يرجى كتابة سعر المنفذ ',
            }
          ]}
        >
          <Input type="number" onChange={(data)=>{if(data.target.value<0){addPortForm.setFieldsValue({maxCapacity:0})}}} size="large" placeholder="سعر المنفذ" min={0} />
        </Form.Item>

        


      </Form>
      <Button type="primary"  style={{backgroundColor:'#4CAF50',borderWidth:0}} icon={<EditOutlined />} onClick={()=>{editPortForm.submit()}} loading={addLoading} >
            ارسال 
      </Button>

      </Drawer>

      
      <Table 
      dataSource={data}
      pagination={{ position: ['bottomCenter'],pageSize:9}}
      onChange={handleTableChange}
      loading={loading}
      >


      <Column title="اسم المنفذ" dataIndex="portName" key="portName" sorter={(a, b) => a.portName.localeCompare(b.portName)}  /> 
      <Column title="سعة المنفذ" dataIndex="maxCapacity" key="maxCapacity" sorter={(a, b) => a.maxCapacity.localeCompare(b.maxCapacity)}  /> 
      <Column title="وحدة القياس"   key="uoMId"  
        render={(text, record) => (
         <div>{getUomNameById(record.uoMId)}</div>
        )}
      />
      <Column title="سعر المنفذ" dataIndex="price" key="price" sorter={(a, b) => a.price.localeCompare(b.price)}  /> 
      
      
      <Column
        title="العمليات"
        key="action"
        render={(text, record) => (
          <Space size="middle">
             <Button type="primary" icon={<EditOutlined />} size={'small'} className="editButton" onClick={()=>{prepareEdit(record)}} />
             <Button type="primary" icon={<DeleteOutlined />} size={'small'} className="deleteButton" onClick={()=>showDeleteConfirm(record.portName,record.id)} />
            {/* {record.roleName[0]==='Dealer'&&<a className={'infoButton'} onClick={()=>{prepareEdit(record)}}  >ملئ معلومات</a>} */}
          </Space>
        )}
      />
    </Table>

  </Fragment>
  );
}
