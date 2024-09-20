import React from 'react';
import { Box, Grid, Typography, Link, IconButton, Container, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Footer = () => {
    return (
        <Box component="footer" sx={{ backgroundColor: '#0462B6', color: 'white', pt: 4, pb: 2 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="center">
                    {/* Logo and Contact Information */}
                    <Grid item xs={12} md={3}>
                        <Grid sx={{ flexGrow: 1 }}>
                            <img src={'./logo-white 1.svg'} loading="lazy" alt="Company Logo" />
                        </Grid>
                        <Box mt={2}>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    lineHeight: '20px',
                                    textAlign: 'left',
                                    color: "#FFA163",
                                    mb: 1.5, // Space between heading and subheading
                                }}
                            >
                                Customer Support:
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '18px',
                                    fontWeight: 500,
                                    lineHeight: '24px',
                                    textAlign: 'left',
                                    color: "#FFFFFF",
                                    mb: 1,
                                }}
                            >
                                +91 999-999-9999
                            </Typography>
                            <Divider sx={{ backgroundColor: '#FFFFFF', my: 1 }} />
                            <Typography
                                sx={{
                                    fontSize: '15px',
                                    fontWeight: 400,
                                    lineHeight: '20px',
                                    textAlign: 'left',
                                    color: "#FFFFFF",
                                    mb: 1,
                                }}
                            >
                                A-4-5, A Block, Sector 16, Noida, Uttar Pradesh 201301
                            </Typography>
                            <Divider sx={{ backgroundColor: '#FFFFFF', my: 1 }} />
                            <Typography
                                sx={{
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    lineHeight: '24px',
                                    textAlign: 'left',
                                    color: "#FFFFFF",
                                }}
                            >
                                info@osna.com
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Top Categories */}
                    <Grid item xs={12} md={3}>
                        <Typography
                            sx={{
                                fontSize: '16px',
                                fontWeight: 600,
                                lineHeight: '24px',
                                textAlign: 'left',
                                color: "#FFA163",
                                mb: 2, // Space between heading and subheading
                            }}
                        >
                            Top Category
                        </Typography>
                        {['Computer & Laptop', 'SmartPhone', 'Headphone', 'Camera & Photo', 'TV & Homes'].map((category, index) => (
                            <Typography
                                key={index}
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    lineHeight: '20px',
                                    textAlign: 'left',
                                    color: index === 3 ? '#FFA163' : '#FFFFFF', // Highlight 'Accessories' category
                                    mb: 1,
                                }}
                            >
                                {category}
                            </Typography>
                        ))}
                        <Typography
                            sx={{
                                fontSize: '14px',
                                fontWeight: 500,
                                lineHeight: '20px',
                                textAlign: 'left',
                                color: "#FFA163",
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            Browse All Products
                            <ArrowForwardIcon sx={{ ml: 1, fontSize: '18px' }} />
                        </Typography>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={12} md={3}>
                        <Typography
                            sx={{
                                fontSize: '16px',
                                fontWeight: 600,
                                lineHeight: '24px',
                                textAlign: 'left',
                                color: "#FFA163",
                                mb: 2, // Space between heading and subheading
                            }}
                        >
                            Quick Links
                        </Typography>
                        {['Home', 'Product', 'About Us', 'Contact Us'].map((link, index) => (
                            <Typography
                                key={index}
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    lineHeight: '20px',
                                    textAlign: 'left',
                                    color: "#FFFFFF",
                                    mb: 1,
                                }}
                            >
                                {link}
                            </Typography>
                        ))}
                    </Grid>

                    {/* Social Links */}
                    <Grid item xs={12} md={3}>
                        <Typography
                            sx={{
                                fontSize: '16px',
                                fontWeight: 600,
                                lineHeight: '24px',
                                textAlign: 'left',
                                color: "#FFA163",
                                mb: 2, // Space between heading and subheading
                            }}
                        >
                            Connect With Us
                        </Typography>
                        <Box>
                            {[
                                { icon: <FacebookIcon />, href: '#' },
                                { icon: <TwitterIcon />, href: '#' },
                                { icon: <InstagramIcon />, href: '#' },
                                { icon: <LinkedInIcon />, href: '#' },
                                { icon: <YouTubeIcon />, href: '#' },
                            ].map((social, index) => (
                                <IconButton
                                    key={index}
                                    href={social.href}
                                    sx={{
                                        backgroundColor: '#FFFFFF',
                                        color: '#0462B6',
                                        borderRadius: '50%',
                                        width: '40px',
                                        height: '40px',
                                        mr: 1,
                                        '&:hover': {
                                            backgroundColor: '#FFA163',
                                            color: '#FFFFFF',
                                        },
                                    }}
                                >
                                    {social.icon}
                                </IconButton>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* Footer Bottom */}
            <Box sx={{ mt: 4, textAlign: 'center', py: 2, backgroundColor: '#014684' }}>
                <Typography variant="body2">
                    © 2024 Osna Electronics Pvt. Ltd. All Rights Reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;
