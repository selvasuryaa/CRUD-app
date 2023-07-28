import React from "react"
import './Crud.css'

const AddUser = ({
  userName,
  formError,
  email,
  onSubmit,
  onUpdate,
  showSubmit,
  showUpdate,
  setName,
  setEmail 

}) => {
  return (
    <div style={{height:'170px'}}>
      <h2 style={{ marginTop: '10px', marginBottom:'10px' }}>Add User</h2>
      <div className="input-flex">
        <div className="form-grp">
          <input
            style={{ width: '250px', marginRight: "15px", height: '40px', outline: 'none', border: '1px solid black', padding: '15px 10px', fontSize: '18px', fontWeight: 'bold' }}
            name='name'
            type="text"
            placeholder="Enter name"
            value={userName}
            onChange={(e) => setName(e.target.value)} />
          {formError.name && <p style={{ color: 'red' }}>{formError.name}</p>}
        </div>
        <div className="form-grp">
          <input style={{ width: '250px', marginRight: "15px", height: '40px', outline: 'none', border: '1px solid black', padding: '15px 10px', fontSize: '18px', fontWeight: 'bold' }}
            name='email'
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          {formError.email && <p style={{ color: 'red', height: '100%' }} >{formError.email}</p>}

        </div>
        {showSubmit ? <button onClick={onSubmit}>Submit</button> : null}
        {showUpdate ?
          <button style={{ backgroundColor: 'green', color: 'black', outline: 'none', border: '1px solid black', preset: '10px' }}
            onClick={onUpdate} >Update</button>
          : null}

      </div>
    </div>
  )
};

export default AddUser;
