import React from 'react';
import {BrowserRouter as Router,Link} from "react-router-dom";
import notFoundImage from '../assets/404.jpg'


export default function NotMatch() {
  return (
    <>
    <div className="notMatchContainer" >
        <img alt="notFoundImage" src={notFoundImage} />
        <h1> Error 404 </h1>
        <h2> هذه الصفحة غير متوفرة </h2>   
        <Link to="/" className="backButton" >العودة للصفحة الرئيسية</Link>    
        
    </div>
    
    </>
  );
}