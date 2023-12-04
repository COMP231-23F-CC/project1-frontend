// src/pages/UserProfilePage.jsx

import React, { useState, useEffect } from 'react';
import UserProfileComponent from '../components/UserProfileComponent';
import httpClient from '../api/httpClient';
import {useNavigate} from "react-router-dom";
import { useLocation } from 'react-router-dom';

const UserProfilePage = ( props ) => {
    //get argument from the previous page
    //location.state.user
    // const location =  useLocation();
    // console.log('location:', location)

    const [user, setUser] = useState( );
    const [error, setError] = useState('');
    const  navigate = useNavigate();
    const userData =   localStorage.getItem('user');

    if(!userData)
    {
        navigate('/login');
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {

                const userData =   localStorage.getItem('user');
                console.log('userData:', userData)
                if(userData)
                {
                    var loginUser= JSON.parse(userData);
                    setUser(loginUser);
                    return;
                }
                else {
                    navigate('/login');
                    window.location.reload();
                }
            } catch (err) {
                setError(err.message);
            }
        };
        fetchUser();
    }, []);

    return (
        <div>

            <UserProfileComponent user={user} />

            {/*Logout*/}
            <button onClick={() => {
                localStorage.removeItem('user');
                navigate('/login');
                window.location.reload();
            }}>Logout</button>

            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default UserProfilePage;
