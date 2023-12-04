// src/pages/SomePage.jsx

import React, {useEffect, useState} from 'react';

import {useNavigate, useLocation, useSearchParams} from 'react-router-dom';
import api from '../api/httpClient.js';


import BookingComponent from '../components/BookingComponent.jsx';
import dayjs from "dayjs";
const BookingPage =   () => {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);






    const location = useLocation();
    //show the data
    console.log('BookingPage location.state:', location.state);
    //
    const roomId = location.state?.roomId;
    const checkIn = location.state?.checkIn;
    const checkOut = location.state?.checkOut;

    const option = {
        roomId,
        checkIn,
        checkOut
    }


    const [booking, setBooking] = useState({ });



    //get roomdata by roomId
    const fetchBookingData = async ( ) => {
        try {

            //get user from localstorage
            const userData =   localStorage.getItem('user');
            console.log('userData:', userData)

            const userDataJson = JSON.parse(userData);
               if(!userData)
                {
                     navigate('/login');
                }


            const res = await api.get('/room/'+roomId);
            //show the data
            console.log('getRoom res.data:', res.data);
            var roomData = res.data;

            //days count
            const days = dayjs(checkOut).diff(dayjs(checkIn), 'day');
            //total price
            const totalPrice = days * roomData.price;

           var bookingData= {
                ...roomData,
                ...option,
               userId:userDataJson.id,
               totalPrice:totalPrice,
               guestName:userDataJson.name,
                guestPhone  :userDataJson.phoneNumber,
               remark:''
            }
            console.log('bookingData:', bookingData);

            //set room data
            setBooking(bookingData);
        } catch (err) {
           setError(err.message);
        } finally {
            setLoading(false);
        }
    }



    const handleGuestInfoChange = (field, value) => {
        setBooking({...booking, [field]: value});
    };


    const handleConfirmBooking = () => {

        var apiData=
            {   "id": 0,
            "userId": 1,
            "roomId": 3,
            "startDate": "2023-12-04",
            "endDate": "2023-12-07",
            "guestName": "string",
            "guestPhone": "string",
            "totalPrice": 0,
            "status": "string",
            "remark": "string"
         }

//  "startDate": "2023-12-04T02:35:40.130Z",
//   "endDate": "2023-12-04T02:35:40.130Z",
        //date format processing

        booking.startDate =  booking.checkIn
        booking.endDate =  booking.checkOut

        //print booking data
        console.log('handleConfirmBooking booking:', booking);


        apiData.userId = booking.userId;
        apiData.roomId = booking.roomId;
        apiData.startDate = booking.checkIn;
        apiData.endDate = booking.checkOut;
        apiData.guestName = booking.guestName;
        apiData.guestPhone = booking.guestPhone;
        apiData.totalPrice = booking.totalPrice;
        apiData.status = 'new';
        apiData.remark = booking.remark;

        let dateStr = "2023-12-04";
        let date1 = new Date(booking.startDate);
        date1.setMinutes(date1.getMinutes() - date1.getTimezoneOffset());

        //date2
        let date2 = new Date(booking.endDate);
        date2.setMinutes(date2.getMinutes() - date2.getTimezoneOffset());


        let formattedDate1 = date1.toISOString();
        let formattedDate2 = date1.toISOString();

        // apiData.startDate = formattedDate1;
        // apiData.endDate = formattedDate2;

        console.log('handleConfirmBooking apiData:', apiData);


        //send booking data to backend
        const res = api.post('/booking', apiData).then((res) => {


                console.log('handleConfirmBooking res.data:', res.data);

                //goto my order list page


            }
        ).catch((err) => {
            console.log('handleConfirmBooking err:', err);
        });


        alert("Booking confirmed!");

        navigate('/myorders');
    };


    useEffect(() => {
        fetchBookingData( );
    }, [ ]);


    // if (loading) return <Typography>Loading...</Typography>;
    // if (error) return <Typography color="error">{error}</Typography>;

    return (
        <div>
            <BookingComponent booking={booking} onGuestInfoChange={handleGuestInfoChange}/>

            {/*confirm booking button*/}
            <button
                onClick={handleConfirmBooking}
            >Confirm Booking
            </button>


        </div>
    );
};

export default BookingPage;
