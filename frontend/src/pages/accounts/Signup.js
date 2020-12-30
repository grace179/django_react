import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Alert } from 'antd';

function Signup() {
  const history = useHistory();

  const [inputs, setInputs] = useState({ username: "", password: ""});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formDisabled, setformDisabled] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});

    Axios.post("http://localhost:8000/accounts/signup/", inputs)
      .then(response => {
        // console.log("response : ", response);
        history.push('/accounts/login');
      })
      .catch(error => {
        console.log("error : ", error);

        if (error.response){
          setErrors({
            username: (error.response.data.username || []).join(" "),
            password: (error.response.data.password || []).join(" ")
          });

          // console.log("error.response", error.response);
        }
      })
      .finally(()=>{
        setLoading(false);
      });

    // console.log('onSubmit', inputs);
  };

  useEffect(() => {
    const isEnabled = Object.values(inputs).every(s => s.length > 0); 
    setformDisabled(!isEnabled);
    
  }, [inputs]);
 
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]:value
    }));
    
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input type="text" name="username" onChange={onChange}/>
          {errors.username && <Alert type="error" message={errors.username}/>}
        </div>
        <div>
          <input type="password" name="password" onChange={onChange}/>
          {errors.password && <Alert type="error" message={errors.password}/>}
        </div>
        
        <input type="submit" value="회원가입" 
        disabled={ loading || formDisabled}/>
      </form>
    </div>
  )
}

export default Signup;