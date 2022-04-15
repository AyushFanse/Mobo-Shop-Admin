import { Link, useParams } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData, DataBase} from "../../DataFiles"
import { Publish, HighlightOffTwoTone } from "@material-ui/icons";
import axios from 'axios';
import React,{ useState, useEffect, useRef } from "react";
import { Alert, Stack } from '@mui/material';

export default function Product() {


  const [data, setData] = useState([]);
  const [Worning,setWorning] = useState('');
  const {productId} = useParams();
  const [baseImage, setBaseImage] = useState("");
  const contactForm = useRef();
  const formatter = new Intl.NumberFormat("en-US", 
  {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
  });
  // const DataBase = 'https://e-commerce-mobo-website.herokuapp.com';
  const DataBase = 'http://localhost:3001';



  useEffect(()=>{   
    Fatch();
  },[])

  const Fatch = (async()=>{
      let response = await axios.get(`${DataBase}/product/getproduct/${productId}`)
      setData(response.data);

  })
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = contactForm.current;
     
    try{
          let response = await axios.patch(`${DataBase}/product/updateproduct/${productId}`, {
                file: updatedData.file.value,
                productName : updatedData.productName.value,
                brand : updatedData.brand.value,
                quanttity : updatedData.quanttity.value,
                price : updatedData.price.value,
                rom : updatedData.rom.value,
                ram : updatedData.ram.value,
                processor : updatedData.processor.value,
                battery: updatedData.fbatteryvalue,
                userQuanttity : updatedData.userQuanttity.value,
                available : updatedData.available.value,
            } )
            setWorning(response.data);
            setTimeout(()=>{setWorning('')},3000);
            Fatch();
    } catch (err){
            setWorning({status:'error', msg:err.response.status + ' ' + err.response.statusText });
            setTimeout(()=>{setWorning('')},3000);
    }
  }

//-------------------------------* ONCHANGE FUNCTION *-------------------------------//
const onChange = async(e) =>{
    const RawData = e.target.files[0];
    const base64 = await convertBase64(RawData);
    setBaseImage(base64);
  };

const convertBase64 = (file) => {
return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
    resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
    reject(error);
    };
});
};


const Clear = () =>{
    setBaseImage('');
}

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/home/newproduct">
          <button className="productAddButton">New Product</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={productData} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={data.file} alt="" className="productInfoImg" />
                  <div className="productName">                        
                    <h3>{ data.productName }</h3>
                    <sup>{ data.brand }</sup>
                  </div>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">Processor: </span>
                      <span className="productInfoValue">{ data.processor }</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Battery:</span>
                      <span className="productInfoValue">{ data.battery }mAH</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Variant:</span>
                      <span className="productInfoValue">{ data.ram }GB / { data.rom }GB</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Price:</span>
                      <span className="productInfoValue">{formatter.format(data.price)}.00</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">In stock:</span>
                      <span className="productInfoValue">{ data.available }</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
            {
                Worning===''
            ? 
                null
            : 
                (
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert variant="filled" severity='error'>{Worning.msg}</Alert>
                    </Stack>
                )
            }   
          <form className="productForm" ref={contactForm} onSubmit={(e) => handleSubmit(e)}>
            <div className="userUpdateProduct">
                <label>Product Name</label>
                <input
                  type="text"
                  name='productName'
                  placeholder={ data.productName }
                  className="userUpdateInput"
                />
            </div>
            <div className="userUpdateProduct">
                <label>Brand Name</label>
                <input
                  type="text"
                  name='brand'
                  placeholder={ data.brand }
                  className="userUpdateInput"
                />
            </div>
            <div className="userUpdateProduct">
                <label>Processor</label>
                <input
                    type="text"
                    name='processor'
                    placeholder={ data.processor }
                    className="userUpdateInput"
                />
            </div>
            <div className="userUpdateProduct">
                <label>Battery</label>
                <input
                    type="text"
                    name='battery'
                    placeholder={`${ data.battery }mAh`}
                    className="userUpdateInput"
                />
            </div>
            <div className="userUpdateProduct">
                <label>Ram</label>
                <input
                    type="text"
                    name='ram'
                    placeholder={`${ data.ram }GB`}
                    className="userUpdateInput"
                />
            </div>
            <div className="userUpdateProduct">
                <label>Rom</label>
                <input
                    type="text"
                    name='rom'
                    placeholder={`${ data.rom }GB`}
                    className="userUpdateInput"
                />
            </div>
            <div className="userUpdateProduct">
                <label>Price</label>
                <input
                    type="text"
                    name='price'
                    placeholder={`${formatter.format(data.price)}.00` }
                    className="userUpdateInput"
                />
            </div> 
            <div className="userUpdateProduct">
                <label>Quanttity</label>
                <input
                    type="number"
                    name='quanttity'
                    placeholder={ data.quanttity }
                    className="userUpdateInput"
                />
            </div>       
            <div className="userUpdateProduct">
                <label>In stock</label>
                <select name='post' className="userUpdateOption">
                  <option value="Yes" defaultValue={data.available==='Yes' ? true : null} >Yes</option>
                  <option value="No" defaultValue={data.available==='Yes' ? null : true} >No</option>
                </select>
            </div>               
            <div className="userUpdateProductImg">
                <img src={baseImage || data.file} alt="" className="productUploadImg" />
                <label htmlFor="file" title="Upload" className='productUploadIcon'>
                    <Publish className='uploadIcon'/>
                </label>
                <input type="file" name="file" id="file" style={{display:"none"}} onChange={onChange}/>
                {
                        baseImage!==''
                    ?   
                        (
                            <div onClick={Clear} title="Clear" className='productUploadIconClear'>
                                <HighlightOffTwoTone  className='uploadIconClear'/>
                            </div>                         
                        ) 
                    :
                        null
                }                
            </div>
            <div className="userUpdateProduct">
            <button className="userUpdateButton"  type="submit">Update</button>
            </div>       
          </form>
      </div>
    </div>
  );
}
