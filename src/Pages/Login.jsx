import React, {useState} from 'react';
import { Container, Box, Typography, TextField, Button, Grid, Divider } from '@mui/material';
import { useForm } from 'react-hook-form'; // Import useForm
import { userGenerateOTP } from '../Utils/Apis';
import { useNavigate } from 'react-router-dom';
import Loader from '../Layouts/Loader';

const SignIn = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm(); // Initialize useForm
    const [LoaderState, setLoaderState] = useState(false);

    // Function to handle form submission
    const onSubmit = async (data) => {
        setLoaderState(true);
        const payload = {
            email: data.email,
            type: 'login'
        };

        try {
            // API call (replace `YourAPI` with the actual API function or axios call)
            const response = await userGenerateOTP(payload);
            if (response.status === 200) {
                setLoaderState(false);
                alert('OTP has been sent to your email successfully');
                navigate("/login", { state: { email: data.email } }); 
                reset();
            } else {
                alert('Signup failed');
            }
        } catch (error) {
            console.error('API Error:', error);
            alert(error?.response?.data?.message);
            navigate("/signup"); 
        }
    };
    return (
        <>
        {LoaderState && (
                <Loader />
            )
            }

            {/* Main Sign In Section */}
            <Container sx={{ mt: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid container justifyContent="center" alignItems="center" spacing={2}>

                    {/* Image Section */}
                    <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box>
                            <img src="/Character.svg" alt="Sign-in Icon" width="250" />
                        </Box>
                    </Grid>

                    {/* Login Form Section */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FA8232', mb: 2 }}>
                                Login
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#6B6B6B', mb: 3 }}>
                                Hello, Welcome back 👋
                            </Typography>

                            {/* Login Form */}
                            <Box sx={{ backgroundColor: '#FDFDFD', padding: '24px', borderRadius: '8px', border: "1px solid #DBDBDB80" }}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Grid container spacing={2}>
                                        {/* Email */}

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
                                                Email
                                                <span style={{ color: '#E02F2F' }}>*</span>
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                label="Email"
                                                {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
                                                error={!!errors.email}
                                                helperText={errors.email ? "Invalid email" : ""}
                                                variant="outlined"
                                                size="small"
                                            />
                                        </Grid>

                                        {/* Submit and Cancel Buttons */}
                                        <Grid item xs={12} sx={{ textAlign: 'center', mt: 3 }}>
                                            <Button type="submit" variant="contained" sx={{
                                                backgroundColor: '#FA8232',
                                                color: '#fff',
                                                padding: '10px 20px',
                                                marginRight: '15px',
                                                '&:hover': { backgroundColor: '#E57A2D' }
                                            }}>
                                                Send OTP
                                            </Button>
                                            <Button variant="outlined" sx={{
                                                color: '#FA8232',
                                                borderColor: '#FA8232',
                                                padding: '10px 20px',
                                                '&:hover': { borderColor: '#E57A2D', color: '#E57A2D' }
                                            }}>
                                                Cancel
                                            </Button>
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

export default SignIn;
