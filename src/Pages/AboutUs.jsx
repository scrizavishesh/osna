import React from 'react';
import { Box, Grid, Typography, Card, Avatar, Container, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import Header from '../Layouts/Header';
import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';
import { display, spacing } from '@mui/system';

const teamMembers = [
    { name: 'Floyd Miles', role: 'Marketing Director', image: 'link-to-image', social: { fb: '#', tw: '#', ln: '#', ig: '#' } },
    { name: 'Dianne Russell', role: 'Customer Writer', image: 'link-to-image', social: { fb: '#', tw: '#', ln: '#', ig: '#' } },
    { name: 'Jenny Wilson', role: 'Web Developer', image: 'link-to-image', social: { fb: '#', tw: '#', ln: '#', ig: '#' } },
    { name: 'Leslie Alexander', role: 'Web Developer', image: 'link-to-image', social: { fb: '#', tw: '#', ln: '#', ig: '#' } },
    { name: 'Guy Hawkins', role: 'SEO Expert', image: 'link-to-image', social: { fb: '#', tw: '#', ln: '#', ig: '#' } },
    { name: 'Eleanor Pena', role: 'Customer Writer', image: 'link-to-image', social: { fb: '#', tw: '#', ln: '#', ig: '#' } },
    { name: 'Robert Fox', role: 'Business Development Executive', image: 'link-to-image', social: { fb: '#', tw: '#', ln: '#', ig: '#' } },
    { name: 'Jacob Jones', role: 'Principal', image: 'link-to-image', social: { fb: '#', tw: '#', ln: '#', ig: '#' } },
];

const AboutUs = () => {
    return (
        <>
            <Grid sx={{ bgcolor: '#0462B6' }}>
                <Header />
            </Grid>
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: 2 }}>
                <Box>
                    <Box sx={{ position: 'relative' }}>
                        {/* Text Section */}
                        <Box
                            sx={{
                                position: 'relative',
                                backgroundColor: 'rgba(255, 255, 255, 0.9)', // Light transparent background for readability
                                padding: '20px',
                                width: { xs: '95%', sm: '90%', md: '80%' }, // Responsive width
                                textAlign: 'left',
                                top: { xs: '20px', sm: '40px', md: '60px' }, // Adjust top padding for smaller screens
                                zIndex: 2,
                                left: { xs: '10px', sm: '40px', md: '80px' }, // Adjust position for smaller screens
                            }}
                        >
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: { xs: '32px', sm: '40px', md: '48px' }, // Responsive font size
                                    fontWeight: 700,
                                    lineHeight: { xs: '42px', sm: '56px', md: '64px' }, // Responsive line height
                                    color: '#2c2c2c',
                                    letterSpacing: '-2px',
                                    marginBottom: '16px',
                                }}
                            >
                                We are Osna
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: { xs: '14px', sm: '15px', md: '16px' }, // Responsive font size
                                    fontWeight: 400,
                                    lineHeight: { xs: '24px', sm: '26px', md: '28px' }, // Responsive line height
                                    color: '#4c4c4c',
                                }}
                            >
                                SensoPart is one of the leading manufacturers of photoelectric sensors and image processing for factory automation. Our aim is to remain one step ahead to be able to offer our customers the most innovative products on the market. In this way, we help them to pave the way to the digital factory. In order to maintain our ability to offer the latest technologies, we invest more than usual in research and development and work together with renowned universities and research institutes. Successful products, now considered indispensable for modern factory automation, have been created from the many future-oriented ideas of earlier days. But we do not simply rest on our laurels – because we still have many ideas for the future.
                            </Typography>
                        </Box>

                        {/* Image Section */}
                        <Box
                            sx={{
                                position: 'relative',
                                backgroundImage: 'url(./about_us_main.svg)', // Add the correct image path
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: { xs: '300px', sm: '350px', md: '400px' },  // Responsive height
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                paddingTop: { xs: '50px', sm: '60px', md: '80px' }, // Adjust padding for smaller screens
                            }}
                        >
                            {/* Statistics Section */}
                            <Box
                                sx={{
                                    position: 'relative',
                                    backgroundColor: '#FFD2B5', // Light transparent background for readability
                                    padding: '20px',
                                    textAlign: 'left',
                                    display: 'flex',
                                    flexDirection: { sm: 'row' }, // Stack items on smaller screens
                                    top: { xs: '180px', sm: '240px', md: '280px' },  // Responsive top positioning
                                    gap: 5,
                                    right: { xs: '10px', sm: '90px', md: '190px' },
                                }}
                            >
                                <Grid item xs={12} sm={4} textAlign="center">
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: { xs: '24px', md: '36px' } }}>
                                        1998
                                    </Typography>
                                    <Typography sx={{ fontSize: { xs: '14px', md: '16px' }, color: '#555' }}>Founding year</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4} textAlign="center">
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: { xs: '24px', md: '36px' } }}>
                                        585+
                                    </Typography>
                                    <Typography sx={{ fontSize: { xs: '14px', md: '16px' }, color: '#555' }}>Employees worldwide</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4} textAlign="center">
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: { xs: '24px', md: '36px' } }}>
                                        30+
                                    </Typography>
                                    <Typography sx={{ fontSize: { xs: '14px', md: '16px' }, color: '#555' }}>Distributors worldwide</Typography>
                                </Grid>
                            </Box>
                        </Box>

                        {/* Colored Bar Section */}
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: '1px',
                                width: { xs: '40%', sm: '30%', md: '20%' }, // Responsive width
                                padding: '10px',
                                backgroundColor: '#0462B6',
                                left: { xs: '20px', sm: '80px', md: '115px' }, // Responsive left position
                                zIndex: 1,
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: '1px',
                                width: { xs: '60%', sm: '55%', md: '50%' },  // Responsive width
                                left: { xs: '100px', sm: '220px', md: '350px' },  // Responsive left position
                                padding: '10px',
                                backgroundColor: '#FA8232',
                                zIndex: 1,
                            }}
                        />
                    </Box>

                    {/* Second Container: Mission and Vision */}
                    <Container sx={{ py: 6, bgcolor: '#f4f0f8' }}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    sx={{
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        lineHeight: '20px',
                                        color: "#2c2c2c",
                                        letterSpacing: "3px",
                                        mb: 2,
                                    }}
                                >
                                    Our Mission
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '28px',
                                        fontWeight: 700,
                                        lineHeight: '40px',
                                        color: "#232536",
                                        letterSpacing: "-1px",
                                        mb: 2,
                                    }}
                                >
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '16px',
                                        fontWeight: 400,
                                        lineHeight: '28px',
                                        color: "#6d6e76",
                                        letterSpacing: "3px",
                                        mb: 2,
                                    }}
                                >
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    sx={{
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        lineHeight: '20px',
                                        color: "#2c2c2c",
                                        letterSpacing: "3px",
                                        mb: 2,
                                    }}
                                >
                                    Our Mission
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '28px',
                                        fontWeight: 700,
                                        lineHeight: '40px',
                                        color: "#232536",
                                        letterSpacing: "-1px",
                                        mb: 2,
                                    }}
                                >
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '16px',
                                        fontWeight: 400,
                                        lineHeight: '28px',
                                        color: "#6d6e76",
                                        letterSpacing: "3px",
                                        mb: 2,
                                    }}
                                >
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>

                    {/* Third Container: Milestones */}
                    <Container sx={{ py: 6, mt: 3 }}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    sx={{
                                        fontSize: '36px',
                                        fontWeight: 700,
                                        lineHeight: '48px',
                                        color: "#232536",
                                        letterSpacing: "-2px",
                                        mb: 2,
                                    }}
                                >
                                    Milestones of product development
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '24px',
                                        fontWeight: 700,
                                        lineHeight: '32px',
                                        color: "#232536",
                                        // letterSpacing: "-2px",
                                        mb: 2,
                                    }}
                                >
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '16px',
                                        fontWeight: 700,
                                        lineHeight: '32px',
                                        color: "#232536",
                                        // letterSpacing: "-2px",
                                        mb: 2,
                                    }}
                                >
                                    In the more than 30 years of our existence we have made an international name for ourselves as an innovative sensor company. For example, we are the technological leader in the market of industrial image processing with our VISOR® series or in many areas of optical sensors. Whether switching sensor or vision sensor - users particularly appreciate the well thought-out, practical functionality of our products as well as their easy setup and operation
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
                                <Box
                                    component="img"
                                    src="./hand_sake.svg"
                                    alt="Milestones of product"
                                    sx={{ width: '100%', height: 'auto', zIndex: 1, position: 'relative' }}
                                />
                            </Grid>
                        </Grid>
                    </Container>

                    {/* Fourth Container: Milestones in the company’s history */}
                    <Container sx={{ py: 6 }}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
                                <Box
                                    component="img"
                                    src="./meeting.svg"
                                    alt="Milestones in history"
                                    sx={{ width: '100%', height: 'auto', zIndex: 1, position: 'relative' }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    sx={{
                                        fontSize: '36px',
                                        fontWeight: 700,
                                        lineHeight: '48px',
                                        color: "#232536",
                                        letterSpacing: "-2px",
                                        mb: 2,
                                    }}
                                >
                                    Milestones of product development
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '24px',
                                        fontWeight: 700,
                                        lineHeight: '32px',
                                        color: "#232536",
                                        // letterSpacing: "-2px",
                                        mb: 2,
                                    }}
                                >
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '16px',
                                        fontWeight: 700,
                                        lineHeight: '32px',
                                        color: "#232536",
                                        // letterSpacing: "-2px",
                                        mb: 2,
                                    }}
                                >
                                    In the more than 30 years of our existence we have made an international name for ourselves as an innovative sensor company. For example, we are the technological leader in the market of industrial image processing with our VISOR® series or in many areas of optical sensors. Whether switching sensor or vision sensor - users particularly appreciate the well thought-out, practical functionality of our products as well as their easy setup and operation
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>

                    {/* Fifth Container: Core Team */}
                    <Container sx={{ py: 6 }}>
                        <Typography variant="h4" align="center" sx={{ mb: 4 }}>Our Core Team Member</Typography>
                        <Grid container spacing={4}>
                            {teamMembers.map((member, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Card sx={{ p: 2, textAlign: 'center', background: "#F4F4F4" }}>
                                        <Avatar
                                            src="./women_profile.svg"
                                            alt={member.name}
                                            sx={{ width: 80, height: 80, margin: '0 auto 10px' }}
                                        />
                                        <Typography
                                            sx={{
                                                fontSize: '28px',
                                                fontWeight: 700,
                                                lineHeight: '40px',
                                                color: "#2c2c2c",
                                                letterSpacing: "-1px",
                                                mb: 2,
                                            }}>
                                            {member.name}</Typography>
                                        <Typography
                                            sx={{
                                                fontSize: '14px',
                                                fontWeight: 400,
                                                lineHeight: '20px',
                                                color: "#6d6e76",
                                                letterSpacing: "-1px",
                                                mb: 2,
                                            }}>{member.role}</Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                            <IconButton href={member.social.fb}>
                                                <Facebook />
                                            </IconButton>
                                            <IconButton href={member.social.tw}>
                                                <Twitter />
                                            </IconButton>
                                            <IconButton href={member.social.ln}>
                                                <LinkedIn />
                                            </IconButton>
                                            <IconButton href={member.social.ig}>
                                                <Instagram />
                                            </IconButton>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            </Container>
            <Footer />
        </>

    );
};

export default AboutUs;
