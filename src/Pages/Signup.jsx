import React from 'react';
import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography,
    MenuItem,
    Checkbox,
    FormControlLabel,
    Link,
} from '@mui/material';
import Header from '../Layouts/Header';
import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';

const SignUp = () => {
    return (
        <>
            <Grid sx={{ bgcolor: '#0462B6' }}>
                <Header />
            </Grid>
            <Navbar />
            <Container maxWidth="lg">
                {/* Sign Up Heading */}
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Grid sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: 'center',
                        mt: 4
                    }}>
                        <Grid>
                            <img src="/signupForm.svg" alt="" />
                        </Grid>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: '32px',
                                fontWeight: '700',
                                lineHeight: '42px',
                                textAlign: 'center',
                                color: '#FA8232',
                                display: 'inline-block',
                                padding: '10px 20px',
                                borderRadius: '4px',
                            }}
                        >
                            Sign Up
                        </Typography>
                    </Grid>
                </Box>

                {/* Personal Data Section */}
                <Box sx={{ backgroundColor: '#FDFDFD', padding: '16px', borderRadius: '8px', mb: 4, border: "1px solid #DBDBDB80" }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: '20px',
                            fontWeight: '500',
                            lineHeight: '32px',
                            textAlign: 'left',
                            color: '#2C2C2C',
                            mb: 2,
                        }}
                    >
                        Personal Data
                    </Typography>

                    {/* Form Fields */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
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
                                Username
                                <span style={{ color: '#E02F2F' }}>*</span>
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Enter Username"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                                Salutation
                                <span style={{ color: '#E02F2F' }}>*</span>
                            </Typography>
                            <TextField fullWidth size="small" select variant="outlined" defaultValue="">
                                <MenuItem value="Mr" sx={{ fontSize: '14px' }}>Mr</MenuItem>
                                <MenuItem value="Ms" sx={{ fontSize: '14px' }}>Ms</MenuItem>
                                <MenuItem value="Dr" sx={{ fontSize: '14px' }}>Dr</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                                First Name
                                <span style={{ color: '#E02F2F' }}>*</span>
                            </Typography>
                            <TextField fullWidth size="small" placeholder="Enter First Name" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                                Last Name
                                <span style={{ color: '#E02F2F' }}>*</span>
                            </Typography>
                            <TextField fullWidth size="small" placeholder="Enter Last Name" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                                Password
                                <span style={{ color: '#E02F2F' }}>*</span>
                            </Typography>
                            <TextField type="password" fullWidth size="small" placeholder="Enter Password" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                                Confirm Password
                                <span style={{ color: '#E02F2F' }}>*</span>
                            </Typography>
                            <TextField type="password" fullWidth size="small" placeholder="Enter Confirm Password" variant="outlined" />
                        </Grid>
                    </Grid>
                </Box>

                {/* Contact Data Section */}
                <Box sx={{ backgroundColor: '#FDFDFD', padding: '16px', borderRadius: '8px', mb: 4, border: "1px solid #DBDBDB80" }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: '20px',
                            fontWeight: '500',
                            lineHeight: '32px',
                            textAlign: 'left',
                            color: '#2C2C2C',
                            mb: 2,
                        }}
                    >
                        Contact Data
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
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
                                Company
                                <span style={{ color: '#E02F2F' }}>*</span>
                            </Typography>
                            <TextField fullWidth size="small" placeholder="Enter Company Name" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                                Position
                                <span style={{ color: '#E02F2F' }}>*</span>
                            </Typography>
                            <TextField fullWidth size="small" placeholder="Enter Position" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                                Address
                                <span style={{ color: '#E02F2F' }}>*</span>
                            </Typography>
                            <TextField fullWidth size="small" placeholder="Enter Address" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                                Zip
                                <span style={{ color: '#E02F2F' }}>*</span>
                            </Typography>
                            <TextField fullWidth size="small" placeholder="Enter Zip Code" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                                City
                                <span style={{ color: '#E02F2F' }}>*</span>
                            </Typography>
                            <TextField fullWidth size="small" placeholder="Enter City Name" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                                Country
                                <span style={{ color: '#E02F2F' }}>*</span>
                            </Typography>
                            <TextField fullWidth size="small" placeholder="Enter Country Name" variant="outlined" />
                        </Grid>
                    </Grid>
                </Box>

                <Grid item xs={12} sx={{ textAlign: 'center', mt: 3 }}>
                    <Button variant="contained" sx={{
                        backgroundColor: '#FA8232',
                        color: '#fff',
                        padding: '10px 20px',
                        marginRight: '15px',
                        '&:hover': { backgroundColor: '#E57A2D' }
                    }}>
                        Submit
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
            </Container>
            <Footer />
        </>
    );
};

export default SignUp;
