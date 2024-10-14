import React, { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, Button, Box } from '@mui/material';
import Header from '../Layouts/Header';
import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';
import { GetEvents } from '../Utils/Apis';
import { toast } from 'react-hot-toast';
import { Container } from '@mui/system';

const EventsPage = () => {

    const baseUrl = 'https://dc.damio.in/'

    const [Events, setEvents] = useState([]);

    useEffect(() => {
        getEve();
    }, []);

    const getEve = async () => {
        try {
            const response = await GetEvents();
            if (response?.status === 200) {
                toast.success("Events retrieved successfully");
                setEvents(response?.data?.data || []); // Ensure Events is an array
            } else {
                toast.error("Failed to fetch events");
            }
        } catch (err) {
            toast.error(err?.message);
        }
    };

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Box sx={{ padding: '2rem' }}>
                    <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '2rem' }}>
                        Events
                    </Typography>
                    <Grid container spacing={3}>
                        {/* Conditionally render either events or a "No Events Found" message */}
                        {Events.length > 0 ? (
                            Events.map((event) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
                                    <Card sx={{ height: '100%' }}>
                                        <CardMedia
                                            component="img"
                                            height="300"
                                            image={baseUrl + event.event_image}
                                            alt={event.event_name}
                                            sx={{ objectFit: 'cover' }}
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
                            ))
                        ) : (
                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ textAlign: 'center', mt: 4, color: "#f81b1b" }}>
                                    No Events Found
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default EventsPage;
