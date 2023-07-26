import React, { useEffect, useState } from "react"
import axios from 'axios';
import "./Crud.css";
import { Bounce, Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableCell, TableHeaderCell, TableRow, TableHeader, TableBody } from "semantic-ui-react";

// "https://64bd1df32320b36433c76e5a.mockapi.io/accounts"

const CRUD = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [editId, setEditId] = useState(null)
    const [show, setShow] = useState(false)
    const [showSubmit, setShowSubmit] = useState(true)




    // const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        getAllUsers();
    }, [])
    const getAllUsers = async () => {
        try {
            let res = await axios.get("https://64bd1df32320b36433c76e5a.mockapi.io/accounts")
            setUsers(res.data)
            setLoading(false)
            // setEditId(res.data.id)
            // toast.info('Data Retrived')
        }
        catch (err) {
            console.log('ERROR GET', err);
        }
    }
    const validate = () => {

        if (name == "") {
            toast.error('Name reqired')
            return
        }
        if (email == '') {
            toast.error('Email reqired')
            return
        }
        else {
            let emailcheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            if (!emailcheck.test(email)) {
                toast.error('Not a valid Email')
                return
            }
        }
        return true 
    }

    const addHandler = async (e) => {
        e.preventDefault();
        let isValid = validate()
        if(isValid)

        // if (isValid == false){
        // toast.error("Invalid Form")
        // return

        try {
            let response = await axios.post(`https://64bd1df32320b36433c76e5a.mockapi.io/accounts/`, {
                // id,
                name: name,
                email: email,
            })
            if (response.status == 201) {
                console.log('POST RESPONSE', response.data)
                setUsers(prev => [...prev, response.data])
                setName('')
                setEmail('')
                toast.success(`${response.data['name']} added`)
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
            let response = await axios.delete(`https://64bd1df32320b36433c76e5a.mockapi.io/accounts/${id}`)
            if (response.status == 200) {
                console.log('RESPONSE', response.data)
                setUsers(users.filter(user => user.id !== id))
                toast.success(`${selected.name} Deleted`)
            }
        }
        catch (err) {
            console.log('ERROR', err)
        }
    }
    const editHandler = (id) => {
        setShow(true)
        setShowSubmit(false)
        axios.get(`https://64bd1df32320b36433c76e5a.mockapi.io/accounts/${id}`)
            .then(res => {
                if (res) {
                    setName(res.data.name)
                    setEmail(res.data.email)
                    setEditId(id)
                    toast.info('Single User Fetched')

                    // setEditId(users[id - 1].id)
                    // setName(users[id - 1].name)
                    // setEmail(users[id - 1].email)
                    // console.log(users[id - 1])
                }
            })
            .catch(err => console.log(err))
    }

    const handleDataUpdate = () => {
        let selected = users.find(item => item.id == editId)
        console.log('SELECTED ITEM TO Edit', selected)
        if (name == "") {
            toast.error('Name reqired')
            return
        }
        if (email == '') {
            toast.error('Email reqired')
            return
        }
        else {
            let emailcheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            if (!emailcheck.test(email)) {
                toast.error('Not a valid Email')
                return
            }
        }
        

        axios.put(`https://64bd1df32320b36433c76e5a.mockapi.io/accounts/${editId}`, {
            name: name,
            email: email,
        })
            .then((res) => {
                if (res.status == 200)
                    // return
                    console.log('put req res', res.data);
                toast.success(`${selected.name} Updated to ${res.data.name}`)
                getAllUsers();
                setName('')
                setEmail('')
                setShow(false)
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

    if (loading) {
        return (
            <div style={{ height: '100vh', color: 'brown', verticalAlign: 'center', fontWeight: 'bold', fontSize: '30px', display: 'grid', placeContent: 'center' }}>Loading...</div>)
    }


    return (
        <div className="crud">
            <span >{loading}</span>
            <ToastContainer
                // autoClose
                delay={2000}
                pauseOnHover={false}
                // draggablePercent={50}
                transition={Flip}
                theme="dark"
            />
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
                    {showSubmit ? <button onClick={addHandler}>Submit</button> : null}
                    {show ?
                        <button style={{ backgroundColor: 'yellow', color: 'black' }}
                            onClick={handleDataUpdate} >Update</button>
                        : null}

                </div>
            </div>

            <Table className="ui celled green large" padded={false} collapsing={true} color='orange' sortable textAlign="center" style={{ margin: '20px' }}>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell sorted='descending'>ID</TableHeaderCell>
                        <TableHeaderCell sorted='descending'>Name</TableHeaderCell>
                        <TableHeaderCell sorted='descending'>Email</TableHeaderCell>
                        <TableHeaderCell sorted='descending'>Actions</TableHeaderCell>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users !== [] ?
                        users.map((user, index) => {
                            return (
                                <TableRow key={user.id}>
                                    <Table.Cell width={1}>{user.id} </Table.Cell>
                                    <Table.Cell width={2}>{user.name}</Table.Cell>
                                    <Table.Cell width={2}>{user.email}</Table.Cell>
                                    <Table.Cell width={2}>
                                        <button onClick={() => {
                                            editHandler(user.id)
                                            setEditId(user.id)
                                        }
                                        }>Edit</button>
                                        <button style={{ backgroundColor: 'red', color: 'white' }}
                                            onClick={() => deleteHandler(user.id)}>
                                            Delete
                                        </button>
                                    </Table.Cell>

                                </TableRow>
                            )
                        }) : null}
                </TableBody>
            </Table>

        </div>
    )
}



{/* <ul className="list" key={index} >
                <li className="list-item" >
                    <span>
                        {user.name}
                    </span>
                    {user.email}

                </li>
                <div className="btn-grp">
                    <button onClick={() => {
                        editHandler(user.id)
                        setEditId(user.id)
                    }
                    }>Edit</button>
                    <button style={{ backgroundColor: 'red', color: 'white' }}
                        onClick={() => deleteHandler(user.id)}>
                        Delete
                    </button>
                </div>
            </ul> */}

{/* )
            : null */}

//         </div>
//     )
// }


export default CRUD;
