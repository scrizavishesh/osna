
import React, { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, Button, Box } from '@mui/material';
import Header from '../Layouts/Header';
import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';
import { GetEvents } from '../Utils/Apis';
import { toast } from 'react-hot-toast';
import { Container } from '@mui/system';

const events = [
    {
        id: 1,
        title: 'Midcon Hubli 2024',
        startDate: '01 Mar 2024',
        endDate: '03 Mar 2024',
        image: './about_us_main.svg', // Replace with actual image link
    },
    {
        id: 2,
        title: '3rd Indian Cancer Congress 2023',
        startDate: '02 Nov 2023',
        endDate: '05 Nov 2023',
        image: './about_us_main.svg', // Replace with actual image link
    },
    // Add more event objects
];

const EventsPage = () => {

    const baseUrl = 'https://dc.damio.in/'

    const [Events, setEvents] = useState([])

    useEffect(() => {
        getEve();
    }, []);

    const getEve = async () => {
        try {
            const response = await GetEvents();
            console.log(response, "get Events");
            if (response?.status === 200) {
                toast.success("Get client Logo");
                setEvents(response?.data?.data); // Save the data from the response
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
                <Box sx={{ padding: '2rem' }}>
                    <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '2rem' }}>
                        Past Events
                    </Typography>
                    <Grid container spacing={3}>
                        {Events.map((event) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
                                <Card sx={{ height: '100%' }}>
                                    <CardMedia
                                        component="img"
                                        height="300" // Fixed height for images
                                        image={baseUrl + event.event_image}
                                        alt={event.title}
                                        sx={{ objectFit: 'cover' }} // Ensures consistent image display
                                    />
                                    <CardContent sx={{ textAlign: 'left', padding: '1rem' }}>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {event.start_date} - {event.end_date}
                                        </Typography>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', margin: '0.5rem 0' }}>
                                            {event.event_name}
                                        </Typography>
                                        <Button variant="contained" size="small" sx={{ mt: 2 }}>
                                            Read More
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>

            <Footer />
        </>
    );
};

export default EventsPage;
