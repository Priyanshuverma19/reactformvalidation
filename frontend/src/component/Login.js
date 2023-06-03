import React,{useState}from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Login() {
  const [data, setdata] = useState({ name: "", email: ""});
  let navigate= useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response =await fetch("http://localhost:5000/api/LoginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:data.email,password:data.password}),
    });
    const json= await response.json()
    console.log(json);
    if(!json.succes){
      alert("enter valid detail")
    }
    if(json.succes){
      navigate("/Navbar")
    }
  };
  const onChange = (event) => {
    setdata({
      ...data,
      [event.target.name]: event.target.value
    });
  };
  return (
    <div>
    <Navbar/>
      <div className="container">
        <form className="w-50 m-auto mt-5 border bg-dark border-success rounded" onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={data.email} onChange={onChange}
              placeholder='Username/Email'
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone.
            </div>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" name="password" value={data.password} onChange={onChange} placeholder='Password'/>
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/Signup" className="m-3 mx-1 btn btn-danger">
            New User
          </Link>
        </form>
      </div>
    </div>
  );
}
