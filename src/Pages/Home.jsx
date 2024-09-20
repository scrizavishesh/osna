import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'; // Use Grid from MUI for responsive layouts
import Card from '@mui/material/Card'; // Replaced Paper with Card
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Header from '../Layouts/Header'
import Navbar from "../Layouts/Navbar"
import { Divider, Icon } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Footer from '../Layouts/Footer';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const MyComponent = () => {
    const cards = new Array(10).fill(null);

    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Grid sx={{ bgcolor: '#0462B6' }}>
                <Header />
            </Grid>
            <Navbar />

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box sx={{ padding: '20px' }}>
                    <Grid container spacing={4}>
                        {/* Left Section */}
                        <Grid item xs={12} md={8}>
                            <Card
                                elevation={3}
                                sx={{
                                    backgroundColor: '#F2F4F5',
                                    border: '1px solid #E4E7E9',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    p: 4,
                                    flexGrow: 1,
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
                                            fontSize={{ xs: '24px', md: '43px' }}
                                            lineHeight="56px"
                                            gutterBottom
                                        >
                                            Detect the difference
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            fontSize={{ xs: '14px', md: '16px' }}
                                            lineHeight="24px"
                                            mb={3}
                                        >
                                            With our innovative sensors and vision cameras, we accompany your transformation into a digital factory. Whether for the identification or inspection of objects, positioning tasks in the robotics industry, or numerous other sensor tasks, we offer simple and reliable solutions using state-of-the-art technologies, designed with modern interfaces for integration into future-oriented infrastructure.
                                        </Typography>
                                        <Button
                                            component={Link}
                                            to="/products"
                                            variant="contained"
                                            endIcon={<ArrowForwardIcon />}
                                            sx={{
                                                textTransform: 'none',
                                                padding: '10px 20px',
                                                fontSize: { xs: '14px', md: '16px' },
                                                backgroundColor: '#FA8232',
                                                color: '#FFFFFF',
                                            }}
                                        >
                                            View All
                                        </Button>
                                    </Box>

                                    {/* Image Section */}
                                    <Box width={{ xs: '100%', md: '35%' }} height="auto">
                                        <img
                                            src="./first_main.svg"
                                            alt="Placeholder"
                                            style={{ width: '100%', objectFit: 'cover', height: 'auto' }}
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
                                    padding: '16px',
                                    position: 'relative',
                                    flexGrow: 1,
                                    p:4
                                }}
                            >
                                <Box
                                    display="flex"
                                    flexDirection={{ xs: 'column', md: 'row' }}
                                    alignItems="center"
                                    justifyContent="space-between"
                                    width="100%"
                                >
                                    {/* Text Section */}
                                    <Box width={{ xs: '100%', md: '60%' }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontSize: { xs: '20px', md: '30px' },
                                                fontWeight: 600,
                                                lineHeight: '39px',
                                                color: '#FFFFFF',
                                                padding: '8px',
                                                mb: '16px',
                                            }}
                                        >
                                            Meeting All Needs
                                        </Typography>
                                        <Button
                                            component={Link}
                                            to="/products"
                                            variant="contained"
                                            endIcon={<ArrowForwardIcon />}
                                            sx={{
                                                color: '#0462B6',
                                                backgroundColor: '#FFFFFF',
                                                textTransform: 'none',
                                                padding: '10px 20px',
                                                mt: '16px',
                                            }}
                                        >
                                            View All
                                        </Button>
                                    </Box>

                                    {/* Image Section */}
                                    <Box
                                        position="relative"
                                        width={{ xs: '100%', md: '30%' }}
                                        height="auto"
                                        overflow="hidden"
                                    >
                                        <img
                                            src="./optical_Image.svg"
                                            alt="Optical Image"
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                objectFit: 'cover',
                                                boxShadow: '0px 4px 12px 0px #00000033',
                                            }}
                                        />
                                    </Box>
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
                                    padding: '16px',
                                    flexGrow: 1,
                                    mt: 4, // Add spacing between cards
                                }}
                            >
                                {/* Image Section */}
                                <Box
                                    width={{ xs: '30%', md: '30%' }}
                                    height="auto"
                                    mr={2}
                                    position="relative"
                                >
                                    <img
                                        src="./lenses_Cover.png"
                                        alt="Lenses"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            objectFit: 'cover',
                                            boxShadow: '0px 4px 8px 0px #00000040',
                                        }}
                                    />
                                </Box>
                                {/* Text Section */}
                                <Box width={{ xs: '70%', md: '70%' }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontSize: { xs: '20px', md: '30px' },
                                            fontWeight: 600,
                                            lineHeight: '39px',
                                            color: '#191C1F',
                                            padding: '8px',
                                            mb: '16px',
                                        }}
                                    >
                                        Optical Accessories
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        endIcon={<ArrowForwardIcon />}
                                        sx={{
                                            textTransform: 'none',
                                            padding: '10px 20px',
                                            fontSize: { xs: '14px', md: '16px' },
                                            backgroundColor: '#FA8232',
                                            color: '#FFFFFF',
                                        }}
                                    >
                                        View All
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>




            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Grid
                    container
                    sx={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E4E7E9',
                        borderRadius: '6px',
                        padding: '16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <LocalOfferIcon />
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    lineHeight: '20px',
                                    textAlign: 'left',
                                    color: '#191C1F',
                                    padding: '4px 8px',
                                }}
                            >
                                Get Great Deals!
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    lineHeight: '20px',
                                    textAlign: 'left',
                                    color: '#5F6C72',
                                    marginTop: '4px',
                                }}
                            >
                                Sample Text
                            </Typography>
                        </Box>
                    </Grid>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <EmojiEventsIcon />
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    lineHeight: '20px',
                                    textAlign: 'left',
                                    color: '#191C1F',
                                    padding: '4px 8px',
                                }}
                            >
                                Our achievement
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    lineHeight: '20px',
                                    textAlign: 'left',
                                    color: '#5F6C72',
                                    marginTop: '4px',
                                }}
                            >
                                Sustained Growth.
                            </Typography>
                        </Box>
                    </Grid>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PictureAsPdfIcon />
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    lineHeight: '20px',
                                    textAlign: 'left',
                                    color: '#191C1F',
                                    padding: '4px 8px',
                                }}
                            >
                                Download Pdf
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    lineHeight: '20px',
                                    textAlign: 'left',
                                    color: '#5F6C72',
                                }}
                            >
                                More Information!
                            </Typography>
                        </Box>
                    </Grid>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <SupportAgentIcon />
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    lineHeight: '20px',
                                    textAlign: 'left',
                                    color: '#191C1F',
                                    padding: '4px 8px',
                                }}
                            >
                                Support 24/7
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    lineHeight: '20px',
                                    textAlign: 'left',
                                    color: '#5F6C72',
                                }}
                            >
                                Live contact/message
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <Container maxWidth="lg" sx={{ mt: 4 }} spacing={2}>
                <Grid container >
                    <Grid xs={12} md={6} sx={{ p: 5 }}>
                        <Box>
                            <Typography

                                sx={{
                                    fontSize: { xs: '36px', md: '48px' },
                                    fontWeight: 700,
                                    lineHeight: { xs: '48px', md: '64px' },
                                    color: '#191C1F',
                                    mb: 2,
                                }}
                            >
                                We are Osna
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: { xs: '18px', md: '24px' },
                                    fontWeight: 700,
                                    lineHeight: { xs: '24px', md: '32px' },
                                    color: '#191C1F',
                                    mb: 2,
                                }}
                            >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: { xs: '14px', md: '16px' },
                                    fontWeight: 400,
                                    lineHeight: { xs: '24px', md: '28px' },
                                    color: '#191C1F',
                                    mb: 3,
                                }}
                            >
                                In the more than 30 years of our existence we have made an international name for ourselves as an innovative sensor company. For example, we are the technological leader in the market of industrial image processing with our VISOR® series or in many areas of optical sensors. Whether switching sensor or vision sensor - users particularly appreciate the well thought-out, practical functionality of our products as well as their easy setup and operation.
                            </Typography>

                            <Button
                                component={Link}
                                to="/about"
                                variant="contained"
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    textTransform: 'none',
                                    padding: '10px 20px',
                                    fontSize: { xs: '14px', md: '16px' },
                                    backgroundColor: '#FA8232',
                                    color: '#FFFFFF',
                                }}

                            >
                                View All
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ p: 5 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                mb: 4
                            }}
                        >
                            <img
                                src="./main_page_metting.svg"
                                alt="Placeholder"
                                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <Grid sx={{ background: "#FAFAFA", py: 2 }}>
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
                                Our Products
                            </Typography>
                        </Grid>

                        {/* Cards */}
                        {cards.map((_, index) => (
                            <Grid
                                item
                                xs={12} sm={6} md={4} lg={2.4} mb={4}  // Responsive card sizes
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
                                        alignItems: 'center',
                                        p: 2,
                                        height: '100%',
                                        mb: 2
                                    }}
                                >
                                    <Box sx={{ width: '100%', height: 'auto', mb: 2 }}>
                                        <img
                                            src="./first_main.svg"
                                            alt="Product Image"
                                            style={{ width: '100%', objectFit: 'cover', height: 'auto' }}
                                        />
                                    </Box>
                                    <Typography
                                        sx={{
                                            fontSize: '16px',
                                            fontWeight: 400,
                                            lineHeight: '20px',
                                            textAlign: 'center',
                                            color: "#191C1F",
                                            mb: 2,
                                        }}
                                    >
                                        Our Products
                                    </Typography>
                                    <Button
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
                <Grid>
                    <Box sx={{ width: '100%', height: 'auto', mb: 2 }}>
                        <img
                            src="./earth_map.svg"
                            alt="Product Image"
                            style={{ width: '100%', objectFit: 'cover', height: 'auto' }}
                        />
                    </Box>
                </Grid>
            </Grid>

            <Footer />

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography></Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Typography
                        sx={{
                            fontSize: '20px',
                            fontWeight: 600,
                            lineHeight: '28px',
                            textAlign: 'center',
                            color: "#191c1f",
                            mb: 3
                        }}
                    >
                        Profile Details
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '14px',
                            fontWeight: 400,
                            lineHeight: '20px',
                            textAlign: 'center',
                            color: "#5f6c72",
                            mb: 3
                        }}
                    >
                        Lorem Ipsum is simply dummy text of the printing and
                        <br />

                    </Typography>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField label="Full Name" variant="outlined" fullWidth />
                        <TextField label="Email Id" variant="outlined" fullWidth />
                        <TextField label="Phone Number" variant="outlined" fullWidth />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                    <Button
                        variant="contained"
                        color="warning"
                        sx={{ width: '100%', maxWidth: '200px', fontWeight: 'bold' }}
                    >
                        SUBMIT →
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );
};

export default MyComponent;