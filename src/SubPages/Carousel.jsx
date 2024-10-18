import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Box, Typography, Button, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GetBanner } from '../Utils/Apis';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

// Custom Arrow Components
const PreviousArrow = (props) => {
    const { onClick } = props;
    return (
        <IconButton
            onClick={onClick}
            sx={{
                position: 'absolute',
                left: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
                zIndex: 2,
                width: 30,
                height: 30,
            }}
        >
            <ArrowBackIosIcon sx={{ color: '#fff', fontSize: '1rem' }} />
        </IconButton>
    );
};

const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <IconButton
            onClick={onClick}
            sx={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
                zIndex: 2,
                width: 30,
                height: 30,
            }}
        >
            <ArrowForwardIosIcon sx={{ color: '#fff', fontSize: '1rem' }} />
        </IconButton>
    );
};

const CarouselSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        prevArrow: <PreviousArrow />,
        nextArrow: <NextArrow />,
    };

    const baseUrl = 'https://dc.damio.in/'

    const [banner, setBanner] = useState([])

    useEffect(() => {
        getBanner();
    }, []);


    const getBanner = async () => {
        try {
            const response = await GetBanner();
            if (response?.status === 200) {
                toast.success("Got categories successfully");
                setBanner(response?.data?.data); // Save the data from the response
            } else {
                toast.error("Failed to fetch categories");
            }
        } catch (err) {
            toast.error(err?.message);
        }
    };

    return (
        <Box sx={{ width: '100%', height: '70vh', overflow: 'hidden' }}>
            <Slider {...settings}>
                {banner.map((item, index) => (

                    <Box
                        key={index}
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: '70vh',
                            backgroundImage: `url(${baseUrl + item.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            paddingLeft: '5%', // Align content to the left
                        }}

                    >
                        {/* Content over the image */}
                        <Box
                            sx={{
                                position: 'absolute', // Make the content box absolute positioned
                                top: '50%', // Center vertically
                                left: '5%', // Align to the left side
                                transform: 'translateY(-50%)', // Perfect centering
                                color: '#000',
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                textAlign: 'left',
                                maxWidth: '400px',
                                padding: '1.5rem',
                                borderRadius: '8px',
                            }}
                        >
                            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2, fontSize: '2rem',  color: '#fff', }}>
                                {item.heading}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: '1rem', mt: 2 }}>
                                <Button
                                    variant="contained"
                                    to={`/about`}
                                    component={Link}
                                    sx={{
                                        backgroundColor: '0462B6',
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: '#087ce1',
                                        },
                                    }}
                                >
                                    Learn More
                                </Button>
                                <Button
                                    component={Link}
                                    to={`/contact`}
                                    variant="outlined"
                                    sx={{
                                        color: '#fff',
                                        borderColor: '#fff',
                                        '&:hover': {
                                            borderColor: '#fff',
                                            backgroundColor: 'rgba(211, 37, 37, 0.1)',
                                        },
                                    }}
                                >
                                    Contact Us
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default CarouselSlider;
