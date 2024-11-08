import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, Avatar, Container, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import { getAboutPageContent, getCoreMembers } from '../Utils/Apis';
import { toast } from 'react-hot-toast';
import CountUp from 'react-countup';
import Loader from '../Layouts/Loader';



const AboutUs = () => {
    const baseUrl = 'https://dc.damio.in/'

    const [AboutUs, setAboutUs] = useState('');
    const [mainImage, setmainImage] = useState('');
    const [LoaderState, setLoaderState] = useState(false);
    const [coreMember, setcoreMember] = useState([])

    useEffect(() => {
        getAbout();
        getTeam();
    }, [])

    const getAbout = async () => {
        setLoaderState(true);
        try {
            const response = await getAboutPageContent();
            if (response?.status === 200) {
                setLoaderState(false)
                toast.success("Get About Page Content");
                setAboutUs(response?.data?.data[0]);
                // Get the image URL from the response
                const image = response?.data?.data[0]?.section_one_image;

                // Construct the full URL and encode any spaces
                const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
                const encodedImageUrl = fullImageUrl.replace(/ /g, '%20'); // Encode spaces

                // Set the encoded image URL
                setmainImage(encodedImageUrl);
            } else {
                toast.error("Failed to fetch categories");
            }
        } catch (err) {
            toast.error(err?.message);
        }
    };


    const getTeam = async () => {
        setLoaderState(true)
        try {
            const response = await getCoreMembers();
            if (response?.status === 200) {
                setLoaderState(false)
                toast.success("");
                setcoreMember(response?.data?.data);
            } else {
                toast.error("Failed to fetch categories");
            }
        } catch (err) {
            toast.error(err?.message);
        }
    };
    return (
        <>

            {LoaderState && (
                <Loader />
            )
            }

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
                                {AboutUs?.section_one_heading}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: { xs: '14px', sm: '15px', md: '16px' }, // Responsive font size
                                    fontWeight: 400,
                                    lineHeight: { xs: '24px', sm: '26px', md: '28px' }, // Responsive line height
                                    color: '#4c4c4c',
                                }}
                            >
                                {AboutUs?.section_one_description}
                            </Typography>
                        </Box>

                        {/* Image Section */}
                        <Box
                            sx={{
                                position: 'relative',
                                backgroundImage: `url('${mainImage}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: { xs: '300px', sm: '350px', md: '400px' }, // Responsive height
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                paddingTop: { xs: '50px', sm: '60px', md: '80px' }, // Adjust padding
                            }}
                        >
                            {/* Statistics Section */}
                            <Box
                                sx={{
                                    position: 'relative',
                                    backgroundColor: 'rgba(255, 210, 181, 10)', // Semi-transparent background
                                    padding: '20px',
                                    textAlign: 'left',
                                    display: 'flex',
                                    flexDirection: { sm: 'row' }, // Stack items on smaller screens
                                    top: { xs: '180px', sm: '240px', md: '280px' }, // Responsive top positioning
                                    gap: 5,
                                    right: { xs: '10px', sm: '90px', md: '190px' },
                                }}
                            >
                                {/* Counter: Founding Year */}
                                <Grid item xs={12} sm={4} textAlign="center">
                                    <Typography
                                        variant="h4"
                                        sx={{ fontWeight: 'bold', fontSize: { xs: '24px', md: '36px' } }}
                                    >
                                        <CountUp start={0} end={AboutUs?.founding_year} duration={5} />
                                    </Typography>
                                    <Typography
                                        sx={{ fontSize: { xs: '14px', md: '16px' }, color: '#555' }}
                                    >
                                        Founding year
                                    </Typography>
                                </Grid>

                                {/* Counter: Employees */}
                                <Grid item xs={12} sm={4} textAlign="center">
                                    <Typography
                                        variant="h4"
                                        sx={{ fontWeight: 'bold', fontSize: { xs: '24px', md: '36px' } }}
                                    >
                                        <CountUp start={0} end={AboutUs?.employees_worldwide} duration={5} suffix="+" />
                                    </Typography>
                                    <Typography
                                        sx={{ fontSize: { xs: '14px', md: '16px' }, color: '#555' }}
                                    >
                                        Employees worldwide
                                    </Typography>
                                </Grid>

                                {/* Counter: Distributors */}
                                <Grid item xs={12} sm={4} textAlign="center">
                                    <Typography
                                        variant="h4"
                                        sx={{ fontWeight: 'bold', fontSize: { xs: '24px', md: '36px' } }}
                                    >
                                        <CountUp start={0} end={AboutUs?.distributor_worldwide} duration={5} suffix="+" />
                                    </Typography>
                                    <Typography
                                        sx={{ fontSize: { xs: '14px', md: '16px' }, color: '#555' }}
                                    >
                                        Distributors worldwide
                                    </Typography>
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
                                        mb: 2,
                                    }}
                                >
                                    {AboutUs?.section_two_heading_part_one}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '28px',
                                        fontWeight: 700,
                                        lineHeight: '40px',
                                        color: "#232536",
                                        mb: 2,
                                    }}
                                >
                                    {AboutUs?.section_two_subheading_part_one}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '16px',
                                        fontWeight: 400,
                                        lineHeight: '28px',
                                        color: "#6d6e76",
                                        mb: 2,
                                    }}
                                >
                                    {AboutUs?.section_two_description_part_one}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    sx={{
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        lineHeight: '20px',
                                        color: "#2c2c2c",
                                        mb: 2,
                                    }}
                                >
                                    {AboutUs?.section_two_heading_part_two}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '28px',
                                        fontWeight: 700,
                                        lineHeight: '40px',
                                        color: "#232536",
                                        mb: 2,
                                    }}
                                >
                                    {AboutUs?.section_two_subheading_part_two}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '16px',
                                        fontWeight: 400,
                                        lineHeight: '28px',
                                        color: "#6d6e76",
                                        mb: 2,
                                    }}
                                >
                                    {AboutUs?.section_two_description_part_two}
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
                                        mb: 2,
                                    }}
                                >
                                    {AboutUs?.section_three_heading}
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
                                    {AboutUs?.section_three_subheading}
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
                                    {AboutUs?.section_three_description}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
                                <Box
                                    component="img"
                                    src={baseUrl + AboutUs?.section_three_image}
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
                                    src={baseUrl + AboutUs?.section_four_image}
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
                                    {AboutUs?.section_four_heading}
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
                                    {AboutUs?.section_four_subheading}
                                    \                                </Typography>
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
                                    {AboutUs?.section_four_description}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>

                    {/* Fifth Container: Core Team */}
                    <Container sx={{ py: 6 }}>
                        <Typography variant="h4" align="center" sx={{ mb: 4 }}>Our Core Team Member</Typography>
                        <Grid container spacing={4}>
                            {coreMember.map((member, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Card sx={{ p: 2, textAlign: 'center', background: "#F4F4F4" }}>
                                        <Avatar
                                            src={baseUrl + member?.image}
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
                                            }}>{member.designation}</Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                            <IconButton href={member?.facebook_url}>
                                                <Facebook />
                                            </IconButton>
                                            <IconButton href={member?.twitter_url}>
                                                <Twitter />
                                            </IconButton>
                                            <IconButton href={member?.linkedin_url}>
                                                <LinkedIn />
                                            </IconButton>
                                            <IconButton href={member?.instagram_url}>
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
        </>

    );
};

export default AboutUs;
