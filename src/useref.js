import React, { useRef } from "react";

// import React from "react"


const UseRef = () => {

    const focusRef = useRef()

    const focusHandler = (e) =>{
        console.log(e)
        focusRef.current.focus()
    }

  return (
    <div>
        <input ref={focusRef} type="text"/>
        <button onClick={focusHandler}>Focus</button>
      
    </div>
  )
};

export default UseRef;


