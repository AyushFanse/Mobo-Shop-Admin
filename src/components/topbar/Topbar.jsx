import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import "./topbar.css";
import { Box, Typography, MenuItem, Menu,Tooltip} from '@mui/material';
import { LogoutRounded, List } from '@mui/icons-material';

export default function Topbar() {

  const history = useHistory();   
  const [anchorElUser, setAnchorElUser] =useState(null);

  const logout = ()=>{
    localStorage.removeItem('token');
    alert('You have been logged out');
    history.replace('/');
  }

  //-------------------------------* NAVIGATION MENU FUNCTIONS *-------------------------------//
  const handleOpenUserMenu = ((event) => {
    setAnchorElUser(event.currentTarget);
  })

  const handleCloseUserMenu = (() => {
    setAnchorElUser(null);
  })

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Mobo Shop</span>
        </div>
        {(
                <Box sx={{ margin: 1 }}>
                  <Tooltip title="Open settings">
                    <List onClick={handleOpenUserMenu} sx={{ p: 0 }}/>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem id="menuItemsOut">
                      <Typography id="menuItemsUser"> Hi Buddy !</Typography>
                    </MenuItem>
                    <MenuItem id="menuItemsOut" onClick={logout}>
                      <LogoutRounded id="menuItemsIcon"/> &nbsp; &nbsp;
                      <Typography id="menuItems" >Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              )}
      </div>
    </div>
  );
}
