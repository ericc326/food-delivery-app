import React, { useState} from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from 'axios';

const LoginPopup = ({setShowLogin}) => {

  const [currState,setCurrState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5173/', {name, email, password})
    .then(result => console.log(result)) .catch(err=> console.log(err))
    }

    return (
      <div className='login-popup'>
        <form className="login-popup-container" onSubmit={handleSubmit}>
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin()} src={assets.cross_icon} alt="" />
          </div>
          <div className="login-popup-inputs">
            {currState==="Login" ? null : <input type="text" placeholder='Your name' value={name} onChange={(e) => setName(e.target.value)} required />}
            <input type="email" placeholder='Your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">{currState==="Sign Up" ? "Create account" : "Login"}</button>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
          {currState==="Login" ? (
            <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
          ) : (
            <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
          )}
        </form>
      </div>
    );
  };
  

export default LoginPopup
