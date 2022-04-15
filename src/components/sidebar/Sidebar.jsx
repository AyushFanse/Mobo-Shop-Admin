import React, {useEffect} from 'react';
import "./sidebar.css";
import {
  LineStyle,
  PermIdentity,
  Storefront,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {

  useEffect(()=>{
    Indicator();
  })

const Indicator = ()=>{
    
  let item =  document.querySelectorAll('.sidebarListItem');
  function indicator(e){
    item.forEach((list)=> 
      list.classList.remove('active'));
      e.classList.add('active');
  }

  item.forEach((link)=>{
    link.addEventListener('click', (e)=>{
      indicator(e.target);
    })
  })
}



  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList menu_list">
            <Link to="/home" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            <Link to="/home/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/home/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
