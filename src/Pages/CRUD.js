import React,{useEffect, useState} from "react"
import axios from 'axios';

const CRUD = () => {

useEffect(()=>{
    const userData = axios.get("https://jsonplaceholder.typicode.com/users")
    console.log(userData)

},[])    
    
  return (
    <div>
      
    </div>
  )
};

export default CRUD;
