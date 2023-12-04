// src/components/SearchBar.jsx
import {
    faBed,
    faCalendarDays,
    faCar,
    faPerson,
    faPlane,
    faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useState, useContext, useEffect} from 'react';
import { Box, TextField, Button } from '@mui/material';
import dayjs from 'dayjs';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import InputAdornment from '@mui/material/InputAdornment';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//import date-fns
import { format } from 'date-fns';
const SearchBar = ({ initialSearchParams, onSearch }) => {


    const today =  format(new Date(), 'yyyy-MM-dd');

    const tomorrow = format(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd');
    // console.log('SearchBar today:',today,' tomorrow:',tomorrow);

    var todayDate = new Date();
    var tomorrowDate = new Date().setDate(new Date().getDate() + 1);

    const [checkIn, setCheckIn] = useState(initialSearchParams.checkIn || today);
    const [checkOut, setCheckOut] = useState(initialSearchParams.checkOut || tomorrow);



    const [checkInDate, setCheckInDate] = useState(dayjs(  initialSearchParams.checkIn ||todayDate)); //dayjs(checkIn)
    const [checkOutDate, setCheckOutDate] = useState(dayjs(  initialSearchParams.checkOut || tomorrowDate)); //dayjs(checkOut)

    const changeCheckIn = (newValue) => {
        //show new date
        // console.log('changeCheckIn ',newValue);
        setCheckInDate(newValue);
        setCheckIn(newValue.format('YYYY-MM-DD') );

    }

    const changeCheckOut = (newValue) => {
        //show new date
        // console.log('changeCheckOut ',newValue);
        setCheckOutDate(newValue);
        setCheckOut(newValue.format('YYYY-MM-DD'));
    }

    const handleSubmit = (event) => {
        var startDate = checkInDate.format('YYYY-MM-DD');
        var endDate = checkOutDate.format('YYYY-MM-DD');
        // event.preventDefault();
        onSearch(  {checkIn:startDate, checkOut: endDate} );
    };

    useEffect(() => {
        // console.log('SearchBar useEffect checkIn:',checkIn);
        // console.log('SearchBar useEffect checkOut:',checkOut);
    }, [checkIn, checkOut]);

    return (
        <div>




        <Box component="form"        noValidate sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Check-in"
                    value={checkInDate}
                    onChange={changeCheckIn}
                    required
                />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Check-out"
                    value={checkOutDate}
                    onChange={changeCheckOut}
                    required
                />
            </LocalizationProvider>


            <Button   variant="contained" sx={{ ml: 2 }} onClick={handleSubmit}         >
                Search
            </Button>
        </Box>
        </div>
    );
};

export default SearchBar;
