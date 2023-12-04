// src/pages/RoomListPage.jsx
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import RoomCard from '../components/RoomCard';
import api from '../api/httpClient.js';
import {useSearchParams} from "react-router-dom";
import SearchBar from "../components/SearchBar";
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import dayjs from 'dayjs';

const RoomListPage = () => {

    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const checkIn = searchParams.get('checkIn');
    // const checkOut = searchParams.get('checkOut');

    // checkIn: new Date(), // Or any other default or state-driven values
    //     checkOut: new Date().setDate(new Date().getDate() + 1),

    //today and tomorrow string
    const today = dayjs().format('YYYY-MM-DD');
    const tomorrow = dayjs().add(2, 'day').format('YYYY-MM-DD');

    const [checkIn, setCheckIn] = useState(today );
    const [checkOut, setCheckOut] = useState( tomorrow);


    //filter
    const [filter, setFilter] = useState({ checkIn, checkOut });

    const fetchRooms = async ( ) => {
        try {
            const res = await api.get('/room');
            //show the data
            console.log('fetchRooms res.data:', res.data);


            setRooms(res.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
          fetchRooms( );
    }, [ ]);



    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;


    //search room


    const handleSearch = (filter) => {
        console.log(`handleSearch  : `, filter);
        // Update the URL with the new search parameters
        let startDateString = dayjs(filter.checkIn).format('YYYY-MM-DD');
        let endDateString = dayjs(filter.checkOut).format('YYYY-MM-DD');
        setFilter(filter);
        setCheckIn(startDateString);
        setCheckOut(endDateString);

        fetchRooms();
    };

    const handleBooking = (room) => {
        console.log(`Booking room:  `, room);
        // 这里可以实现跳转到预订页面的逻辑，或者打开预订对话框等

        // navigate(`/booking/new?roomId=${room.id}&checkIn=${checkIn}&checkOut=${checkOut}`);
        let startDateString =  filter.checkIn
        let endDateString = filter.checkOut

        //print the data
        console.log('handleBooking filter:', filter);
        console.log('endDateString:', filter.checkOut );

        navigate('/booking/new', { state: {roomId: room.id,  checkIn:startDateString, checkOut:endDateString} });
    };









    return (
        <Container>
            <Box sx={{ flexGrow: 1 }}>
                {/* Header with Hotel Name */}
                <Box sx={{ my: 4, textAlign: 'center' }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        Cachet Crossing at Blue Mountains, Ontario
                    </Typography>
                </Box>

                {/* Hotel Description and Details */}
                <Box sx={{ my: 4, mx: 2 }}>
                    <Typography variant="h5" gutterBottom>
                        Your Perfect Mountain Retreat
                    </Typography>
                    <Typography variant="body1" gutterBottom>

                    </Typography>
                </Box>
            {/*<SearchBar initialSearchParams={{ checkIn, checkOut }} onSearch={handleSearch} />*/}
            <SearchBar
                initialSearchParams={ filter}
                onSearch={handleSearch}
            />

            <Typography variant="h4" gutterBottom>Available Rooms</Typography>
            <Grid container spacing={4}>
                {rooms.map(room => (
                    <Grid item key={room.id} xs={12} sm={6} md={4}>
                        <RoomCard room={room} onBook={handleBooking} />
                    </Grid>
                ))}
            </Grid>
                </Box>
        </Container>
    );
};

export default RoomListPage;
