// src/components/NavBar.jsx

import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const userData =   localStorage.getItem('user');
    const [user, setUser] = useState( );


    useEffect(() => {
        if (userData) {
            var loginUser= JSON.parse(userData);
            setUser(loginUser);
        }

    }, [userData]);


    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                        CCBnb
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/roomlist">Rooms</Button>

                    <Button color="inherit" component={Link} to="/myorders">My Orders</Button>
                    <Button color="inherit" component={Link} to="/contact">Contact</Button>
                    <Button color="inherit" component={Link} to="/about">About</Button>
                    {/*{ userData && <Button color="inherit" component={Link} to="/profile">profile</Button>}*/}
                    { !userData &&  <Button color="inherit" component={Link} to="/login">Login</Button>}
                    { userData &&  <Button color="inherit" component={Link} to="/profile">profile</Button>}


                    {/*<Button color="inherit" component={Link} to="/login">Login</Button>*/}
                    {/* <Button color="inherit" component={Link} to="/profile">Profile   </Button>*/}


                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;
