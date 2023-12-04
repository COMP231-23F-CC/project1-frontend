// src/components/BookingCard.jsx

import React from 'react';
import { Card, CardContent, Typography, TextField, Grid } from '@mui/material';

const BookingCard = ({ booking, onGuestInfoChange }) => {
    return (
        <Card variant="outlined">
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Booking Details</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Room Number:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>{booking.number}</Typography>
                    </Grid>
                    {/* Repeat for other details */}
                    <Grid item xs={6}>
                        <Typography>Room Type:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>{booking.type}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Description:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>{booking.desc}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Total Price:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>{booking.totalPrice}</Typography>
                    </Grid>



                    <Grid item xs={6}>
                        <Typography>Check In Date  :</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>{booking.checkIn}</Typography>
                    </Grid>


                    <Grid item xs={6}>
                        <Typography>Check Out Date  :</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>{booking.checkOut}</Typography>
                    </Grid>


                    <Grid item xs={6}>
                        <Typography>Guest Name:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={booking.guestName}
                            onChange={(e) => onGuestInfoChange('guestName', e.target.value)}
                            size="small"
                        />
                    </Grid>


                    <Grid item xs={6}>
                        <Typography>Guest Phone:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={booking.guestPhone}
                            onChange={(e) => onGuestInfoChange('guestPhone', e.target.value)}
                            size="small"
                        />
                    </Grid>


                    <Grid item xs={6}>
                        <Typography>Guest Remarks:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={booking.remark}
                            onChange={(e) => onGuestInfoChange('remark', e.target.value)}
                            size="small"
                        />
                    </Grid>


                </Grid>
            </CardContent>
        </Card>
    );
};

export default BookingCard;
