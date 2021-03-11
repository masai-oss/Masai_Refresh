import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

export const Row = ({item, handleDelete, topic= item.topic}) => {
    return (
        <TableRow>
            <TableCell>{item._id}</TableCell>
            <TableCell>{topic}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell><Button>Edit</Button></TableCell>
            <TableCell><Button onClick={ () => handleDelete( item._id, topic ) }>Delete</Button></TableCell>
        </TableRow>
    )
}
