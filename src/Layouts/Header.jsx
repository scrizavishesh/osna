import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Grid, Button, Container, Divider, Grid2, OutlinedInput, Stack, Typography } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2'; 
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import RedditIcon from '@mui/icons-material/Reddit';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import { SearchOffOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import MainSVG from '../SVG/MainSVG';

const Header = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };


    return (
        <Container maxWidth="lg">
            {/* Top Bar with welcome text and social icons */}
            <Box sx={{ p: 2 }}>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    sx={{ justifyContent: 'space-between', alignItems: 'center', textAlign: { xs: 'center', sm: 'left' } }}
                    spacing={{ xs: 2, sm: 0 }}
                >
                    <Typography variant="body2" sx={{ color: '#fff' }}>
                        Welcome to Osna Electronics Pvt Ltd
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{ justifyContent: { xs: 'center', sm: 'flex-end' } }}
                    >
                        <Typography variant="body2" sx={{ color: '#fff' }}>
                            Follow us:
                        </Typography>
                        <TwitterIcon sx={{ color: '#fff' }} />
                        <FacebookIcon sx={{ color: '#fff' }} />
                        <PinterestIcon sx={{ color: '#fff' }} />
                        <RedditIcon sx={{ color: '#fff' }} />
                        <YouTubeIcon sx={{ color: '#fff' }} />
                        <InstagramIcon sx={{ color: '#fff' }} />
                    </Stack>
                </Stack>
            </Box>

            <Divider sx={{ color: '#fff' }} />

            {/* Logo and Search bar section */}
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
                <MainSVG sx={{maxWidth: '150px'}}/>

                {/* Search bar */}
                <Box
                    sx={{
                        display: 'flex',
                        backgroundColor: '#fff',
                        overflow: 'hidden',
                        width: { xs: '100%', md: '50%' },
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
                        to={`/search_result?search_term=${encodeURIComponent(searchTerm)}`} // Pass search term as a query param
                        component={Link}
                        sx={{
                            backgroundColor: '#fff',
                            borderRadius: '0 1px 1px 0',
                            '&:hover': {
                                backgroundColor: '#fff',
                            },
                        }}
                    >
                        <SearchOffOutlined sx={{ color: '#0462B6' }} />
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default Header
