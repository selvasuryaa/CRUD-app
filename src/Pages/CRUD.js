import axios from 'axios';
import React, { useEffect, useState } from "react"
import "./Crud.css";
import AddUser from "./AddUser";
import 'react-toastify/dist/ReactToastify.css';
import { Flip, ToastContainer, toast } from 'react-toastify';
import UserTable from './UserTable';

// "https://64bd1df32320b36433c76e5a.mockapi.io/accounts"

const CRUD = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [editId, setEditId] = useState(null)
    const [showUpdate, setShowUpdate] = useState(false)
    const [showSubmit, setShowSubmit] = useState(true)
    const [formError, setFormError] = useState({
        name: '',
        email: ''
    })

    useEffect(() => {
        getAllUsers();
    }, [])
    const getAllUsers = async () => {
        try {
            let res = await axios.get("https://64bd1df32320b36433c76e5a.mockapi.io/accounts")
            setUsers(res.data)
            setLoading(false)
        }
        catch (err) {
            console.log('ERROR GET', err);
        }
    }
    // const validate = () => {

    //     if (name == "") {
    //         toast.error('Name reqired')
    //         return
    //     }
    //     if (email == '') {
    //         toast.error('Email reqired')
    //         return
    //     }
    //     else {
    //         let emailcheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    //         if (!emailcheck.test(email)) {
    //             toast.error('Not a valid Email')
    //             return
    //         }
    //     }
    //     return true
    // }
    const nameValidate = (name) => {
        return name ? "" : 'Name Required'

    }
    const emailValidate = (email) => {

        let emailcheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (!emailcheck.test(email)) {
            return 'Not a valid Email address'
        }
        return email ? "" : 'Email Required'
    }

    const addHandler = async (e) => {
        e.preventDefault();

        let nameError = nameValidate(name);
        let emailError = emailValidate(email);

        setFormError({
            name: nameError,
            email: emailError
        })

        const isValid = !nameError && !emailError
        if (isValid)
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
        setShowSubmit(false)
        setShowUpdate(true)
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
                setShowUpdate(false)
                setShowSubmit(true)

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
                delay={1000}
                pauseOnHover={false}
                transition={Flip}
                theme="dark"
            />
            <AddUser
                setEmail={setEmail}
                setName={setName}
                formError={formError}
                email={email}
                userName={name}
                onSubmit={addHandler}
                onUpdate ={handleDataUpdate}
                showSubmit={showSubmit}
                showUpdate={showUpdate}
                 />
            
            <UserTable
             users={users}
             onEdit ={editHandler}
             onDelete = {deleteHandler}
             editId={editId}
             setEditId={setEditId}
            />

        </div>
    )
}
export default CRUD;


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
