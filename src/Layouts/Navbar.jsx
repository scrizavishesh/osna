import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Container, Box, Typography, Stack, Button, FormControl, MenuItem, Select, Divider, IconButton, Menu } from '@mui/material';
import { HeadsetMic as HeadsetMicIcon, Phone as PhoneIcon, Menu as MenuIcon } from '@mui/icons-material';

const Navbar = () => {
    const location = useLocation();  // To get the current path for active class
    const pages = [
        { name: 'Home', path: '/' },
        { name: 'Product', path: '/products' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'Events', path: '/events' },
    ];

    const [age, setAge] = React.useState('');
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none', borderTop: '2px solid #0462B6' }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        {/* Hamburger menu for mobile */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon sx={{ color: '#0462B6' }} />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.name} onClick={handleCloseNavMenu} component={Link} to={page.path}>
                                        <Typography sx={{ textAlign: 'center', color: '#0462B6' }}>{page.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

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

                        {/* Page Links for desktop */}
                        <Box sx={{ flexGrow: 1, ml: 2, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
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

                        {/* Customer Support and Phone Number - Visible on all screen sizes */}
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 4 }}
                            alignItems="center"
                            sx={{ textAlign: { xs: 'center', sm: 'left' } }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <HeadsetMicIcon sx={{ color: '#FA8232' }} />
                                <Typography
                                    sx={{
                                        fontSize: { xs: '12px', sm: '14px' },
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
                                        fontSize: { xs: '14px', sm: '16px' },
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
    );
};

export default Navbar;
