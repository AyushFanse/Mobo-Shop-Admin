import React,{useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import Home from "./pages/home/Home";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import jwt from 'jsonwebtoken';

function Target(props) {

    
    const localToken = localStorage.getItem('token');
    var decodedToken = jwt.decode(localToken);
    const history =useHistory();

    useEffect(()=>{
        if(decodedToken===null){
            history.replace('/');            
            alert("Session Timeout Please Login Again...");
          }else{
          if(decodedToken.user.post === "Admin"){
            if(decodedToken.exp*1000<=Date.now()){
                history.replace('/');
              }else{
                console.log(decodedToken)
              }
          }else{
            alert('You do not have permission to access this page...!');
            localStorage.removeItem('token');            
            history.replace('/');
        }
        }
    })
    return (
        <>           
            <Router>
                <Topbar />
                <div className="container">
                    <Sidebar className="sidebarToggel"/>
                <Switch>
                    <Route exact path="/home">
                        <Home />
                    </Route>
                    <Route path="/home/users">
                        <UserList />
                    </Route>
                    <Route path="/home/user/:userId">
                        <User />
                    </Route>
                    <Route path="/home/newUser">
                        <NewUser />
                    </Route>
                    <Route path="/home/products">
                        <ProductList />
                    </Route>
                    <Route path="/home/product/:productId">
                        <Product />
                    </Route>
                    <Route path="/home/newproduct">
                        <NewProduct />
                    </Route>
                </Switch>
                </div>
            </Router> 
        </>
    );
}

export default Target;