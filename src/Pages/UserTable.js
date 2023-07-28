import React from "react"
import { Table, TableCell, TableHeaderCell, TableRow, TableHeader, TableBody } from "semantic-ui-react";
import TableItem from "./TableItem";
import "./Crud.css";



const UserTable = ({
    users,
    onEdit,
    onDelete,
    // editId,
    setEditId }) => {
    return (
        <div>
            {users.length == 0 ? <h2 style={{ float: 'left', marginLeft: '30px' }}>No Users</h2> :
                <Table className="ui celled green" padded={false} collapsing={true} color='orange' sortable textAlign="center" style={{ margin: '150px 90px', fontSize: '15px', fontWeight: 'bold' }}>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell sorted='descending'>ID</TableHeaderCell>
                            <TableHeaderCell sorted='descending'>Name</TableHeaderCell>
                            <TableHeaderCell sorted='descending'>Email</TableHeaderCell>
                            <TableHeaderCell sorted='descending'>Actions</TableHeaderCell>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableItem users={users} onEdit={onEdit} onDelete={onDelete} setEditId={setEditId} />
                    </TableBody>
                </Table>
            }
        </div>
    )
};

export default UserTable;
