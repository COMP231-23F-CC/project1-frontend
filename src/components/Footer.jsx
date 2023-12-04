import React from 'react';
import { AppBar, Toolbar, Typography, Box, TextField, Button, Card, CardContent } from '@mui/material';

const Footer = () => {
    return (
        <div>



            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    © 2023 ShuJin |    123 Mountain Drive, Blue Mountains, Ontario | +1 555 123 4567 | sjin32@my.centennialcollege.ca
                </Typography>
            </Box>
        </div>
    );
};

export default Footer;
