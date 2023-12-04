import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import api from '../api/httpClient';

const UserProfileComponent = ({ user }) => {



    const [editContact, setEditContact] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [contactInfo, setContactInfo] = useState({
        phoneNumber: user?.phoneNumber || ''
    });
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');

    const handleContactOpen = () => {
        setEditContact(true);
    };

    const handleContactClose = () => {
        setEditContact(false);
    };

    const handlePasswordOpen = () => {
        setEditPassword(true);
    };

    const handlePasswordClose = () => {
        setEditPassword(false);
    };

    const handleContactSubmit = async () => {
        const patchData = [
            {
                "operationType": 0,
                "path": "/phoneNumber",
                "op": "replace",
                "value": contactInfo.phoneNumber
            }
        ];
        //show the data
        console.log('handleContactSubmit patchData:', patchData);
        try {
            const response = await api.patch(`/User/${user.id}`, patchData);
            // Handle response, e.g., update local user state or show success message
            user.phoneNumber= contactInfo.phoneNumber;
            //show response data
            console.log('handleContactSubmit response.data:', response.data);

            //save user to localstorage
            localStorage.setItem('user', JSON.stringify(response.data));

            handleContactClose();

            alert ('Phone number updated successfully.');
        } catch (err) {
            setError(err.message);
        }
    };

    const handlePasswordSubmit = async () => {
        if (newPassword !== confirmNewPassword) {
            setError('Passwords do not match.');
            return;
        }

        const putData = {
            "id": user.id,
            "name": user.name,         // 假设我们不更改名字，只需传回原值
            "email": user.email,       // 同上
            "phoneNumber": user.phoneNumber, // 同上
            "password": newPassword    // 新密码
        };

        //show the data
        console.log('handlePasswordSubmit putData:', putData);

        try {
            const response = await api.put(`/User/${user.id}`, putData);
            // Handle response, e.g., update local user state or show success message
            //show response data
            console.log('handlePasswordSubmit response.data:', response.data);
            handlePasswordClose();
            alert('Password changed successfully.');
        } catch (err) {
            setError(err.message);
        }
    };


    if (!user) return <Typography>No user data</Typography>;

    return (
        <Box sx={{ maxWidth: 500, mx: "auto", mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
            {error && <Typography color="error">{error}</Typography>}
            <Typography variant="h5" gutterBottom component="div">
                User Profile
            </Typography>
            <Typography variant="subtitle1">{`Name: ${user.name}`}</Typography>
            <Typography variant="subtitle1">{`Email: ${user.email}`}</Typography>
            <Typography variant="subtitle1" gutterBottom>{`Phone: ${user.phoneNumber}`}</Typography>

            <Button variant="outlined" color="primary" onClick={handleContactOpen} sx={{ mr: 2 }}>
                Update Phone Number (PATCH)
            </Button>
            <Button variant="outlined" color="secondary" onClick={handlePasswordOpen}>
                Change Password (PUT)
            </Button>

            {/* Contact Info Dialog */}
            <Dialog open={editContact} onClose={handleContactClose}>
                <DialogTitle>Update Contact Information</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phone"
                        label="Phone Number"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={contactInfo.phoneNumber}
                        onChange={(e) => setContactInfo({ ...contactInfo, phoneNumber: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleContactClose}>Cancel</Button>
                    <Button onClick={handleContactSubmit}>Update</Button>
                </DialogActions>
            </Dialog>

            {/* Password Dialog */}
            <Dialog open={editPassword} onClose={handlePasswordClose}>
                <DialogTitle>Change Password</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="new-password"
                        label="New Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="confirm-new-password"
                        label="Confirm New Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        error={newPassword !== confirmNewPassword}
                        helperText={newPassword !== confirmNewPassword ? "Passwords do not match." : ""}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePasswordClose}>Cancel</Button>
                    <Button onClick={handlePasswordSubmit} disabled={newPassword !== confirmNewPassword}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserProfileComponent;
