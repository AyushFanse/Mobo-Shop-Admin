import axios from 'axios';
import React, { useState, useEffect, useRef } from "react";
import {
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid
} from "@material-ui/icons";
import { FaceRounded, AdminPanelSettingsOutlined, EditTwoTone } from '@mui/icons-material';
import { Link, useParams } from "react-router-dom";
import { DataBase } from "../../DataFiles";
import { Alert, Stack } from '@mui/material';
import "./user.css";

export default function User(props) {

  const [data, setData] = useState([]);
  const [Worning,setWorning] = useState('');
  const {userId} = useParams();
  const contactForm = useRef();


    
  useEffect(()=>{   
    Fatch();
  },[])

  const Fatch = (async()=>{
      let response = await axios.get(`${DataBase}/users/getuser/${userId}`)
      setData(response.data);

  })
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = contactForm.current;
     
    try{   
          let response = await axios.patch(`${DataBase}/users/updateuser/${userId}`, {
                first_name:updatedData.first_name.value,
                last_name:updatedData.last_name.value,
                username:updatedData.username.value,
                email:updatedData.email.value,
                address:updatedData.address.value,
                post:updatedData.post.value,
                number:updatedData.number.value
            } )

            setWorning(response.data);
            setTimeout(()=>{setWorning('')},3000);
            Fatch();
    } catch (err){
            setWorning({status:'error', msg:err.response.status + ' ' + err.response.statusText });
            setTimeout(()=>{setWorning('')},3000);
    }
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/home/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            < FaceRounded
              className="userShowImg" sx={{fontSize: '2.5rem'}}
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{ data.first_name } { data.last_name }</span>
              <span className="userShowUserTitle">{ data.email }</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{ data.username }</span>
            </div>
            <div className="userShowInfo">
              <AdminPanelSettingsOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">{ data.post }</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{ data.number }</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{ data.email }</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{ data.address }</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit <EditTwoTone/></span>
          {
                        Worning===''
                    ? 
                      null
                    : 
                      (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert variant="filled" severity={Worning.status}>{Worning.msg}</Alert>
                        </Stack>
                      )
                }
          <form className="userUpdateForm"  ref={contactForm} onSubmit={(e) => handleSubmit(e)}>
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  name='username'
                  placeholder={ data.username }
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>First Name</label>
                <input
                  type="text"
                  name='first_name'
                  placeholder={ data.first_name }
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Last Name</label>
                <input
                  type="text"
                  name='last_name'
                  placeholder={ data.last_name }
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name='email'
                  placeholder={ data.email }
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  name='number'
                  placeholder={ data.number }
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  name='address'
                  placeholder={ data.address }
                  className="userUpdateInput"
                />
              </div> 
              <div className="userUpdateItem">
                <label>Post</label>
                <select name='post' className="userUpdateOption">
                  <option value="Admin" selected={data.post==='Admin' ? true : null} >Admin</option>
                  <option value="User" selected={data.post==='Admin' ? null : true} >User</option>
                </select>
              </div>             
              <div className="userUpdateItem">
                <button className="userUpdateButton"  type="submit">Update</button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}
