import React, { useState } from "react"

const AddUser = ({ onAdd, userData }) => {

  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })

  // const nameRef = useRef();
  // const emailRef = useRef();

  // getUserData

  // onUpdate()

  // const handleUpdate = () =>{
  //   onUpdate()
  // }

  const addUserInputHandler = (e) => {
    console.log(formData)
    onAdd(formData);
    formData.name = ''
    formData.email = ''
  }
  onUpdate(formData.name = userData.name,
    formData.email = userData.email)
  // const update = ( {userData}) =>{

  // }

  console.log(userData.name)
  
  console.log(formData)

  // }
  console.log(formData)
  return (
   
  )
};

export default AddUser;
