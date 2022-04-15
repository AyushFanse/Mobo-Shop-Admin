import "./newUser.css";
import React, {useState, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { Alert, Stack } from '@mui/material';
import { DataBase } from "../../DataFiles";

export default function NewUser(props) {

  const history = useHistory();
  const [Worning,setWorning] = useState('');
  const contactForm = useRef();

  
const handleSubmit = async (e) => {
  e.preventDefault();
  const data = contactForm.current;


let response = '';           
  try{               
      if(data.first_name.value && data.last_name.value && data.username.value  && data.email.value && data.address.value && data.number.value && data.password.value ) {   
           response = await axios.post(`${DataBase}/register/registerUser`, {
              first_name:data.first_name.value,
              last_name:data.last_name.value,
              username:data.username.value ,
              email:data.email.value,
              address:data.address.value,
              number:data.number.value,
              password:data.password.value,
              post:data.post.value
           } )
          setWorning(response.data);
          setTimeout(()=>{e.target.reset()},2000);

          if(response.data.status==='success'){
              history.replace('/home/users');   
          }
      }else{     
          setWorning({status:'error', msg:'Please fill all the details..!!!'})  
          setTimeout(()=>{e.target.reset()},2000);
      }
  } catch (err){
          setWorning({status:'error', msg:err.response.data.message});
          setTimeout(()=>{e.target.reset()},2000);
  }
}


  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <hr/>      
      {
            Worning.status==='error'
        ? 
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert variant="filled" severity={Worning.status}>{Worning.msg}</Alert>
            </Stack>
        : 
            null
      }
      <form className="newUserForm" ref={contactForm} onSubmit={(e) => handleSubmit(e)}>
        <div className="newUserItem">
          <label>Username</label>
          <input 
            type="text"
            name='username'
            placeholder='Username'
           />
        </div>
        <div className="newUserItem">
          <label>First Name</label>
          <input 
            type="text"
            name='first_name'
            placeholder='First Name'
           />
        </div>
        <div className="newUserItem">
          <label>Last Name</label>
          <input 
            type="text"
            name='last_name'
            placeholder='Last Name'
           />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input 
            type="email"
            name='email'
            placeholder='Email'
           />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input 
            type="text"
            name='password'
            placeholder='Password'
           />
        </div>
        <div className="newUserItem">
          <label>Number</label>
          <input 
            type="phone" 
            name='number'
            placeholder='Number'
          />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input 
            type="text" 
            name='address'
            placeholder='Address'
          />
        </div>
        <div className="newUserItem">
          <label>Post</label>
          <select name='post' className="newUserSelect" id="active">
            <option value="User" >User</ option>
            <option value="Admin" >Admin</option>
          </select>
        </div>
        <div className="newUserItem">
          <button className="newUserButton">Create</button>
        </div>
      </form>
    </div>
  );
}
