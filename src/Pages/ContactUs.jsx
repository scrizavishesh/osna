import React from 'react';
import { Container, Grid, Box, TextField, Button, MenuItem, Typography, Paper, Card } from '@mui/material';
import { Phone, Email, LocationOn } from '@mui/icons-material';
import Footer from '../Layouts/Footer';
import Header from '../Layouts/Header';
import Navbar from '../Layouts/Navbar';

const ContactUs = () => {

    return (
        <>
            <Grid sx={{ bgcolor: '#0462B6' }}>
                <Header />
            </Grid>
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                {/* Heading and Subheading */}
                <Box mb={4} textAlign="center">
                    <Typography
                        sx={{
                            fontSize: '40px',
                            fontWeight: 700,
                            lineHeight: '47px',
                            color: "#FA8232",
                            mb: 2,
                        }}
                    >
                        Contact Us
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '18px',
                            fontWeight: 500,
                            lineHeight: '21.51px',
                            color: "#717171",
                            mb: 2,
                        }}
                    >
                        Any question or remarks? Just write us a message!
                    </Typography>
                </Box>

                <Paper sx={{ backgroundColor: '#FDFDFD', p: 4 }}>
                    <Grid container spacing={4}>
                        {/* Left Side: Contact Information */}
                        <Grid item xs={12} md={4}>
                            <Paper sx={{ p: 3, backgroundColor: '#FFFFFF', border: '1px solid #E4E7E9' }}>
                                <Box mb={2}>
                                    <Typography
                                        sx={{
                                            fontSize: '21px',
                                            fontWeight: 500,
                                            lineHeight: '64px',
                                            color: "#2c2c2c",
                                            mb: 2,
                                        }}
                                    >
                                        Contact Information
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mb={2}>
                                    <Box
                                        sx={{
                                            backgroundColor: '#0462B6',
                                            color: '#FFF',
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mr: 2,
                                        }}
                                    >
                                        <Phone />
                                    </Box>
                                    <Typography>+91 999-999-9999</Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mb={2}>
                                    <Box
                                        sx={{
                                            backgroundColor: '#0462B6',
                                            color: '#FFF',
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mr: 2,
                                        }}
                                    >
                                        <Email />
                                    </Box>
                                    <Typography>osnaelectronics@gmail.com</Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mb={2}>
                                    <Box
                                        sx={{
                                            backgroundColor: '#0462B6',
                                            color: '#FFF',
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mr: 2,
                                        }}
                                    >
                                        <LocationOn />
                                    </Box>
                                    <Typography>
                                        Ground Floor, Logix Park
                                    </Typography>
                                </Box>
                                {/* Map */}
                                <Box mt={2}>
                                    <iframe
                                        title="Company Location"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.6643330174115!2d77.27097867508039!3d28.549807387833255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1597b5509e5%3A0x25c6cf2c60b12316!2sOsna%20Electronics%20Private%20Limited!5e0!3m2!1sen!2sin!4v1726644963757!5m2!1sen!2sin"
                                        width="280"
                                        height="280"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                    ></iframe>
                                </Box>
                            </Paper>
                        </Grid>

                        {/* Right Side: Request Form */}
                        <Grid item xs={12} md={8}>
                            <Card sx={{ backgroundColor: '#FFFFFF', boxShadow: 'none', border: 'none' }}>
                                <Typography
                                    sx={{
                                        fontSize: '24px',
                                        fontWeight: 500,
                                        lineHeight: '64px',
                                        color: "#2c2c2c",
                                        mb: 2,
                                    }}
                                >
                                    Request Form
                                </Typography>
                                <form>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                select
                                                label="Type of Request"
                                                fullWidth
                                                variant="outlined"
                                            >
                                                <MenuItem value="General Inquiry">General Inquiry</MenuItem>
                                                <MenuItem value="Support">Support</MenuItem>
                                                <MenuItem value="Sales">Sales</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} >
                                            <TextField
                                                label="Enter Full Name"
                                                fullWidth
                                                variant="outlined"
                                            // sx={{ width: '80%' }} 
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <TextField
                                                label="Email"
                                                fullWidth
                                                variant="outlined"
                                            // sx={{ width: '80%' }}  
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <TextField
                                                label="Contact Number"
                                                fullWidth
                                                variant="outlined"
                                            // sx={{ width: '80%' }} 
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Message"
                                                fullWidth
                                                variant="outlined"
                                                multiline
                                                rows={4}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    textTransform: 'none',
                                                    padding: '21px 41px 21px 41px',
                                                    borderRadius: '5px',
                                                    fontSize: '14px',
                                                    backgroundColor: '#FA8232',
                                                    color: '#FFFFFF',
                                                    border: '1px solid #DBDBDB80' 
                                                }}
                                            >
                                                Send Message
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            <Footer />
        </>

    );
};

export default ContactUs;
