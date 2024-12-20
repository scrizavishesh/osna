import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Container, Box, Typography, Stack, Button, FormControl, MenuItem, Select, Divider, IconButton, Menu } from '@mui/material';
import { HeadsetMic as HeadsetMicIcon, Phone as PhoneIcon, Menu as MenuIcon } from '@mui/icons-material';
import { getCategoryNames } from '../Utils/Apis';
import { toast } from 'react-hot-toast';
import { Grid } from '@mui/system';

const Navbar = () => {
    const location = useLocation();
    const pages = [
        { name: 'Home', path: '/' },
        { name: 'Product', path: '/products' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'Events', path: '/events' },
        { name: 'Career', path: '/career' },
    ];

    const [category, setCategory] = useState('');
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [categoryNames, setCategoryNames] = useState([]);

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    useEffect(() => {
        CategoryByNames();
    }, []);

    const CategoryByNames = async () => {
        try {
            const response = await getCategoryNames();
            if (response?.status === 200) {
                setCategoryNames(response?.data?.data?.category_list);
            } else {
                toast.error("Failed to fetch categories");
            }
        } catch (err) {
            toast.error(err?.message);
        }
    };

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none', borderTop: '2px solid #0462B6' }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{
                        display: "flex",
                        justifyContent: "space-around",
                    }}>

                        <Grid display="flex" >
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
                                    value={category}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    sx={{ borderColor: '#0462B6', borderRadius: 0 }}
                                >
                                    <MenuItem value="">
                                        <em>All Categories</em>
                                    </MenuItem>
                                    {categoryNames.map((cat) => (
                                        <MenuItem key={cat.id} value={cat.category_name}>
                                            <Button
                                                component={Link}
                                                to={`/categories?category_id=${encodeURIComponent(cat.id)}`}
                                                sx={{
                                                    color: '#0462B6',
                                                    textTransform: 'none',
                                                    fontWeight: 'bold',
                                                    fontSize: '14px',
                                                    '&:hover': { backgroundColor: '#f0f0f0' }
                                                }}
                                            >
                                                {cat.category_name}
                                            </Button>
                                        </MenuItem>
                                    ))}
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
                        </Grid>
                        {/* Customer Support and Phone Number - Visible on all screen sizes */}
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 4 }}
                            alignItems="center"
                            sx={{ textAlign: { xs: 'center', sm: 'left' } }}
                        >

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PhoneIcon sx={{ color: '#FA8232' }} />
                                <Typography
                                component={'a'}
                                href='tel:+91-11-4102 3751'
                                    sx={{
                                        fontSize: { xs: '14px', sm: '16px' },
                                        fontWeight: 400,
                                        lineHeight: '24px',
                                        color: '#191C1F',
                                        textDecoration: 'none'
                                    }}
                                >
                                    +91-11-4102 3751
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
