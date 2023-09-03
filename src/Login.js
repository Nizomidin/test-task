import React, { useState } from "react";

function Login()
{
    const [phone, setPhone] = useState(0);
    const [password, setPassword] = useState(0);
    const handleChangePhone = (e) => {
        setPhone(e.target.value);
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let body = {
            phone: phone,
            password: password
        }
        let url = "http://31.129.97.20/api/v1/account/login/"
        let res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(response => response);
        if(res.status != 200)
        {
            alert("Неправильный номер/пароль");
        }
        else
        {
            let response = await(res).json();
            localStorage.setItem('token_access', response.access);
            localStorage.setItem('token_refresh', response.refresh);
            window.location.href = '/products';
        }
    }
    return (
        <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            onChange={handleChangePhone}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            onChange={handleChangePassword}
          />
        </div>
        <button className="form-group" type="submit">Login</button>
        <button onClick={() => window.location.href = 'register'} className="form-group">Register</button>
      </form>
    </div>
    );
}
export default Login;