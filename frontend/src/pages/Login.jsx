import React from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate();

    const [data, setFormData] = useState({

        email: "",
        password: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...FormData, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5565/login", data);
            localStorage.setItem("token", res.data.token);
            alert("login successful");

            navigate("/dashboard");





        } catch (error) {
            console.log("error occured.")

        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>

                <input type="text" name="email" value={data.email} placeholder="enter your email" onChange={handleChange} />
                <input type="password" name="password" value={data.password} placeholder="enter your password" onChange={handleChange} />
                <button type="submit">Login</button>

            </form>
            <p>Already have an account <Link to="/">Signup</Link></p>

        </div>
    )
}

export default Login;
