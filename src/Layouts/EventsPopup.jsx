import React, { useState, useEffect } from 'react';
import { CardMedia, Typography, Button, Dialog, DialogTitle, DialogContent, IconButton, DialogActions, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { GetEvents } from '../Utils/Apis';
import { toast } from 'react-hot-toast';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const EventsPopup = () => {
    const baseUrl = 'https://dc.damio.in/';
    const [open, setOpen] = useState(false);
    const [todayEvents, setTodayEvents] = useState([]);

    useEffect(() => {
        const hasSeenPopup = sessionStorage.getItem('hasSeenEventsPopup');

        if (!hasSeenPopup) { 
            getEve();
        }
    }, []);

    const getEve = async () => {
        try {
            const response = await GetEvents();
            if (response?.status === 200) {
                toast.success("Events retrieved successfully");
                findUpcomingEvents(response?.data?.data || []);
            } else {
                toast.error("Failed to fetch events");
            }
        } catch (err) {
            toast.error(err?.message);
        }
    };

    const findUpcomingEvents = (events) => {
        const today = new Date().toISOString().split('T')[0];
        
        const upcomingEvents = events.filter(event => {
            const startDate = new Date(event.start_date).toISOString().split('T')[0];
            const endDate = new Date(event.end_date).toISOString().split('T')[0];
            
            return today >= startDate && today <= endDate;
        });

        if (upcomingEvents.length > 0) {
            setTodayEvents(upcomingEvents);
            setTimeout(() => {
                setOpen(true);
                sessionStorage.setItem('hasSeenEventsPopup', 'true');
            }, 3000);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false, // Remove navigation arrows
        customPaging: (i) => <div className="custom-slick-dot" /> // Custom dot styling
    };

    return (
        <>
            {/* Popup for Today's Events */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">Today's Events</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {/* Render all today's events */}
                    {todayEvents.map((event) => (
                        <Box key={event.id} sx={{ marginBottom: 2 }}>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    lineHeight: '20px',
                                    textAlign: 'center',
                                    color: "#191c1f",
                                    mb: 1
                                }}
                            >
                                {event.event_name}
                            </Typography>
                            {/* Conditionally render a single image or a slider based on image count */}
                            {event.event_image.length === 1 ? (
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={baseUrl + event.event_image[0].image}
                                    alt={event.event_name}
                                    sx={{ objectFit: 'cover', width: '100%', mb: 2 }}
                                />
                            ) : (
                                <Slider {...sliderSettings}>
                                    {event.event_image.map((imgObj, index) => (
                                        <CardMedia
                                            key={index}
                                            component="img"
                                            height="200"
                                            image={baseUrl + imgObj.image}
                                            alt={event.event_name}
                                            sx={{ objectFit: 'cover', width: '100%', mb: 2 }}
                                        />
                                    ))}
                                </Slider>
                            )}
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    lineHeight: '20px',
                                    textAlign: 'center',
                                    color: "#5f6c72",
                                    mb: 2
                                }}
                            >
                                {event.description}
                            </Typography>
                        </Box>
                    ))}
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EventsPopup;
