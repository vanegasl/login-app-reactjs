import React, { useState } from 'react';
import { setUserSession, getName, setUserToken } from './Utils/Common';


function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  const cortex = 'http://localhost:9080/cortex/oauth2/tokens'
  const requestInit = {
    method: 'post',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',      
      'x-ep-user-traits': 'LOCALE=en-CA, CURRENCY=CAD'
    },
    body: 'username='+username.value+'&password='+password.value+'&grant_type=password&role=REGISTERED&scope=mobee',
  };


  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    fetch(cortex,requestInit)
    .then(res => res.json())
    .then((response) => {
      setLoading(false);
      console.log("LEOOOOOOOOOOOOOOOOOO data="+ response);
      //setUserSession(response.access_token, response.role);
      setUserToken(response.access_token);
      getName(response.access_token);
      props.history.push('/dashboard');

    }).catch(error => {
      console.log(" And the error was = "+ error);
      setLoading(false);
      if (error.response.status === 401) setError("Bad credentials!");
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <div>
      Login<br /><br />
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;