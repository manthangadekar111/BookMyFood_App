import React  , {useState} from 'react'
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [credential  , setcredential] = useState({email:"",password:""})
  const navigate  = useNavigate();

const handlesubmit = async (e)=>{
    e.preventDefault();
    console.log(JSON.stringify({email:credential.email , password:credential.password }))
    const response = await fetch('http://localhost:5000/api/loginuser',{
        method:'POST',
        headers:{
            "Content-Type" : 'application/json'
        },
        body:JSON.stringify({name:credential.name , email:credential.email , password:credential.password ,location:credential.geolocation})
    });
    const json = await response.json()
    

    if(!json.success){
        alert("enter valid credentials...");
    }

    if(json.success){
      localStorage.setItem("useremail" , credential.email);
      localStorage.setItem("authToken" , json.authToken);
      navigate("/");
      
  }
}

const onchange =(e)=>{
    setcredential({...credential ,[e.target.name]:e.target.value})
}
  return (
    <div>
      <div className='container '>
            <form className='w-40 m-auto mt-5 border bg-dark border-success rounded'  onSubmit={handlesubmit}>
            
                <div className='m-3'>
                    <label htmlFor="email" className="form-label text-white" >Email</label>
                    <input type="email" className="form-control"  name='email' value={credential.email} onChange={onchange}/>
                    <div id="emailHelp" className="htmlForm-text text-white">We'll never share your email with anyone else.</div>
                </div>
                <div className='m-3'>
                    <label htmlFor="password" className="form-label text-white">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credential.password}  onChange={onchange} />
                </div>
    
                <button type="submit" className="btn btn-success m-3">Submit</button>
                <Link to="/createuser" className="btn btn-danger m-3">I'm new  user</Link>
                <Link className="btn btn-primary m-3" aria-current="page" to="/">Home</Link>
            </form>
        </div>
    </div>
  )
}
