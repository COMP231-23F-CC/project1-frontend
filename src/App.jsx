import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes
} from "react-router-dom";

import './App.css';
//


import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import axios from "axios";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './pages/HomePage';
import RoomDetailsPage from './pages/RoomDetailsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NavBar from './components/NavBar';
import SearchBar     from "./components/SearchBar.jsx";
import OrdersListPage from './pages/OrdersListPage.jsx';
import RoomListPage      from "./pages/RoomListPage.jsx";
import Footer from './components/Footer';


import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import BookingPage from './pages/BookingPage';

const theme = createTheme({
    palette: {
        // 定义主色，决定按钮、链接等控件的颜色
        primary: {
            main: '#556cd6', // 一个淡雅的蓝色
        },
        // 次要颜色，用于浮动操作按钮和强调控件
        secondary: {
            main: '#19857b', // 一个鲜艳的青色
        },
        // 错误颜色，用于表达危险或错误的控件和信息
        error: {
            main: '#ff5252', // 明亮的红色
        },
        // 背景颜色
        // background: {
        //     default: '#f5f5f5', // 一个很浅的灰色，可以减轻眼睛的负担
        // },
    },
    typography: {
        // 定义默认字体系列
        fontFamily: [
            'Roboto', // Material Design 默认字体
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        // 定义特定的文字样式
        h1: {
            fontSize: '2rem',
            fontWeight: 400,
            color: '#444', // 暗灰色的文字，对大多数背景都足够醒目
        },
        // ...更多文字样式
    },
    // 间距可以用来保持设计间的一致性和空间比例关系
    spacing: 8, // 采用 Material Design 推荐的 8px 间距系统
    // ... 其他可能的自定义选项
});

//check if the user is logged in
//if not redirect to login page


//
function App() {

    //error message
    const [error, setError] = useState('');
    const handleLoginSuccess = (user) => {
        toast.success(`Login success, welcome ${user.username}`);

    }
    return (

        <ThemeProvider theme={theme}>
            {/* CssBaseline 帮助全局重置样式，确保一致性 */}
            <CssBaseline/>
            <Router>
                <NavBar />

                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/rooms/:id" element={<RoomDetailsPage />} />
                        <Route path="/roomlist" element={<RoomListPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />

                        <Route path="/myorders" element={<OrdersListPage />} />


                        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
                        <Route path="/profile" element={<UserProfilePage />} />

                        <Route path="/booking/new" element={<BookingPage />} />

                    </Routes>

                <Footer/>

            </Router>
            <ToastContainer/>

        </ThemeProvider>
    );

}
//
export default App;
