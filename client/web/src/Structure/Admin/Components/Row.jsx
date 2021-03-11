import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';

export const Row = ({item, handleDelete}) => {
    return (
        <TableRow>
            <TableCell>{item._id}</TableCell>
            <TableCell>{item.topic}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell><Button>Edit</Button></TableCell>
            <TableCell><Button onClick={ () => handleDelete( item._id, item.topic ) }>Delete</Button></TableCell>
        </TableRow>
    )
}
