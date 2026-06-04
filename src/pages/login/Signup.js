import React, { useState } from 'react'
import './Signup.scss'
import { Link } from 'react-router-dom'

function Signup() {
  const [name,setName]=useState('');
  const [email, setEmail] = useState("");
  const [secretKey, setCode] = useState("");
  const [password, setPassword] = useState("");

  async function HandleSignup(){
    
  }

  return (
      <div className="Signup center">
        <form onSubmit={HandleSignup}>
            <h1>SignUp</h1>
          <input type="text" placeholder='Name' onChange={(e)=>setName(e.target.value)}/>
          <input type="email" placeholder='Email'onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
          <input type="text" placeholder='Admin key'onChange={(e)=>setCode(e.target.value)}/>
          <button className='links btn1'>Signup</button>
            <p className='subheading'>Already have an account? <Link to="/login">login</Link> </p>
        </form>
      </div>
  )
} 

export default Signup