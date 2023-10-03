
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignUp() {
    const [credential, setCredential] = useState({
        name: "",
        email: "",
        password: "",
        geolocation: ""
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate('/login')
        try {
            const response = await axios.post('http://localhost:5000/api/createuser', {
                name: credential.name,
                email: credential.email,
                password: credential.password,
                location: credential.geolocation
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log(response);

            if (response.data && response.data.success) {
                navigate("/login");
            } else {
                alert("Enter valid credentials...");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while submitting the form. Please try again later.");
        }
       
    }

    const handleChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className='container '>
                <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
                    <div className="m-3">
                        <label htmlFor="name" className="form-label text-white">Name</label>
                        <input type="text" className="form-control" name='name' value={credential.name} onChange={handleChange} />
                    </div>
                    <div className="m-3">
                        <label htmlFor="email" className="form-label text-white">Email</label>
                        <input type="email" className="form-control" name='email' value={credential.email} onChange={handleChange} />
                        <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="m-3">
                        <label htmlFor="address" className="form-label text-white">Address</label>
                        <input type="text" className="form-control" name='geolocation' value={credential.geolocation} onChange={handleChange} />
                    </div>
                    <div className="m-3">
                        <label htmlFor="password" className="form-label text-white">Password</label>
                        <input type="password" className="form-control" name='password' value={credential.password} onChange={handleChange} />
                    </div>

                    <button type="submit" className="btn btn-success m-3">Submit</button>
                    <Link to="/login" className="btn btn-danger m-3">Already a user</Link>
                    <Link className="btn btn-primary m-3" aria-current="page" to="/">Home</Link>
                </form>
            </div>
        </>
    )
}