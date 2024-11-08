import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Grid, Box, TextField, Button, MenuItem, Typography, Paper, Card, Select, Divider, Modal } from '@mui/material';
import { Phone, Email, LocationOn } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getBranches, getContacts, handleContact } from '../Utils/Apis';
import { toast } from 'react-hot-toast';
import Loader from '../Layouts/Loader';

const ContactUs = () => {

    const [branches, setBranches] = useState([]);
    const [contact, setContact] = useState('');
    const [LoaderState, setLoaderState] = useState(false);
    const [showModal, setShowModal] = useState(false); // State for the confirmation modal
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();


    const onSubmit = async (data) => {
        setLoaderState(true);
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
            if (response.status === 201) {
                setLoaderState(false);
                toast.success("Contact Information Save Successfully!");
                reset();
                setShowModal(true);
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
        setLoaderState(true);
        try {
            const response = await getContacts();
            if (response?.status === 200) {
                setLoaderState(false);
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
        setLoaderState(true);
        try {
            const response = await getBranches();
            if (response?.status === 200) {
                setLoaderState(false);
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

{LoaderState && (
                <Loader />
            )
            }

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
                                        component="a" // Makes it clickable
                                        href={`tel:${contact?.contact_phone_number}`}
                                        sx={{
                                            fontSize: '14px',
                                            fontWeight: 400,
                                            lineHeight: '20px',
                                            color: "#999999",
                                            textDecoration: 'none',
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
                                        component="a" // Makes it clickable
                                        href={`mailto:${contact?.contact_email}`}
                                        sx={{
                                            fontSize: '14px',
                                            fontWeight: 400,
                                            lineHeight: '20px',
                                            color: "#999999",
                                            textDecoration: 'none',
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
                                        <LocationOn sx={{ fontSize: '2em', width: '2em', height: '1em' }} />
                                    </Box>
                                    <Typography
                                        component="a" // Makes it clickable
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact?.contact_address)}`} // Opens Google Maps

                                        sx={{
                                            fontSize: '14px',
                                            fontWeight: 400,
                                            lineHeight: '20px',
                                            color: "#999999",
                                            alignItems: 'center',
                                            textDecoration: 'none',
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
                                <Box sx={{ maxHeight: branches.length > 5 ? '460px' : 'auto', overflowY: branches.length > 5 ? 'scroll' : 'visible' }}>
                                    {branches?.map((item, index) => (
                                        <Box key={index} alignItems="center" mb={2}>
                                            {/* Branch Name */}
                                            <Typography
                                                sx={{
                                                    fontSize: '14px',
                                                    fontWeight: 400,
                                                    lineHeight: '20px',
                                                    color: "#2c2c2c",
                                                }}
                                            >
                                                {item?.branch_name}
                                            </Typography>

                                            {/* Contact Information */}
                                            <Typography
                                                sx={{
                                                    fontSize: '14px',
                                                    fontWeight: 400,
                                                    lineHeight: '20px',
                                                    color: "#999999",
                                                }}
                                            >
                                                {/* Email */}
                                                {item?.email && (
                                                    <Grid
                                                        component="a"
                                                        href={`mailto:${item.email}`}
                                                        sx={{
                                                            display: 'block',
                                                            color: '#999999',
                                                            textDecoration: 'none',
                                                            '&:hover': {
                                                                color: '#FA8232',
                                                            },
                                                        }}
                                                    >
                                                        Email - {item.email}
                                                    </Grid>
                                                )}

                                                {/* Mobile Numbers */}
                                                {item?.mobile && item.mobile.split(',').map((mobile, i) => (
                                                    <Grid
                                                        key={i}
                                                        component="a"
                                                        href={`tel:${mobile.trim()}`}
                                                        sx={{
                                                            display: 'block',
                                                            color: '#999999',
                                                            textDecoration: 'none',
                                                            '&:hover': {
                                                                color: '#FA8232',
                                                            },
                                                        }}
                                                    >
                                                        Mobile No - {mobile.trim()}
                                                    </Grid>
                                                ))}

                                                {/* Telephone */}
                                                {item?.telephone && (
                                                    <Grid
                                                        component="a"
                                                        href={`tel:${item.telephone}`}
                                                        sx={{
                                                            display: 'block',
                                                            color: '#999999',
                                                            textDecoration: 'none',
                                                            '&:hover': {
                                                                color: '#FA8232',
                                                            },
                                                        }}
                                                    >
                                                        Telephone - {item.telephone}
                                                    </Grid>
                                                )}

                                                {/* Address with Google Maps Link */}
                                                <Grid
                                                    component="a"
                                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    sx={{
                                                        display: 'block',
                                                        color: '#999999',
                                                        textDecoration: 'none',
                                                        '&:hover': {
                                                            color: '#FA8232',
                                                        },
                                                    }}
                                                >
                                                    Address - {item.address}
                                                </Grid>
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>

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

            {/* Confirmation Modal */}

            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: '#0462B6',
                        borderRadius: 3,
                        p: 4,
                        boxShadow: 5,
                        textAlign: 'center',
                        animation: 'fadeIn 0.3s ease-in-out'
                    }}
                >
                    {/* Animated Icon */}
                    <CheckCircleIcon sx={{ fontSize: 50, color: '#FA8232', mb: 2, animation: 'bounce 1s infinite' }} />

                    {/* Title */}
                    <Typography
                        id="modal-title"
                        variant="h5"
                        component="h2"
                        sx={{ fontWeight: 'bold', color: '#FFFFFF' }}
                    >
                        🎉 Submission Successful!
                    </Typography>

                    {/* Description */}
                    <Typography
                        id="modal-description"
                        sx={{ mt: 2, color: '#F9FAFB' }}
                    >
                        Your message has been successfully submitted. We will get back to you shortly. 😊
                    </Typography>

                    {/* Close Button */}
                    <Button
                        onClick={() => setShowModal(false)}
                        sx={{
                            mt: 3,
                            bgcolor: '#FA8232',
                            color: '#FFFFFF',
                            '&:hover': { bgcolor: '#bd7748' },
                            borderRadius: 20,
                            px: 3,
                            py: 1,
                            textTransform: 'none',
                            fontSize: '16px'
                        }}
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default ContactUs;
