import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField, Typography, Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Loginuse } from '../Utils/Apis';

const Modal = () => {
    const [open, setOpen] = useState(false);  // Initially false, modal is closed

    useEffect(() => {
        const isModalShown = localStorage.getItem('modalShown');
        if (!isModalShown) {
            setOpen(true);  // Show modal if not previously shown
        }
    }, []);

    const handleClose = () => {
        setOpen(false);
        localStorage.setItem('modalShown', 'true');  // Set flag in localStorage
    };

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const formData = {
                name: data.name,
                email: data.email,
                phone: data.phone
            };
            const response = await Loginuse(formData);

            if (response.status === 201) {
                toast.success('Profile submitted successfully!');
                localStorage.setItem('osna_token', response?.data?.token);
                reset();
                handleClose();
            } else {
                toast.error('Failed to submit profile');
            }
        } catch (error) {
            toast.error('Error submitting profile');
        }
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography></Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Typography
                        sx={{
                            fontSize: '20px',
                            fontWeight: 600,
                            lineHeight: '28px',
                            textAlign: 'center',
                            color: "#191c1f",
                            mb: 3
                        }}
                    >
                        Profile Details
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '14px',
                            fontWeight: 400,
                            lineHeight: '20px',
                            textAlign: 'center',
                            color: "#5f6c72",
                            mb: 3
                        }}
                    >
                        Lorem Ipsum is simply dummy text of the printing and
                        <br />
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Full Name"
                            variant="outlined"
                            fullWidth
                            {...register('name', { required: 'Full Name is required' })}
                            error={!!errors.name}
                            helperText={errors.name ? errors.name.message : ''}
                        />

                        <TextField
                            label="Email Id"
                            variant="outlined"
                            fullWidth
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Enter a valid email',
                                },
                            })}
                            error={!!errors.email}
                            helperText={errors.email ? errors.email.message : ''}
                        />

                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            {...register('phone', {
                                required: 'Phone Number is required',
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'Enter a valid 10-digit phone number',
                                },
                            })}
                            error={!!errors.phone}
                            helperText={errors.phone ? errors.phone.message : ''}
                        />

                        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="warning"
                                sx={{ width: '100%', maxWidth: '200px', fontWeight: 'bold' }}
                            >
                                SUBMIT →
                            </Button>
                        </DialogActions>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Modal;
