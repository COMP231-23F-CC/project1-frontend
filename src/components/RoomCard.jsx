// src/components/RoomCard.jsx
import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';

const RoomCard = ({ room,onBook }) => {
    return (
        <Card>
            {/*<CardMedia*/}
            {/*    component="img"*/}
            {/*    height="140"*/}
            {/*    image={room.imageUrl || "https://via.placeholder.com/400"} // 使用占位图片或随机图片*/}
            {/*    alt={room.name}*/}
            {/*/>*/}
            <img src='https://a0.muscache.com/im/pictures/miso/Hosting-724452913208248575/original/285def3a-6a94-4405-9606-be41e4868391.jpeg?im_w=1200'  width={400} height={300} />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                   #{room.number}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {room.desc}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">View Details</Button>
                <Button size="small" onClick={() => onBook(room)}>Book Now</Button>
            </CardActions>
        </Card>
    );
};

export default RoomCard;
