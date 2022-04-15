import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { DataBase } from "../../DataFiles";
import { Link } from "react-router-dom";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Alert, Stack } from '@mui/material';


export default function UserList() {
  const [data, setData] = useState([]);
  const [Worning,setWorning] = useState('');

  useEffect(()=>{
    Fatch();
  },[])
  
  const Fatch = (async()=>{
    let response = await axios.get(`${DataBase}/users/getuser`)
    setData(response.data);
  })
  
  const handleDelete = async (id) => {
    if(window.confirm('Are you sure to delete this record?')){
    let response = await axios.delete(`${DataBase}/users/deleteuser/${id}`)
      setWorning(response.data);
    }
  };
  
  const columns = [
    { 
      field: "id", 
      headerName: "ID", 
      width: 100
    },
    {
      field: "username",
      headerName: "User",
      width: 175
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      valueGetter: (params) =>
        `${params.row.first_name } ${params.row.last_name }`
    },
    {
      field: "post",
      headerName: "Post",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/home/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/home/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
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
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        className="usertable"
      />
    </div>
  );
}
