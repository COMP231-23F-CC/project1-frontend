import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import api from '../api/httpClient';
import dayjs from "dayjs";


const BookingTable = () => {
    const [bookings, setBookings] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await api.get('/Booking');
            //show the data
            console.log('fetchBookings response.data:', response.data);

            setBookings(response.data);

        } catch (err) {
            console.error('Error fetching bookings:', err);
        }
    };

    const handleClickOpen = (id) => {
        setOpen(true);
        setSelectedId(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const confirmDelete = () => {
        deleteBooking(selectedId);
    };

    const deleteBooking = async (id) => {
        try {
            await api.delete(`/Booking/${id}`);
            fetchBookings();
            handleClose();
        } catch (err) {
            console.error('Error deleting booking:', err);
        }
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="booking table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>


                            <TableCell align="right">Check In </TableCell>
                            <TableCell align="right">Check Out </TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Room Number</TableCell>
                            <TableCell align="right">Room Type</TableCell>
                            <TableCell align="right">Total Price</TableCell>
                            <TableCell align="right">Guest Name</TableCell>
                            <TableCell align="right">Guest Phone</TableCell>
                            <TableCell align="right">Remark</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings.map((booking) => (
                            <TableRow key={booking.id}>
                                <TableCell component="th" scope="row">
                                    {booking.id}
                                </TableCell>


                                <TableCell align="right">{dayjs(booking.startDate).format('YYYY-MM-DD')}</TableCell>
                                <TableCell align="right">{dayjs(booking.endDate).format('YYYY-MM-DD')}</TableCell>
                                <TableCell align="right">{booking.status}</TableCell>
                                <TableCell align="right">{booking.room.number}</TableCell>
                                <TableCell align="right">{booking.room.type}</TableCell>
                                <TableCell align="right">{booking.totalPrice}</TableCell>
                                <TableCell align="right">{booking.guestName}</TableCell>
                                <TableCell align="right">{booking.guestPhone}</TableCell>

                                <TableCell align="right">{booking.remark}</TableCell>
                                <TableCell align="right">
                                    <Button variant="outlined" color="secondary" onClick={() => handleClickOpen(booking.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Confirmation Dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this booking?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="secondary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default BookingTable;
