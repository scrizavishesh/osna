import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Box, Tabs, Tab, Container } from '@mui/material';
import { GetEvents } from '../Utils/Apis';
import { toast } from 'react-hot-toast';
import moment from 'moment';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const EventsPage = () => {
    const baseUrl = 'https://dc.damio.in/';
    const [Events, setEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [presentEvents, setPresentEvents] = useState([]);
    const [selectedTab, setSelectedTab] = useState(1);

    useEffect(() => {
        getEve();
    }, []);

    const getEve = async () => {
        try {
            const response = await GetEvents();
            if (response?.status === 200) {
                toast.success("Events retrieved successfully");
                const events = response?.data?.data;
                setEvents(events);
                categorizeEvents(events);
            } else {
                toast.error("Failed to fetch events");
            }
        } catch (err) {
            toast.error(err?.message);
        }
    };

    const categorizeEvents = (events) => {
        const today = moment().startOf('day');
        const past = [];
        const present = [];

        events.forEach((event) => {
            const eventStart = moment(event.start_date);
            const eventEnd = moment(event.end_date);

            if (eventEnd.isBefore(today, 'day')) {
                past.push(event); // Event has ended
            } else {
                present.push(event); // Today's and future events will go to "Upcoming"
            }
        });

        setPastEvents(past);
        setPresentEvents(present);
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const renderEventCards = (events) => {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dotsClass: "slick-dots custom-slick-dots"  // Custom class for your slick dots
        };


        return (
            <Grid container spacing={3}>
                {events.length > 0 ? (
                    events.map((event) => (
                        <Grid item xs={12} sm={6} md={4} lg={4} key={event.id}>
                            <Card sx={{ height: '100%', borderRadius: '16px', boxShadow: 3 }}>
                                <Box className="custom-slick-dots">
                                    <Slider {...settings}>
                                        {event.event_image.map((image, index) => (
                                            <div key={index} style={{ position: 'relative' }}>
                                                <img
                                                    src={baseUrl + image?.image}
                                                    alt={event.event_name}
                                                    style={{
                                                        width: '100%',
                                                        height: '300px',
                                                        objectFit: 'cover',
                                                        borderRadius: '16px 16px 0 0',
                                                    }}
                                                />
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        bottom: 0,
                                                        width: '100%',
                                                        height: '40%',
                                                        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)',
                                                        borderRadius: '0 0 16px 16px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </Slider>
                                </Box>

                                <CardContent sx={{ textAlign: 'left', padding: '1.5rem' }}>
                                    <Typography variant="subtitle2" color="textSecondary" sx={{ fontStyle: 'italic' }}>
                                        {moment(event.start_date).format('MMMM Do YYYY')} - {moment(event.end_date).format('MMMM Do YYYY')}
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', margin: '0.5rem 0', color: '#FA8232' }}>
                                        {event.event_name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#333', margin: '0.5rem 0' }}>
                                        {event.description}
                                    </Typography>
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
        );
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ padding: '2rem' }}>
                <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '2rem', fontWeight: 'bold', color: '#FA8232' }}>
                    Events
                </Typography>

                {/* Tabs to switch between Past and Upcoming events */}
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Past" />
                    <Tab label="Upcoming" />
                </Tabs>

                <Box sx={{ marginTop: '2rem' }}>
                    {/* Conditionally render events based on selected tab */}
                    {selectedTab === 0 && renderEventCards(pastEvents)}
                    {selectedTab === 1 && renderEventCards(presentEvents)}
                </Box>
            </Box>
        </Container>
    );
};

export default EventsPage;
