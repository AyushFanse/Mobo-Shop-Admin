import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { DataBase } from "../../DataFiles";
import { Alert, Stack } from '@mui/material';

export default function ProductList() {
  const [data, setData] = useState([]);
  const [Worning,setWorning] = useState('');
  const formatter = new Intl.NumberFormat("en-US", 
  {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
  });

  useEffect( () =>{ Fatch() })

  const Fatch = (async()=>{
    var response = await axios.get(`${DataBase}/product/getproduct`)
    setData(response.data);
  })
  

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure to delete this record?')){
    let res = await axios.delete(`${DataBase}/product/deleteproduct/${id}`);
    setWorning(res.data)
    Fatch();
    }
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "productName",
      headerName: "Product",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.file} alt="" />
            {params.row.productName}
          </div>
        );
      },
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 200
    },
    { field: "quanttity", headerName: "Stock", width: 120 },
    {
      field: "battery",
      headerName: "Battery",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.battery}mAH
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {formatter.format(params.row.price)}.00
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/home/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/home/newproduct">
          <button className="productAddButton">New Product</button>
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
        pageSize={25}
        checkboxSelection
        className="productTable"
      />
    </div>
  );
}
