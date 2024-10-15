import React, { useState, useEffect } from 'react';
import { CardMedia, Typography, Button, Dialog, DialogTitle, DialogContent, IconButton, DialogActions, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { GetEvents } from '../Utils/Apis';
import { toast } from 'react-hot-toast';

const EventsPopup = () => {
    const baseUrl = 'https://dc.damio.in/';
    const [open, setOpen] = useState(false);
    const [todayEvents, setTodayEvents] = useState([]);

    useEffect(() => {
        const hasSeenPopup = localStorage.getItem('hasSeenEventsPopup');

        if (!hasSeenPopup) { // Only call getEve if the user hasn't seen the popup
            getEve();
        }
    }, []);

    const getEve = async () => {
        try {
            const response = await GetEvents();
            if (response?.status === 200) {
                toast.success("Events retrieved successfully");
                findTodayEvents(response?.data?.data || []); // Call to find today's events
            } else {
                toast.error("Failed to fetch events");
            }
        } catch (err) {
            toast.error(err?.message);
        }
    };

    const findTodayEvents = (events) => {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        const eventsToday = events.filter(event => {
            const eventDate = new Date(event.start_date).toISOString().split('T')[0];
            return eventDate === today;
        });

        if (eventsToday.length > 0) {
            setTodayEvents(eventsToday);
            setTimeout(() => {
                setOpen(true);
                localStorage.setItem('hasSeenEventsPopup', 'true'); // Set flag in localStorage
            }, 3000);
        }
    };

    const handleClose = () => {
        setOpen(false);
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
                            <CardMedia
                                component="img"
                                height="200"
                                image={baseUrl + event.event_image}
                                alt={event.event_name}
                                sx={{ objectFit: 'cover', mb: 2 }}
                            />
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
                <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
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
