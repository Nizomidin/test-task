import React, { useState } from "react";
import './App.css';
function RegisterPage() {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    password_confirmation: ""
  });
  const [step, setStep] = useState(1);
  const [otp, setOpt] = useState(0);
  const [id, setId] = useState(0);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const onOptChange = (e) => {
    setOpt(e.target.value);    
}
  
  
  const nextStep = async () => {
    let url = 'http://31.129.97.20/api/v1/account/register/step/1/'
    let dataToSend ={
        phone: formData.phone,
        password: formData.password,
        password_confirmation: formData.password_confirmation
    }
    let response = fetch(url, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend)
    })
    .then(async (res) => await(res).json())
    response = await response;
    if(response.phone !== undefined)
        alert(response.phone[0]);
    else if(response.password_confirmation !== undefined)
        alert(response.password_confirmation[0]);
    else if(response.non_field_errors !== undefined)
        alert(response.non_field_errors);
    else
    {
        setId(response.id);
        setStep(step + 1);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      user_id: id,
      otp: otp,
    };
    
    try {
      const response = await fetch("http://31.129.97.20/api/v1/account/register/step/2/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.status !== 200) {
        alert("Неверный код подтверждения");
      } else {
        const data = await response.json(); 
        localStorage.setItem('token_access', data.access);
        localStorage.setItem('token_refresh', data.refresh);
        window.location.href = '/';
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="register-form">
      <h1>Register</h1>
      {step === 1 && (
        <div>
          <label>Phone</label>
          <input
            type="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <label>Password Confirmatopm</label>
          <input
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleInputChange}
          />
          <button onClick={nextStep}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <label>SMS-Code:</label>
          <input
            type="number"
            name="code"
            value={otp}
            onChange={onOptChange}
          />
          
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default RegisterPage;
