import React, { useState } from 'react';
import { axiosInstance } from '../api';
import { Form , Input, Button, Upload, Modal, notification } from 'antd';
import { PlusOutlined, FrownOutlined } from '@ant-design/icons';
import { getBase64FromFile } from '../pages/utils/base64';
import { useAppContext } from '../store';
import { parseErrorMessages } from '../pages/utils/forms';
import { useHistory } from 'react-router-dom';

function PostNewForm() {
  const { store: { jwtToken }} = useAppContext();

  const [fileList, setFileList] = useState([]);
  const [previewPhoto, setPreviewPhoto] = useState({
    visible: false,
    base64: null
  });
  const [fieldErrors, setfieldErrors] = useState({});

  const history = useHistory();

  const handleUploadChange = ({fileList}) => {
    setFileList(fileList);
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  const handlePreviewPhoto = async file =>{
    if( !file.url && !file.preview){
      file.preview = await getBase64FromFile(file.originFileObj);
    }

    setPreviewPhoto({
      visible: true,
      base64: file.url || file.preview
    });
  };

  const handleFinish = async fieldValues =>{
    // console.log(fieldValues);
    const { caption, location, photo: { fileList } } = fieldValues;
    
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("location", location);

    fileList.forEach(file => {
      formData.append("photo", file.originFileObj);
    });

    const headers = { Authorization: `JWT ${jwtToken}`};
    try{
      const response = await axiosInstance.post(
        "/api/posts/", formData, { headers });
      console.log(response);
      history.push('/');

    }catch(error){
      if(error.reponse){
        const { status, data : fieldsErrorMessages} = error.reponse;
        if(typeof fieldsErrorMessages === "string"){
          console.error(`error ${status} 응답을 받았습니다.`);

          notification.open({
            message: "서버오류",
            description: `error ${status} 응답을 받았습니다. 서버를 확인해주세요`,
            icon: <FrownOutlined style={{ color : "#ff3333"}}/>
          });

        }else{
          setfieldErrors(parseErrorMessages(fieldsErrorMessages));
        }
      }
    }

  };

  return (
    <Form
    {...layout}
    onFinish={handleFinish}
    // onFinishFailed={onFinishFailed}
  >
    <Form.Item
      label="Caption"
      name="caption"
      rules={[
        {
          required: true,
          message: '내용을 입력해주세요!',
        }        
      ]}
      hasFeedback
      {...fieldErrors.caption}
      {...fieldErrors.non_field_errors}

    >
      <Input.TextArea />
    </Form.Item>

    <Form.Item
      label="Location"
      name="Location"
      rules={[
        {
          required: true,
          message: '지역을 입력해주세요!',
        }        
      ]}
      hasFeedback
      {...fieldErrors.location}
      {...fieldErrors.non_field_errors}

    >
      <Input />
    </Form.Item>

    <Form.Item 
      label="photo" 
      name="photo"
      rules={[{ required: true, message: "사진을 업로드해주세요."}]}
      hasFeedback
      {...fieldErrors.photo}
      >
      
      <Upload 
        listType="picture-card" 
        fileList={fileList}
        beforeUpload={()=>{
          return false;
        }}
        onChange={handleUploadChange}
        onPreview={handlePreviewPhoto}>
          {fileList.length > 0 ? null : (
            <div>
              <PlusOutlined/>
              <div className="ant-upload-text">Upload</div>
            </div>
          )}          
      </Upload>
    </Form.Item>

    <Form.Item {...tailLayout}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>

    <Modal
      visible={previewPhoto.visible} footer={null}
      onCancel={()=>setPreviewPhoto({
        visible: false
      })}>  
      <img 
        src={previewPhoto.base64}
        style={{ width: "100%" }}
        alt="Preview"
        />  
    </Modal>
    <hr/>
    {JSON.stringify(fileList)}
  </Form>
    );
}

export default PostNewForm;