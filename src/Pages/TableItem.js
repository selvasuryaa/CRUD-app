import React from "react"
import { Table, TableCell, TableHeaderCell, TableRow, TableHeader, TableBody } from "semantic-ui-react";
import "./Crud.css";

const TableItem = ({ users, onEdit, onDelete, setEditId }) => {
    return (
        <>
            {users !== [] ?
                users.map((user, index) => {
                    return (
                        <TableRow key={user.id}>
                            <Table.Cell width={1}>{user.id} </Table.Cell>
                            <Table.Cell width={2}>{user.name}</Table.Cell>
                            <Table.Cell width={2}>{user.email}</Table.Cell>
                            <Table.Cell width={2}>
                                <button onClick={
                                    () => {
                                        onEdit(user.id)
                                        setEditId(user.id)
                                    }
                                }>Edit</button>
                                <button style={{ backgroundColor: 'red', color: 'white' }}
                                    onClick={
                                        // () => deleteHandler(user.id)
                                        () =>
                                            onDelete(user.id)
                                    }>
                                    Delete
                                </button>
                            </Table.Cell>

                        </TableRow>
                    )
                }) : null}
         </>
    )
};

export default TableItem;
