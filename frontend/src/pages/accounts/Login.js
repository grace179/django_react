import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { SmileOutlined , FrownOutlined } from '@ant-design/icons';
import { Form, Input, Button, notification} from 'antd';
import useLocalStorage from '../utils/userLocalStorage';

function Login() {
  const history = useHistory();
  const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", "");
  const [fieldErrors, setfieldErrors] = useState({});

  // console.log("loaded jwtToken", jwtToken);

  const onFinish = values => {
    async function fn(){
      const { username, password } = values;

      setfieldErrors({});

      const data = { username, password };
      try{
        const response = await Axios.post(
          "http://localhost:8000/accounts/token/", 
          data);
          const { data : { token : jwtToken }} = response;
          setJwtToken(jwtToken);
          // console.log("response : ", jwtToken);
        
        notification.open({
          message: "로그인 성공",
          description: "로그인 페이지로 이동합니다.",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />
        });
        // history.push('/accounts/login');
        
      }catch(error){
        if(error.response){
          notification.open({
            message: "로그인 실패",
            description: "아이디, 비밀번호를 확인해주세요.",
            icon: <FrownOutlined style={{ color : "#ff3333"}}/>
          });

          const { data: fieldsErrorMessages } = error.response;

          setfieldErrors(
            Object.entries(fieldsErrorMessages).reduce(
              (acc, [fieldName, errors]) => {
                acc[fieldName] = {
                  validateStatus: "error",
                  help: errors.join(" ")
                };
                return acc;
            },{}));
        }
      }
    }
    fn();

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
  
  return (
  
    <Form
    {...layout}
    onFinish={onFinish}
    // onFinishFailed={onFinishFailed}
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        }        
      ]}
      hasFeedback
      {...fieldErrors.username}
      {...fieldErrors.non_field_errors}

    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
      {...fieldErrors.password}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item {...tailLayout}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
    )
}

export default Login;
