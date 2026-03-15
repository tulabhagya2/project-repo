import React from 'react'
import { useNavigate, Link } from "react-router-dom";


const Signup = () => {
    const navigate = useNavigate();

    const [data, setFormData] = useState({
        name: "",
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
            await axios.post("http://localhost:5565/signup", data);
            alert("signup successful");
            navigate("/login");





        } catch (error) {
            console.log(error.message)

        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={data.name} placeholder="enter your name" onChange={handleChange} />
                <input type="text" name="email" value={data.email} placeholder="enter your email" onChange={handleChange} />
                <input type="password" name="password" value={data.password} placeholder="enter your password" onChange={handleChange} />
                <button type="submit">Signup</button>

            </form>
            <p>Already have an account <Link to="/login">Login</Link></p>

        </div>
    )
}

export default Signup;
