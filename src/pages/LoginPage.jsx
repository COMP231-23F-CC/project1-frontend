// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import LoginComponent from '../components/LoginComponent';
import api  from '../api/httpClient';
import { toast } from 'react-toastify';

import {useNavigate} from "react-router-dom";
import UserProfileComponent  from "../components/UserProfileComponent.jsx";

const LoginPage = ({ onLoginSuccess }) => {
    const [error, setError] = useState('');

    //check if the user has logged in,then redirect to profile page

    const navigate = useNavigate();
    const user = localStorage.getItem('user');
    console.log('local user:', user)
    if(user)
    {
        navigate('/profile');
    }

    const handleLogin = async (username, password) => {
        setError("");
        try {

            let credentials = {email: username, password: password};

            // const res = await api.post('/user/login', credentials);

            const res = await api.get('/user/1' );

            // console.log('handleLogin res:', res);
            const userData = res.data;

            // 存储用户信息到 LocalStorage
            localStorage.setItem('user', JSON.stringify(userData));

            //goto ProfilePage and transfer user data
            navigate('/profile', {state: {user: userData}});
            //refresh the page
            window.location.reload();
            // toast.success(`Login success, welcome ${res.data.name}`);


            // onLoginSuccess(res.data); // 假设这会返回用户信息
        } catch (err) {
            setError(err.message);
            // 显示错误消息
            // toast.error(`Login failed: ${err.message}`, {
            //     position: "top-center",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            // });

        }
    };




    return (
        <div>
            <LoginComponent onLogin={handleLogin} />





            {/*红色的错误提示*/}
            {error && <div style={{ color: 'red' }}>{error}</div>}

        </div>
    );
};

export default LoginPage;
