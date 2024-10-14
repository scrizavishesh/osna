import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, IconButton, Container, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getCategoryNames, getContacts } from '../Utils/Apis';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import MainSVG from '../SVG/MainSVG';

const Footer = () => {


    const pages = [
        { name: 'Home', path: '/' },
        { name: 'Product', path: '/products' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'Events', path: '/events' },
    ];


    const [contact, setContact] = useState('');
    const [categoryNames, setCategoryNames] = useState([]);


    useEffect(() => {
        Contact();
        CategoryByNames();
    }, [])

    const CategoryByNames = async () => {
        try {
            const response = await getCategoryNames();
            if (response?.status === 200) {
                setCategoryNames(response?.data?.data);
            } else {
                toast.error("Failed to fetch categories");
            }
        } catch (err) {
            toast.error(err?.message);
        }
    };


    const Contact = async () => {
        try {
            const response = await getContacts();
            console.log(response, "get Contact");
            if (response?.status === 200) {
                toast.success("Get Contact");
                setContact(response?.data?.data[0]);
            } else {
                toast.error("Failed to fetch categories");
            }
        } catch (err) {
            toast.error(err?.message);
        }
    };


    return (
        <Box component="footer" sx={{ backgroundColor: '#0462B6', color: 'white', pt: 4, pb: 2, mt: 4 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="center">
                    {/* Logo and Contact Information */}
                    <Grid item xs={12} md={3}>
                        <Grid sx={{ flexGrow: 1 }}>
                            <Link to="/">
                                <MainSVG sx={{ maxWidth: '150px' }} />
                            </Link>
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

                            {/* Phone Number */}
                            <Typography
                                component="a" // Makes it clickable
                                href={`tel:${contact?.contact_phone_number}`} // Opens phone dialer
                                sx={{
                                    fontSize: '18px',
                                    fontWeight: 500,
                                    lineHeight: '24px',
                                    textAlign: 'left',
                                    color: "#FFFFFF",
                                    mb: 1,
                                    textDecoration: 'none', // Remove underline from link
                                }}
                            >
                                {contact?.contact_phone_number}
                            </Typography>
                            <Divider sx={{ backgroundColor: '#FFFFFF', my: 1 }} />

                            {/* Address */}
                            <Typography
                                component="a" // Makes it clickable
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact?.contact_address)}`} // Opens Google Maps
                                target="_blank" // Opens in a new tab
                                rel="noopener noreferrer" // Ensures security when opening a new tab
                                sx={{
                                    fontSize: '15px',
                                    fontWeight: 400,
                                    lineHeight: '20px',
                                    textAlign: 'left',
                                    color: "#FFFFFF",
                                    mb: 1,
                                    textDecoration: 'none', // Remove underline from link
                                }}
                            >
                                {contact?.contact_address}
                            </Typography>
                            <Divider sx={{ backgroundColor: '#FFFFFF', my: 1 }} />

                            {/* Email */}
                            <Typography
                                component="a" // Makes it clickable
                                href={`mailto:${contact?.contact_email}`} // Opens email client
                                sx={{
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    lineHeight: '24px',
                                    textAlign: 'left',
                                    color: "#FFFFFF",
                                    textDecoration: 'none', // Remove underline from link
                                }}
                            >
                                {contact?.contact_email}
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
                        {categoryNames.map((cat) => (
                            <Typography
                                component={Link}
                                to={`/categories?category_name=${encodeURIComponent(cat.category_name)}`}

                                sx={{
                                    display: "flex",
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    lineHeight: '20px',
                                    textAlign: 'left',
                                    textDecoration: "none",
                                    color: '#FFFFFF', // Highlight 'Accessories' category
                                    mb: 1,
                                }}
                            >
                                {cat.category_name}
                            </Typography>
                        ))}
                        <Typography
                            component={Link}
                            to='/products'
                            sx={{
                                fontSize: '14px',
                                fontWeight: 500,
                                lineHeight: '20px',
                                textAlign: 'left',
                                color: "#FFA163",
                                display: 'flex',
                                alignItems: 'center',
                                textDecoration: "none",
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
                        {pages.map((link, index) => (
                            <Typography
                                component={Link}
                                to={link.path}
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    lineHeight: '20px',
                                    textAlign: 'left',
                                    color: "#FFFFFF",
                                    mb: 1,
                                    textDecoration: 'none',
                                    display: 'flex'

                                }}
                            >
                                {link?.name}
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
                                { icon: <FacebookIcon />, href: `${contact?.facebook_url}` },
                                { icon: <TwitterIcon />, href: `${contact?.twitter_url}` },
                                { icon: <InstagramIcon />, href: `${contact?.instagram_url}` },
                                { icon: <LinkedInIcon />, href: `${contact?.linkedin_url}` },
                                { icon: <YouTubeIcon />, href: `${contact?.youtube_url}` },
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
