import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Divider, IconButton, OutlinedInput, Stack, Typography } from '@mui/material';
import { SearchOffOutlined, Person, PersonAdd } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import MainSVG from '../SVG/MainSVG';
import { getContacts } from '../Utils/Apis';
import { toast } from 'react-hot-toast';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeButton, setActiveButton] = useState(null);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const [contact, setContact] = useState('');

    useEffect(() => {
        Contact();
    }, []);

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

    const handleActiveButton = (buttonType) => {
        setActiveButton(buttonType);
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ p: 2 }}>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    sx={{ justifyContent: 'space-between', alignItems: 'center', textAlign: { xs: 'center', sm: 'left' } }}
                    spacing={{ xs: 2, sm: 0 }}
                >
                    <Typography variant="body2" sx={{ color: '#fff' }}>
                        Welcome to Osna Electronics Pvt Ltd
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ justifyContent: { xs: 'center', sm: 'flex-end' } }}>
                        <Typography variant="body2" sx={{ color: '#fff' }}>
                            Follow us:
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
                                        // backgroundColor: '#FFFFFF',
                                        color: '#fff',
                                        // borderRadius: '50%',
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
                    </Stack>
                </Stack>
            </Box>

            <Divider sx={{ color: '#fff' }} />

            {/* Logo, Search bar, Log In/Sign Up */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 1,
                    gap: { xs: 2, md: 0 },
                }}
            >
                <MainSVG sx={{ maxWidth: '150px' }} />

                {/* Search bar */}
                <Box
                    sx={{
                        display: 'flex',
                        backgroundColor: '#fff',
                        overflow: 'hidden',
                        width: { xs: '100%', md: '40%' },
                        height: '42px',
                    }}
                >
                    <OutlinedInput
                        type="text"
                        id="search"
                        onChange={handleSearchChange}
                        placeholder="Search for anything..."
                        sx={{
                            flex: 1,
                            '.MuiOutlinedInput-notchedOutline': { borderColor: 'transparent !important' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent !important' },
                        }}
                    />
                    <Button
                        to={`/search_result?search_term=${encodeURIComponent(searchTerm)}`}
                        component={Link}
                        sx={{
                            backgroundColor: '#fff',
                            borderRadius: '0 1px 1px 0',
                            '&:hover': { backgroundColor: '#fff' },
                        }}
                    >
                        <SearchOffOutlined sx={{ color: '#0462B6' }} />
                    </Button>
                </Box>

                {/* Log In and Sign Up Buttons with Icons */}
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    <Button
                        onClick={() => handleActiveButton('login')}
                        sx={{
                            backgroundColor: activeButton === 'login' ? '#FA8232' : 'transparent',
                            color: activeButton === 'login' ? '#fff' : '#fff',
                            '&:hover': { backgroundColor: '#FA8232', color: '#fff' },
                            borderRadius: '20px',
                            textTransform: 'none',
                        }}
                        startIcon={<Person />}
                    >
                        Log In
                    </Button>
                    <Button
                        to='/signup'
                        component={Link}
                        onClick={() => handleActiveButton('signup')}
                        sx={{
                            backgroundColor: activeButton === 'signup' ? '#FA8232' : 'transparent',
                            color: activeButton === 'signup' ? '#fff' : '#fff',
                            '&:hover': { backgroundColor: '#FA8232', color: '#fff' },
                            borderRadius: '20px',
                            textTransform: 'none',
                        }}
                        startIcon={<PersonAdd />}
                    >
                        Sign Up
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
};

export default Header;
