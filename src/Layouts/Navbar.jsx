import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    AppBar, Toolbar, Container, Box, Typography, Stack, Button, FormControl, MenuItem, Select,
    OutlinedInput, IconButton, Divider, Avatar, Tooltip
} from '@mui/material';
import { SearchOffOutlined, HeadsetMic as HeadsetMicIcon, Phone as PhoneIcon } from '@mui/icons-material';
import { Twitter as TwitterIcon, Facebook as FacebookIcon, Pinterest as PinterestIcon, Reddit as RedditIcon, YouTube as YouTubeIcon, Instagram as InstagramIcon } from '@mui/icons-material';



const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const Navbar = () => {

    const location = useLocation();  // To get the current path for active class

    const pages = [
        { name: 'Home', path: '/' },
        { name: 'Product', path: '/products' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact Us', path: '/contact' },
    ];
    const [age, setAge] = React.useState('');
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none', borderTop: '2px solid #0462B6' }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        {/* Category dropdown */}
                        <FormControl sx={{ m: 1, minWidth: { xs: 100, sm: 150 } }} size="small">
                            <Select
                                value={age}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                sx={{ borderColor: '#0462B6', borderRadius: 0 }}
                            >
                                <MenuItem value="">
                                    <em>All Categories</em>
                                </MenuItem>
                                {/* Add categories here */}
                            </Select>
                        </FormControl>

                        {/* Page Links */}
                        <Box sx={{ flexGrow: 1, ml: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            {pages.map((page) => (
                                <Button
                                    key={page.name}
                                    component={Link}
                                    to={page.path}
                                    sx={{
                                        color: '#0462B6',
                                        fontWeight: 'bold',
                                        fontSize: { xs: '12px', md: '14px' },
                                        '&:hover': { backgroundColor: '#f0f0f0' },
                                        '&.active': { borderBottom: '3px solid #0462B6' },
                                        ...(location.pathname === page.path && { borderBottom: '3px solid #0462B6' }), // Active link styling
                                    }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>

                        {/* Customer Support and Phone Number */}
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 2, sm: 4 }}
                            alignItems="center"
                            sx={{ textAlign: { xs: 'center', sm: 'left' } }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <HeadsetMicIcon sx={{ color: '#FA8232' }} />
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: 400,
                                        lineHeight: '20px',
                                        color: '#5F6C72',
                                    }}
                                >
                                    Customer Support
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PhoneIcon sx={{ color: '#FA8232' }} />
                                <Typography
                                    sx={{
                                        fontSize: '16px',
                                        fontWeight: 400,
                                        lineHeight: '24px',
                                        color: '#191C1F',
                                    }}
                                >
                                    +91-999-999-9999
                                </Typography>
                            </Box>
                        </Stack>
                    </Toolbar>
                </Container>
                <Divider component="li" mb={4} />
            </AppBar>
        </>
    )
}

export default Navbar
