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
import Loader from '../Layouts/Loader';

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
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
                zIndex: 2,
                width: 35,
                height: 35,
            }}
        >
            <ArrowBackIosIcon sx={{ color: '#fff', fontSize: '1.2rem' }} />
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
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
                zIndex: 2,
                width: 35,
                height: 35,
            }}
        >
            <ArrowForwardIosIcon sx={{ color: '#fff', fontSize: '1.2rem' }} />
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

    const baseUrl = 'https://dc.damio.in/';

    const [banner, setBanner] = useState([]);
    const [LoaderState, setLoaderState] = useState(false);

    useEffect(() => {
        getBanner();
    }, []);

    const getBanner = async () => {
        setLoaderState(true);
        try {
            const response = await GetBanner();
            if (response?.status === 200) {
                setLoaderState(false);
                toast.success("Banners fetched successfully");
                setBanner(response?.data?.data);
            } else {
                toast.error("Failed to fetch banners");
            }
        } catch (err) {
            toast.error(err?.message);
        }
    };

    return (
        <>
          
            <Box sx={{ width: '100%', height: { xs: '50vh', md: '70vh' }, overflow: 'hidden' }}>
                <Slider {...settings}>
                    {banner.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                position: 'relative',
                                width: '100%',
                                height: { xs: '50vh', md: '70vh' },
                                backgroundImage: `url(${baseUrl + item.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {/* Responsive Content Overlay */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: { xs: '5%', md: '10%' },
                                    transform: 'translateY(-50%)',
                                    color: '#fff',
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    textAlign: 'left',
                                    maxWidth: { xs: '90%', sm: '70%', md: '400px' },
                                    padding: { xs: '1rem', md: '1.5rem' },
                                    borderRadius: '8px',
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: { xs: '1.5rem', md: '2rem' },
                                        mb: 2,
                                        color: '#fff',
                                    }}
                                >
                                    {item.heading}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: '1rem', mt: 2 }}>
                                    <Button
                                        variant="contained"
                                        to={`/about`}
                                        component={Link}
                                        sx={{
                                            backgroundColor: '#0462B6',
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
        </>
    );
};

export default CarouselSlider;
