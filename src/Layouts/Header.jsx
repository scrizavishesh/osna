import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Divider, IconButton, OutlinedInput, Stack, Typography } from '@mui/material';
import { Person, PersonAdd } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import MainSVG from '../SVG/MainSVG';
import { getContacts, userLog_out } from '../Utils/Apis'; // Assuming you have a logoutAPI function in your Utils/Apis file
import { toast } from 'react-hot-toast';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Logout from '../SVG/Logout';
import Swal from "sweetalert2";

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeButton, setActiveButton] = useState(null);
    const token = localStorage.getItem('osna_token');
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const [contact, setContact] = useState('');
    



    useEffect(() => {
        Contact();
    }, []);

    const Log_out = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await userLog_out();
                    if (response?.status === 200) {
                        toast.success("Logged out successfully");
                        localStorage.removeItem("osna_token");
                        window.location.reload();
                    } else {
                        toast.error("Failed to log out");
                    }
                } catch (error) {
                    toast.error("Error logging out. Please try again.");
                }
            }
        });
    };

    const Contact = async () => {
        try {
            const response = await getContacts();
            if (response?.status === 200) {
                toast.success("Get Contact");
                setContact(response?.data?.data[0]);
            } else {
                toast.error("Failed to fetch contact details");
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
            <Box sx={{ p: 1 }}>
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
                                { icon: <FacebookIcon sx={{ fontSize: "1.3rem" }} />, href: `${contact?.facebook_url}` },
                                { icon: <TwitterIcon sx={{ fontSize: "1.3rem" }} />, href: `${contact?.twitter_url}` },
                                { icon: <InstagramIcon sx={{ fontSize: "1.3rem" }} />, href: `${contact?.instagram_url}` },
                                { icon: <LinkedInIcon sx={{ fontSize: "1.3rem" }} />, href: `${contact?.linkedin_url}` },
                                { icon: <YouTubeIcon sx={{ fontSize: "1.3rem" }} />, href: `${contact?.youtube_url}` },
                            ].map((social, index) => (
                                <IconButton
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        marginRight: "0px",
                                        color: '#fff',
                                        width: '30px',
                                        height: '30px',
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
                <Link to="/">
                    <MainSVG sx={{ maxWidth: '150px' }} />
                </Link>
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
                        <SearchIcon sx={{ color: '#0462B6' }} />
                    </Button>
                </Box>

                {/* Log In and Sign Up Buttons with Icons */}
                {
                    !token || typeof token === 'undefined' ? (
                        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                            <Button
                                to='/signin'
                                component={Link}
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
                    ) : (
                        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                            <Button
                                onClick={Log_out}
                                sx={{
                                    backgroundColor: activeButton === 'signup' ? '#FA8232' : 'transparent',
                                    color: activeButton === 'signup' ? '#fff' : '#fff',
                                    '&:hover': { backgroundColor: '#fff', color: '#000' },
                                    borderRadius: '20px',
                                    textTransform: 'none',
                                }}
                                startIcon={<Logout />}
                            >
                                Log Out
                            </Button>
                        </Stack>
                    )
                }

            </Box>
        </Container >
    );
};

export default Header;
