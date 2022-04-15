import React, {useState, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import './register.css';
import axios from 'axios';
import { Alert, Stack } from '@mui/material';
import { DataBase } from "../../DataFiles";
import {Button,Grid,TextField,IconButton,FormControl,InputLabel,Input,InputAdornment,Box} from '@mui/material';
import { Visibility, KeyboardBackspaceRounded, VisibilityOff } from '@mui/icons-material';

const LoginComponent = (props) => {

const history = useHistory();
const [showPassword,setShowPassword] = useState('');
const [Worning,setWorning] = useState('');
const contactForm = useRef();

//-------------------------------* PASSWORD VISIBILITY FUNCTIONS *-------------------------------//

const handleClickShowPassword = (e) => {
    setShowPassword(e.currentTarget);
};

const handleMouseDownPassword = (event) => {
event.preventDefault();
setShowPassword('');
};

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
                post:'Admin'
             } )
            setWorning(response.data);
            setTimeout(()=>{e.target.reset()},2000);

            if(response.data.status==='success'){
                props.history.push('/');   
            }
        }else{     
            setWorning({status:'error', msg:'Please fill all the details..!!!'})  
        }
    } catch (err){
            setWorning({status:'error', msg:err.response.data.msg});
            alert(err.response.data.msg);
            setTimeout(()=>{e.target.reset()},2000);
    }
}

//-------------------------------* VALIDATION FUNCTIONS *-------------------------------//
return (
    <>
        <IconButton className='backSpaceOut' title="Back" onClick={()=>{props.history.goBack()}} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <KeyboardBackspaceRounded className='backSpace' sx={{fontSize:'2.5rem'}} title='Back' />
        </IconButton>
        <Box className='registerLayout'>
            <Grid className="registerCardLayout">                
                <h2 className="registerHeading" >Register</h2>
                {
                        Worning.status==='error'
                    ? 
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert variant="filled" severity={Worning.status}>{Worning.msg}</Alert>
                        </Stack>
                    : 
                        null
                }
                <form ref={contactForm} style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
                    <Box sx={{ '& .MuiTextField-root': { m: 1.8, width: '14.8ch' }}}>
                        <TextField
                            id="standard"
                            label="First-Name"
                            name="first_name"
                            size="small"
                            variant="standard"
                            aria-required="true"
                            value={props.first_name}
                            />
                        <TextField
                            id="standard"
                            label="Last-Name"
                            name="last_name"
                            size="small"
                            variant="standard"
                            value={props.last_name}
                            />
                    </Box>
                    <Box sx={{ mt:-2, '& .MuiTextField-root': {m: 1.8, width: 293}}}>
                        <TextField
                            id="standard"
                            label="Username"
                            name="username"
                            size="small"
                            variant="standard"
                            value={props.username}
                            />
                    </Box>
                    <Box sx={{  mt:-2,'& .MuiTextField-root': { m: 1.8, width: 293}}}>
                        <TextField
                                id="standard"
                                label="Email"
                                name="email"
                                size="small"
                                variant="standard"
                                value={props.email}
                                />  
                    </Box>
                    <Box sx={{ mt:-2, '& .MuiTextField-root': {m: 1.8, width: 293}}}>
                        <TextField
                            id="standard"
                            label="Number"
                            name="number"
                            size="small"
                            variant="standard"
                            value={props.number}
                            />
                    </Box>
                    <FormControl sx={{ '& .MuiTextField-root': { m: 0}}}>
                        <InputLabel htmlFor="standard-adornment-password" sx={{ml:-1.7}}>Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword? 'text' : 'password'}
                            value={props.password}
                            size="small"
                            name="password"
                            sx={{width: 293}}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    >
                                    {showPassword ? <VisibilityOff />  : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Box sx={{'& .MuiTextField-root': { m: 1.8, width: 293}}}>
                        <TextField
                            id="standard"
                            label="Address"
                            name="address"
                            size="small"
                            variant="standard"
                            value={props.address}
                            />
                    </Box>
                    <Grid sx={{textAlign: 'center'}}>
                        <Button sx={{m:2}} type="submit" variant="contained" disableElevation >
                            Create Account
                        </Button>
                        <Grid sx={{textAlign: 'center', cursor: 'pointer'}}>
                            <p className="loginAccount">Already have account ? <span className='link' onClick={() =>{history.replace('/')}} variant="body2">Log-In</span></p>
                        </Grid>                            
                    </Grid>
                </form>
            </Grid>
        </Box>         
    </>
)
}

export default LoginComponent;
