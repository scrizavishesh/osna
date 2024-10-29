import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button, Grid, Divider } from '@mui/material';
import { useForm } from 'react-hook-form';
import { userSubmitOTP } from '../Utils/Apis';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const SubmitOTP = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || ''; // Email passed from previous screen

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [timer, setTimer] = useState(180); // 3 minutes in seconds
    const [canResend, setCanResend] = useState(false);

    // Function to handle form submission
    const onSubmit = async (data) => {
        const payload = {
            email: email,
            otp: data.otp,
            type: "login",
        };
        try {
            const response = await userSubmitOTP(payload);
            if (response.status === 200) {
                toast.success("OTP verified successfully");
                localStorage.setItem('osna_token', `Bearer ${response?.data?.token}`);
                window.location.reload();
                navigate("/");
                reset();
            } else {
                toast.error('OTP verification failed');
            }
        } catch (error) {
            console.error('API Error:', error);
            toast.error('Error during OTP submission');
            alert(error?.response?.data?.message)
        }
    };

    // Timer countdown effect
    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(countdown);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    // Handle Resend OTP click
    const handleResendOTP = () => {
        setTimer(180); // Reset timer to 3 minutes
        setCanResend(false);
        onSubmit();
        toast.success('OTP resent successfully');
    };

    return (
        <>
            <Container sx={{ mt: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid container justifyContent="center" alignItems="center" spacing={2}>
                    <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box>
                            <img src="/Character.svg" alt="Sign-in Icon" width="250" />
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FA8232', mb: 2 }}>
                                OTP Verification
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#6B6B6B', mb: 3 }}>
                                Please enter the verification code sent
                                <br />
                                to your Email ({email})
                            </Typography>

                            <Box sx={{ backgroundColor: '#FDFDFD', padding: '24px', borderRadius: '8px', border: "1px solid #DBDBDB80" }}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography
                                                sx={{
                                                    fontSize: '14px',
                                                    fontWeight: '400',
                                                    lineHeight: '20px',
                                                    textAlign: 'left',
                                                    color: '#191C1F',
                                                    mb: 1,
                                                }}
                                            >
                                                OTP
                                                <span style={{ color: '#E02F2F' }}>*</span>
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                label="Enter OTP"
                                                {...register("otp", {
                                                    required: "Enter OTP",
                                                    pattern: {
                                                        value: /^[0-9]{4}$/,
                                                        message: "OTP must be a 4-digit number"
                                                    }
                                                })}
                                                error={!!errors.otp}
                                                helperText={errors.otp ? errors.otp.message : ""}
                                                variant="outlined"
                                                size="small"
                                            />
                                        </Grid>

                                        <Grid item xs={12} sx={{ textAlign: 'center', mt: 3 }}>
                                            <Button type="submit" variant="contained" sx={{
                                                backgroundColor: '#FA8232',
                                                color: '#fff',
                                                padding: '10px 20px',
                                                marginRight: '15px',
                                                '&:hover': { backgroundColor: '#E57A2D' }
                                            }}>
                                                Submit OTP
                                            </Button>
                                            {canResend ? (
                                                <Button onClick={handleResendOTP} variant="outlined" sx={{
                                                    color: '#FA8232',
                                                    borderColor: '#FA8232',
                                                    padding: '10px 20px',
                                                    '&:hover': { borderColor: '#E57A2D', color: '#E57A2D' }
                                                }}>
                                                    Resend OTP
                                                </Button>
                                            ) : (
                                                <Typography sx={{ color: '#FA8232', paddingTop: '10px' }}>
                                                    Resend OTP in {`${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`}
                                                </Typography>
                                            )}
                                        </Grid>
                                    </Grid>
                                </form>
                            </Box>
                            <Divider sx={{ mt: 4 }} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default SubmitOTP;
