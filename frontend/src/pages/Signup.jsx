import React from 'react'
import {navigate, Link} from "react-router-dom";


const Signup = () => {
    const navigate=useNavigate();

    const [data, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        balance: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...FormData, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5565/signup",data);
            alert("signup successful");
            navigate("/login");


            


        } catch (error) {
            console.log(error.message)

        }
    }
    return (
        <div>
            

        </div>
    )
}

export default Signup
