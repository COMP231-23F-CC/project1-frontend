// src/components/OrdersTableComponent.jsx

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';

const OrdersTableComponent = ({ orders, onGuestInfoChange }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Room Number</TableCell>
                        <TableCell>Room Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Guest Name</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order, index) => (
                        <TableRow key={order.id}>
                            <TableCell>{order.roomNumber}</TableCell>
                            <TableCell>{order.roomName}</TableCell>
                            <TableCell>{order.description}</TableCell>
                            <TableCell>
                                <TextField
                                    value={order.guestName}
                                    onChange={(e) => onGuestInfoChange(index, 'guestName', e.target.value)}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    value={order.phone}
                                    onChange={(e) => onGuestInfoChange(index, 'phone', e.target.value)}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>{order.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrdersTableComponent;
