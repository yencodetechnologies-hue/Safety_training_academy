import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function LoginForm(){

  const { login } = useContext(AuthContext)
const navigate = useNavigate()

const formik = useFormik({

initialValues:{
email:"",
password:""
},

validationSchema: Yup.object({
email: Yup.string()
.email("Invalid email")
.required("Email required"),

password: Yup.string()
.required("Password required")
}),

onSubmit: async(values)=>{

try{

const res = await axios.post(
"https://safety-training-academy.onrender.com/api/auth/login",
values
)

localStorage.setItem("token", res.data.token)
localStorage.setItem("user", JSON.stringify(res.data.user))
login(res.data.user)
const role = res.data.user.role

if(role === "Student"){
navigate("/student")
}

if(role === "Teacher"){
navigate("/teacher")
}

if(role === "Admin"){
navigate("/admin")
}

}catch(err){

alert(err.response?.data?.message || "Login failed")

}

}

})

return(

<div className="login-box">

<h3>Welcome Back</h3>

<p className="subtitle">
Sign in to your account or create a new one
</p>

<div className="tabs">
<Link className="tab active" to="/login">Sign In</Link>
<Link className="tab" to="/register">Register</Link>
</div>

<form onSubmit={formik.handleSubmit}>

<label>Email</label>

<input
type="email"
name="email"
placeholder="you@example.com"
value={formik.values.email}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
/>

<label>Password</label>

<input
type="password"
name="password"
placeholder="••••••••"
value={formik.values.password}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
/>

<div className="options">

<label>
<input type="checkbox" />
Remember me
</label>

<a href="#">Forgot password?</a>

</div>

<button className="signin-btn" type="submit">
Sign In
</button>

</form>

</div>

)

}

export default LoginForm