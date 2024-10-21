import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'; // Use Grid from MUI for responsive layouts
import Card from '@mui/material/Card'; // Replaced Paper with Card
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Divider, Icon } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Link } from 'react-router-dom';
import ChatBot from '../Layouts/ChatBot';
import Modal from '../Layouts/Modal';
import Carousel from '../SubPages/Carousel';
import CompanyCarousel from '../SubPages/CompanyCarousel';
import { getHomePageContent, GetProduct } from '../Utils/Apis';
import { toast } from 'react-hot-toast';
import WorldMap from './WorldMap';


const MyComponent = () => {
    const [cardDetails, setcardDetails] = useState([]);
    const [pageHome, setpageHome] = useState('')
    const baseUrl = 'https://dc.damio.in/'

    useEffect(() => {
        getProduct();
        getHome();
    }, []);

    const getProduct = async () => {
        try {
            const response = await GetProduct();
            console.log(response, 'hello')
            if (response?.status === 200) {
                toast.success("Got Product successfully");
                setcardDetails(response?.data?.data?.data);
            } else {
                toast.error("Failed to fetch categories");
            }
        } catch (err) {
            toast.error(err?.message);
        }
    };

    const getHome = async () => {
        try {
            const response = await getHomePageContent();
            if (response?.status === 200) {
                toast.success("Get Home Page Content");
                setpageHome(response?.data?.data[0]);
            } else {
                toast.error("Failed to fetch categories");
            }
        } catch (err) {
            toast.error(err?.message);
        }
    };



    return (
        <>


            <Carousel />
            <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
                <Box sx={{ padding: '20px' }}>
                    <Grid container spacing={4}>
                        {/* Left Section */}
                        <Grid item xs={12} md={8}>
                            <Card
                                elevation={3}
                                sx={{
                                    backgroundColor: '#F2F4F5',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    p: 3,
                                    flexGrow: 1,
                                    boxShadow: '0px 4px 12px 0px rgba(0,0,0,0.1)', // Adjusted shadow
                                }}
                            >
                                <Box
                                    display="flex"
                                    flexDirection={{ xs: 'column', md: 'row' }}
                                    justifyContent="space-between"
                                    alignItems="center"
                                    minHeight="100%"
                                >
                                    {/* Text Section */}
                                    <Box maxWidth={{ xs: '100%', md: '60%' }}>
                                        <Typography
                                            variant="h4"
                                            fontWeight={600}
                                            fontSize={{ xs: '24px', md: '32px' }} // Adjusted font size
                                            lineHeight={{ xs: '32px', md: '40px' }} // Adjusted line height
                                            gutterBottom
                                        >
                                            {pageHome?.section_one_heading}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            fontSize={{ xs: '14px', md: '16px' }}
                                            lineHeight="24px"
                                            mb={3}
                                        >
                                            {pageHome?.section_one_description}
                                        </Typography>
                                        <Button
                                            component="a"
                                            href="/products"
                                            variant="contained"
                                            endIcon={<ArrowForwardIcon />}
                                            sx={{
                                                textTransform: 'none',
                                                padding: '10px 20px',
                                                fontSize: { xs: '14px', md: '16px' },
                                                backgroundColor: '#FA8232',
                                                color: '#FFFFFF',
                                                mt: '8px',
                                                mb: '8px',
                                                '&:hover': {
                                                    backgroundColor: '#FF974A',
                                                    transform: 'scale(1.05)', // Hover effect: zoom
                                                },
                                            }}
                                        >
                                            View All
                                        </Button>
                                    </Box>
                                    {/* Image Section */}
                                    <Box width={{ xs: '100%', md: '35%' }} height="auto">
                                        <img
                                            src={baseUrl + pageHome?.section_one_image}
                                            alt="Placeholder"
                                            style={{ width: '100%', height: 'auto', borderRadius: '6px', objectFit: 'cover' }}
                                        />
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>

                        {/* Right Section */}
                        <Grid item xs={12} md={4}>
                            {/* Upper Section */}
                            <Card
                                elevation={3}
                                sx={{
                                    backgroundColor: '#0462B6',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: 3,
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    boxShadow: '0px 4px 12px 0px rgba(0,0,0,0.1)', // Adjusted shadow
                                    mb: 3, // Added margin bottom
                                    textAlign: 'center',
                                }}
                            >
                                {/* Image Section */}
                                <Box
                                    position="relative"
                                    width={{ xs: '100%', md: '30%' }}
                                    height="auto"
                                    overflow="hidden"
                                    mb={{ xs: 2, md: 0 }} // Margin bottom for small screens
                                >
                                    <img
                                        src="./optical_Image.svg"
                                        alt="Optical Image"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            objectFit: 'container',
                                            borderRadius: '6px',
                                        }}
                                    />
                                </Box>
                                {/* Text Section */}
                                <Box width="100%">
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontSize: { xs: '16px', md: '20px' }, // Adjusted font size
                                            fontWeight: 600,
                                            lineHeight: { xs: '24px', md: '28px' }, // Adjusted line height
                                            color: '#FFFFFF',
                                            mb: '8px',
                                            textAlign: 'center', // Center text
                                        }}
                                    >
                                        Meeting All Needs
                                    </Typography>
                                    <Button
                                        component="a"
                                        href="/products"
                                        variant="contained"
                                        endIcon={<ArrowForwardIcon />}
                                        sx={{
                                            color: '#0462B6',
                                            backgroundColor: '#FFFFFF',
                                            textTransform: 'none',
                                            padding: '5px 10px',
                                            fontSize: { xs: '12px', md: '14px' },
                                            mt: '16px',
                                            '&:hover': {
                                                backgroundColor: '#E4E7E9',
                                                transform: 'scale(1.05)', // Hover effect: zoom
                                            },
                                        }}
                                    >
                                        View All
                                    </Button>
                                </Box>
                            </Card>

                            {/* Lower Section */}
                            <Card
                                elevation={3}
                                sx={{
                                    backgroundColor: '#F2F4F5',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: 3,
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    boxShadow: '0px 4px 12px 0px rgba(0,0,0,0.1)', // Adjusted shadow
                                }}
                            >
                                <Box
                                    display="flex"
                                    flexDirection={{ xs: 'column', md: 'row' }}
                                    justifyContent="space-between"
                                    alignItems="center"
                                    width="100%"
                                >
                                    {/* Image Section */}
                                    <Box width={{ xs: '30%', md: '30%' }} height="auto" mr={2} mb={{ xs: 2, md: 0 }}>
                                        <img
                                            src="./lenses_Cover.png"
                                            alt="Lenses"
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                objectFit: 'cover',
                                                borderRadius: '6px',
                                            }}
                                        />
                                    </Box>
                                    {/* Text Section */}
                                    <Box width={{ xs: '70%', md: '70%' }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontSize: { xs: '16px', md: '20px' }, // Adjusted font size
                                                fontWeight: 600,
                                                lineHeight: { xs: '24px', md: '38px' }, // Adjusted line height
                                                color: '#191C1F',
                                                mb: '16px',
                                                textAlign: { xs: 'center', md: 'left' }, // Adjusted text alignment
                                            }}
                                        >
                                            Optical Accessories
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            endIcon={<ArrowForwardIcon />}
                                            sx={{
                                                textAlign: "left",
                                                textTransform: 'none',
                                                padding: '6px 14px',
                                                fontSize: { xs: '14px', md: '16px' },
                                                backgroundColor: '#FA8232',
                                                color: '#FFFFFF',
                                                '&:hover': {
                                                    backgroundColor: '#FF974A',
                                                    transform: 'scale(1.05)', // Hover effect: zoom
                                                },
                                            }}
                                        >
                                            View All
                                        </Button>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>


            <Container maxWidth="lg" sx={{ mt: 4, mb: 2 }}>
                <Grid
                    container
                    sx={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E4E7E9',
                        borderRadius: '8px',
                        padding: { xs: '12px', md: '22px' }, // Adjusted padding for responsiveness
                        display: 'flex',
                        justifyContent: { xs: 'center', md: 'space-between' }, // Center on small screens, space-between on larger
                        alignItems: 'center', // Vertically center the items
                        gap: { xs: 2, md: 4 }, // Added space between items
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        flexWrap: { xs: 'wrap', md: 'nowrap' }, // Wrap on small screens, no wrap on large
                    }}
                >
                    {/* Section 1: Deals */}
                    <Grid
                        item
                        xs={12}
                        sm={2}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2, // Space between icon and text
                            justifyContent: { xs: 'center', md: 'flex-start' }, // Center on small, left-align on large
                            textAlign: { xs: 'center', md: 'left' }, // Center text on small screens
                        }}
                    >
                        <LocalOfferIcon sx={{ color: '#0462B6', fontSize: '30px' }} />
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: { xs: '14px', md: '16px' },
                                    fontWeight: 600,
                                    lineHeight: '22px',
                                    color: '#191C1F',
                                    mb: '4px',
                                }}
                            >
                                Get Great Deals!
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    color: '#5F6C72',
                                }}
                            >
                                Sample Text
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Vertical Divider */}
                    <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' }, mx: 2 }} />

                    {/* Section 2: Achievements */}
                    <Grid
                        item
                        xs={12}
                        sm={2}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            justifyContent: { xs: 'center', md: 'flex-start' },
                            textAlign: { xs: 'center', md: 'left' },
                        }}
                    >
                        <EmojiEventsIcon sx={{ color: '#FF974A', fontSize: '30px' }} />
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: { xs: '14px', md: '16px' },
                                    fontWeight: 600,
                                    lineHeight: '22px',
                                    color: '#191C1F',
                                    mb: '4px',
                                }}
                            >
                                Our Achievement
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    color: '#5F6C72',
                                }}
                            >
                                Sustained Growth
                            </Typography>
                        </Box>
                    </Grid>

                    <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' }, mx: 2 }} />

                    {/* Section 3: Download PDF */}
                    <Grid
                        item
                        xs={12}
                        sm={2}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            justifyContent: { xs: 'center', md: 'flex-start' },
                            textAlign: { xs: 'center', md: 'left' },
                        }}
                    >
                        <PictureAsPdfIcon sx={{ color: '#D32F2F', fontSize: '30px' }} />
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: { xs: '14px', md: '16px' },
                                    fontWeight: 600,
                                    lineHeight: '22px',
                                    color: '#191C1F',
                                    mb: '4px',
                                }}
                            >
                                Download PDF
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    color: '#5F6C72',
                                }}
                            >
                                More Information!
                            </Typography>
                        </Box>
                    </Grid>

                    <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' }, mx: 2 }} />

                    {/* Section 4: Support */}
                    <Grid
                        item
                        xs={12}
                        sm={2}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            justifyContent: { xs: 'center', md: 'flex-start' },
                            textAlign: { xs: 'center', md: 'left' },
                        }}
                    >
                        <SupportAgentIcon sx={{ color: '#4CAF50', fontSize: '30px' }} />
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: { xs: '14px', md: '16px' },
                                    fontWeight: 600,
                                    lineHeight: '22px',
                                    color: '#191C1F',
                                    mb: '4px',
                                }}
                            >
                                Support 24/7
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    color: '#5F6C72',
                                }}
                            >
                                Live contact/message
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>





            <Container maxWidth="lg" sx={{ mt: 5, p: 2 }}>
                <Grid container spacing={4} alignItems="center">
                    {/* Text Content Section */}
                    <Grid item xs={12} md={6} sx={{ px: { xs: 2, md: 5 }, py: { xs: 4, md: 6 } }}>
                        <Box>
                            {/* Heading */}
                            <Typography
                                variant="h1"
                                component="h1"
                                sx={{
                                    fontSize: { xs: '32px', md: '48px' },
                                    fontWeight: 700,
                                    lineHeight: { xs: '35px', md: '55px' },
                                    color: '#2C2C2C',
                                    mb: { xs: 1.5, md: 2 },
                                }}
                            >
                                {pageHome?.section_two_heading}
                            </Typography>

                            {/* Subheading */}
                            <Typography
                                variant="h2"
                                component="h2"
                                sx={{
                                    fontSize: { xs: '20px', md: '24px' },
                                    fontWeight: 600,
                                    lineHeight: { xs: '28px', md: '32px' },
                                    color: '#232536',
                                    mb: { xs: 1.5, md: 2 },
                                }}
                            >
                                {pageHome?.section_two_subheading}
                            </Typography>

                            {/* Paragraph */}
                            <Typography
                                variant="body1"
                                component="p"
                                sx={{
                                    fontSize: { xs: '14px', md: '16px' },
                                    fontWeight: 400,
                                    lineHeight: { xs: '22px', md: '28px' },
                                    color: '#5F6C72',
                                    mb: 3,
                                }}
                            >
                                {pageHome?.section_two_description?.slice(0, 596)}....
                            </Typography>

                            {/* CTA Button */}
                            <Button
                                component={Link}
                                to="/about"
                                variant="contained"
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    textTransform: 'none',
                                    padding: { xs: '8px 16px', md: '10px 20px' },
                                    fontSize: { xs: '14px', md: '16px' },
                                    backgroundColor: '#FA8232',
                                    color: '#FFFFFF',
                                    '&:hover': { backgroundColor: '#e67a2a' },
                                }}
                            >
                                View All
                            </Button>
                        </Box>
                    </Grid>

                    {/* Image Section */}
                    <Grid item xs={12} md={6} sx={{ px: { xs: 2, md: 5 }, py: { xs: 4, md: 6 } }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                            }}
                        >
                            <img
                                src={baseUrl + pageHome?.section_two_image}
                                alt="Placeholder"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* Product Section */}
            <Grid sx={{ background: "#FAFAFA", py: 2 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        {/* Title */}
                        <Grid item xs={12} sx={{ p: 2 }}>
                            <Typography
                                sx={{
                                    fontSize: '24px',
                                    fontWeight: 600,
                                    lineHeight: '32px',
                                    textAlign: 'left',
                                    color: "#0462B6",
                                    mb: 3,
                                }}
                            >
                                Our Products
                            </Typography>
                        </Grid>

                        {/* Product Cards */}
                        {cardDetails.slice(0, 8).map((item, index) => (
                            <Grid
                                item
                                xs={12} sm={6} md={4} lg={3} mb={4}
                                key={index}
                                display="flex"
                                justifyContent="center"

                            >
                                <Card
                                    sx={{
                                        width: '100%',
                                        border: '1px solid #E4E7E9',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        p: 2,
                                        height: '100%',
                                    }}
                                >
                                    {/* Image Section (Clickable) */}
                                    <Box sx={{
                                        width: '100%', height: 'auto', mb: 2, overflow: 'hidden',  // Ensure the image doesn't overflow the container
                                        '&:hover img': {
                                            transform: 'scale(1.1)',  // Zoom on hover
                                        },
                                    }}>
                                        <Link to={`/products_Detail/${item.id}`}>
                                            <img
                                                src={baseUrl + item?.product_image[0]?.image}
                                                alt="Product Image"
                                                style={{
                                                    width: '100%', objectFit: 'cover', height: '150px', transition: 'transform 0.3s ease',  // Smooth transition for zoom
                                                    '&:hover': {
                                                        transform: 'scale(1.1)',  // Zoom on hover
                                                    },
                                                }}
                                            />
                                        </Link>
                                    </Box>

                                    {/* Middle Section: Product Name & Description */}
                                    <Box sx={{ flexGrow: 1, textAlign: 'center', mb: 1 }}>
                                        <Typography
                                            sx={{
                                                fontSize: '16px',
                                                fontWeight: 400,
                                                lineHeight: '20px',
                                                color: "#191C1F",
                                                mb: 2,
                                            }}
                                        >
                                            {item?.product_name}
                                        </Typography>
                                        <Typography variant="body2">
                                            {item.short_description.length > 150
                                                ? `${item.short_description.slice(0, 150)}...`
                                                : item.short_description}
                                        </Typography>

                                    </Box>

                                    {/* Footer Section: Button */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            mb: 1,
                                        }}
                                    >
                                        <Button
                                            to={`/products_Detail/${item.id}`}
                                            component={Link}
                                            variant="contained"
                                            sx={{
                                                textTransform: 'none',
                                                padding: '5px 15px',
                                                fontSize: '14px',
                                                backgroundColor: '#FA8232',
                                                color: '#FFFFFF',
                                            }}
                                        >
                                            View All
                                        </Button>
                                    </Box>

                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Grid>

            <Grid sx={{ background: "#FFF", py: 2 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={2}> {/* Adjusted spacing to 4 for proper gaps */}
                        {/* Title */}
                        <Grid item xs={12} sx={{ p: 2 }}>
                            <Typography
                                sx={{
                                    fontSize: '24px',
                                    fontWeight: 600,
                                    lineHeight: '32px',
                                    textAlign: 'left',
                                    color: "#0462B6",
                                    mb: 3,
                                }}
                            >
                                Worldwide Office
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>

            </Grid>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <WorldMap />
            </Container>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <CompanyCarousel />
            </Container>
            <Modal />
            <ChatBot />

        </>
    );
};

export default MyComponent;