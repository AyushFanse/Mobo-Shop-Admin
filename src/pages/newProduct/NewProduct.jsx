import "./newProduct.css";
import { Publish, HighlightOffTwoTone } from "@material-ui/icons";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useRef } from "react";
import { Alert, Stack } from '@mui/material';
import { DataBase } from "../../DataFiles";

export default function NewProduct() {

    const history = useHistory();
    const [Worning, setWorning] = useState('');
    const [file, setFile] = useState('');
    const [baseImage, setBaseImage] = useState("");
    const contactForm = useRef();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = contactForm.current;
        try {
            if (file !=='' && updatedData.productName && updatedData.brand && updatedData.quanttity && updatedData.price && updatedData.rom && updatedData.ram && updatedData.processor && updatedData.battery && updatedData.available) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('productName', updatedData.productName.value);
                formData.append('brand', updatedData.brand.value);
                formData.append('quanttity', updatedData.quanttity.value);
                formData.append('price', updatedData.price.value);
                formData.append('rom', updatedData.rom.value);
                formData.append('ram', updatedData.ram.value);
                formData.append('processor', updatedData.processor.value);
                formData.append('battery', updatedData.battery.value);
                formData.append('available', updatedData.available.value);

                let response = await axios.post(`${DataBase}/product/saveproduct`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                setTimeout(() => { setWorning('') }, 3000);
                if (response.data.status === 'success') {
                    history.replace('/home/products');
                }
            } else {
                setWorning({ status: 'error', data: { msg: 'Please fill all the details..!!!' } });
            }
        } catch (err) {
            setWorning({ status: 'error', msg: err.response.status + ' ' + err.response.statusText });
            setWorning({ status: 'error', msg: "fail" });
            setTimeout(() => { setWorning('') }, 3000);
        }
    }

    //-------------------------------* ONCHANGE FUNCTION *-------------------------------//
    const onChange = async (e) => {
        const RawData = e.target.files[0];
        setFile(RawData);
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


    const Clear = () => {
        setBaseImage('');
    }


    return (
        <div className="newProduct">
            <h1 className="addProductTitle">New Product</h1>

            <div className="productBottom">
                {
                    Worning === ''
                        ?
                        null
                        :
                        (
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert variant="filled" severity={Worning.status}>{Worning.msg}</Alert>
                            </Stack>
                        )
                }
                <form className="productForm" ref={contactForm} onSubmit={(e) => handleSubmit(e)}>
                    <div className="userUpdateProduct">
                        <label>Product Name</label>
                        <input
                            type="text"
                            name='productName'
                            placeholder='Product Name'
                            className="userUpdateInput"
                        />
                    </div>
                    <div className="userUpdateProduct">
                        <label>Brand Name</label>
                        <input
                            type="text"
                            name='brand'
                            placeholder='Brand Name'
                            className="userUpdateInput"
                        />
                    </div>
                    <div className="userUpdateProduct">
                        <label>Processor</label>
                        <input
                            type="text"
                            name='processor'
                            placeholder="Processor"
                            className="userUpdateInput"
                        />
                    </div>
                    <div className="userUpdateProduct">
                        <label>Battery</label>
                        <input
                            type="text"
                            name='battery'
                            placeholder="Battery"
                            className="userUpdateInput"
                        />
                    </div>
                    <div className="userUpdateProduct">
                        <label>Ram</label>
                        <input
                            type="text"
                            name='ram'
                            placeholder="Ram"
                            className="userUpdateInput"
                        />
                    </div>
                    <div className="userUpdateProduct">
                        <label>Rom</label>
                        <input
                            type="text"
                            name='rom'
                            placeholder="Rom"
                            className="userUpdateInput"
                        />
                    </div>
                    <div className="userUpdateProduct">
                        <label>Price</label>
                        <input
                            type="text"
                            name='price'
                            placeholder="Price"
                            className="userUpdateInput"
                        />
                    </div>
                    <div className="userUpdateProduct">
                        <label>Quanttity</label>
                        <input
                            type="number"
                            name='quanttity'
                            placeholder="Total Stok"
                            className="userUpdateInput"
                        />
                    </div>
                    <div className="userUpdateProduct">
                        <label>In stock</label>
                        <select name='available' className="userUpdateOption">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="userUpdateProductImg">
                        <div className="productUploadImgOut">
                            <label>Product image</label>
                            <img src={baseImage ? baseImage : `https://i.ibb.co/gScQz3q/default-Image.png`} alt="" className="productUploadImg" />
                        </div>
                        <div className="productUploadImgOut">
                            <label htmlFor="file" title="Upload" className='productUploadIcon'>
                                <Publish className='uploadIcon' />
                            </label>
                            <input type="file" name="file" id="file" style={{ display: "none" }} onChange={onChange} />
                            {
                                baseImage !== ''
                                    ?
                                    (
                                        <div onClick={Clear} title="Clear" className='productUploadIconClear'>
                                            <HighlightOffTwoTone className='uploadIconClear' />
                                        </div>
                                    )
                                    :
                                    null
                            }
                        </div>
                    </div>
                    <div className="userUpdateProduct">
                        <button className="userUpdateButton" type="submit">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
