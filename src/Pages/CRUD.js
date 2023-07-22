import React, { useEffect, useState } from "react"
import axios from 'axios';
import "./Crud.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CRUD = () => {
    // const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [editId, setEditId] = useState(null)
    // const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(res => {
                setUsers(res.data)
                // setLoading(prev => !prev)
                setEditId(res.data.id)
                // toast('Data Retrived')
            })
            .catch(err => console.log('ERROR GET', err));
    }, [])


    const addHandler = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post(`https://jsonplaceholder.typicode.com/users`, {
                // id,
                name: name,
                email: email,
            })
            if (response.status == 201) {
                console.log('POST RESPONSE', response.data)
                setUsers(prev => [response.data, ...prev])
                setName('')
                setEmail('')
                // toast(`${response.data['name']} added`)
            }
        }
        catch (err) {
            console.log('ERROR', err)
        }
    }
    const deleteHandler = async (id) => {
        try {
            let selected = users.find(item => item.id == id)
            console.log('SELECTED ITEM TO DELETE', selected)
            let response = await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
            if (response.status == 200) {
                console.log('RESPONSE', response.data)
                setUsers(users.filter(user => user.id !== id))
                toast(`${selected.name} Deleted`)
            }
        }
        catch (err) {
            console.log('ERROR', err)
        }
    }
    const editHandler = (id) => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => {
                setName(users[id - 1].name)
                setEmail(users[id - 1].email)
                setEditId(users[id - 1].id)
                console.log(users[id - 1])
            })
            .catch(err => console.log(err))
    }

    const handleDataUpdate = () => {

        axios.put(`https://jsonplaceholder.typicode.com/users/${editId}`, {
            name: name,
            email: email,
            // editId: editId
        })
            .then((res) => {

                if (res.status == 200) {
                    console.log('put req res', res.data);
                    console.log(name, email)
                    setUsers(prev => [res.data, ...prev])
                    setName('')
                    setEmail('')
                }
            })
            .catch(err => console.log('put req error', err))
    }
    // setUsers([...users.filter(element => element.id == editId-1 ? res.data : element)])
    //     // setUsers(res.data)
    //     //     setUsers(
    //     //         users.map((user) =>
    //     //             user.id === editId - 1 ? res.data : user
    //     //         )
    //     //     );
    //     // })

    // }

    // if (loading) {
    //     return (
    //         <div style={{ height: '100vh', color: 'brown', verticalAlign: 'center', fontWeight: 'bold', fontSize: '30px', display: 'grid', placeContent: 'center' }}>Loading...</div>)
    // }
    return (
        <div className="crud">

            <ToastContainer />
            {/* <span >{loading}</span> */}

            <div>
                <div>
                    <h2>Add User</h2>
                    <input
                        style={{ width: '250px', marginRight: "15px", height: '30px', outline: 'none', border: '1px solid black', padding: '15px 10px', fontSize: '17px' }}
                        name='name'
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <input style={{ width: '250px', marginRight: "15px", height: '30px', outline: 'none', border: '1px solid black', padding: '10px 15px', fontSize: '17px' }}
                        name='email'
                        type="text"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <button onClick={addHandler}>Submit</button>
                    <button onClick={handleDataUpdate} >Update</button>

                </div>
            </div>

            {users !== [] ?
                users.map((user, index) =>
                    <ul className="list" key={index} >
                        <li className="list-item" >
                            <span>
                                {user.name}
                            </span>
                            {user.email}

                        </li>
                        <div className="btn-grp">
                            <button onClick={() => {
                                editHandler(user.id)
                                // setEditId(user.id)
                            }
                            }>Edit</button>
                            <button
                                onClick={() => deleteHandler(user.id)}>
                                Delete
                            </button>
                        </div>
                    </ul>

                ) : null
            }
        </div>
    )
};

export default CRUD;
