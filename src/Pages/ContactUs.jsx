import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Grid, Box, TextField, Button, MenuItem, Typography, Paper, Card, Select, Divider } from '@mui/material';
import { Phone, Email, LocationOn } from '@mui/icons-material';
import Footer from '../Layouts/Footer';
import Header from '../Layouts/Header';
import Navbar from '../Layouts/Navbar';
import { getBranches, getContacts, handleContact } from '../Utils/Apis';
import { toast } from 'react-hot-toast';

const ContactUs = () => {

    const [branches, setBranches] = useState([]);
    const [contact, setContact] = useState('')
    console.log(branches)
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();


    const onSubmit = async (data) => {
        if (!data.request_type || !data.name || !data.email || !data.phone || !data.message) {
            toast.error("All fields are required");
            return;
        }
        const formData = new FormData();
        formData.append('request_type', data.request_type);
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('message', data.message);
        try {
            const response = await handleContact(formData);
            console.log(response, "contact")
            if (response.status === 201) {
                toast.success("Contact Information Save Successfully!");
                reset();
            } else {
                toast.error("Error adding user");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        Contact();
        Branches();
    }, []);

    const Contact = async () => {
        try {
            const response = await getContacts();
            console.log(response, "get Contact");
            if (response?.status === 200) {
                toast.success("Get Contact");
                setContact(response?.data?.data[0]);
            } else {
                toast.error("Failed to fetch categories");
            }
        } catch (err) {
            toast.error(err?.message);
        }
    };


    const Branches = async () => {
        try {
            const response = await getBranches();
            if (response?.status === 200) {
                toast.success("Get Branches");
                setBranches(response?.data?.data);
            } else {
                toast.error("Failed to fetch categories");
            }
        } catch (err) {
            toast.error(err?.message);
        }
    };

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
                                    <Typography
                                        sx={{
                                            fontSize: '14px',
                                            fontWeight: 400,
                                            lineHeight: '20px',
                                            color: "#999999",
                                        }}
                                    >
                                        {contact?.contact_phone_number}
                                    </Typography>
                                </Box>
                                <Divider variant="middle" />
                                <Box display="flex" alignItems="center" mb={2} mt={2}>
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
                                    <Typography
                                        sx={{
                                            fontSize: '14px',
                                            fontWeight: 400,
                                            lineHeight: '20px',
                                            color: "#999999",
                                        }}
                                    >
                                        {contact?.contact_email}
                                    </Typography>
                                </Box>
                                <Divider variant="middle" />
                                <Box display="flex" alignItems="center" mb={2} mt={2}>
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
                                    <Typography sx={{
                                        fontSize: '14px',
                                        fontWeight: 400,
                                        lineHeight: '20px',
                                        color: "#999999",
                                        alignItems: 'center',
                                    }}>
                                        {contact?.contact_address}
                                    </Typography>
                                </Box>
                                <Divider variant="middle" />

                                {/* Banches */}

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
                                        Branch Office
                                    </Typography>
                                </Box>
                                {branches?.map((item) => (
                                    <Box alignItems="center" mb={2}>
                                        <Typography
                                            sx={{
                                                fontSize: '14px',
                                                fontWeight: 400,
                                                lineHeight: '20px',
                                                color: "#2c2c2c",
                                            }}
                                        >
                                            {item?.branch_name}
                                            {console.log(item?.branch_name)}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: '14px',
                                                fontWeight: 400,
                                                lineHeight: '20px',
                                                color: "#999999",
                                            }}
                                        >
                                            Mobile No - {item?.email}
                                            Email Id - {item?.mobile}
                                        </Typography>
                                    </Box>
                                ))}
                                <Divider variant="middle" />
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
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Select
                                                // label="Type of Request"
                                                fullWidth
                                                variant="outlined"
                                                displayEmpty
                                                defaultValue=''
                                                {...register('request_type', { required: 'Request type is required' })}
                                                error={!!errors.request_type}
                                                helperText={errors.request_type?.message}
                                            >
                                                <MenuItem value="" disabled>----- Select -----</MenuItem>
                                                <MenuItem value="General Inquiry">General Inquiry</MenuItem>
                                                <MenuItem value="Support">Support</MenuItem>
                                                <MenuItem value="Sales">Sales</MenuItem>
                                            </Select>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Enter Full Name"
                                                fullWidth
                                                variant="outlined"
                                                {...register('name', { required: 'Name is required' })}
                                                error={!!errors.name}
                                                helperText={errors.name?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Email"
                                                fullWidth
                                                variant="outlined"
                                                {...register('email', {
                                                    required: 'Email is required',
                                                    pattern: {
                                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                        message: 'Invalid email address',
                                                    },
                                                })}
                                                error={!!errors.email}
                                                helperText={errors.email?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Contact Number"
                                                fullWidth
                                                variant="outlined"
                                                {...register('phone', { required: 'Phone number is required' })}
                                                error={!!errors.phone}
                                                helperText={errors.phone?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Message"
                                                fullWidth
                                                variant="outlined"
                                                multiline
                                                rows={4}
                                                {...register('message', { required: 'Message is required' })}
                                                error={!!errors.message}
                                                helperText={errors.message?.message}
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
                                                type="submit"
                                            >
                                                Send Message
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Card>
                            <Box mt={2}>
                                <iframe
                                    title="Company Location"
                                    src={contact?.map}
                                    width="100%"
                                    height="280"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                >
                                </iframe>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            <Footer />
        </>
    );
};

export default ContactUs;
