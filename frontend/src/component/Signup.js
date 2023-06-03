import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Signup() {
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: ""
  
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response =await fetch("http://localhost:5000/api/CreateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name:data.name,email:data.email,password:data.password}),
    });
    const json= await response.json()
    console.log(json);
    if(!json.succes){
      alert("enter valid detail")
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
        <form
          onSubmit={handleSubmit}
          className="w-50 m-auto mt-5 border bg-dark border-success rounded"
        >
          <div className="m-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" name="name" value={data.name} onChange={onChange} placeholder="Name" aria-describedby="emailHelp"
            />
          </div>
          <div className="m-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input type="email" className="form-control" name="email" value={data.email} onChange={onChange} placeholder="Email" aria-describedby="emailHelp"
            />
          </div>
          
         
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" name="password" value={data.password} onChange={onChange}  placeholder="Password"
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/Login" className="m-3 mx-1 btn btn-danger">
            Already a user
          </Link>
        </form>
      </div>
    </div>
  );
}
