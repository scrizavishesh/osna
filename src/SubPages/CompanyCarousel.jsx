import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Box, Grid } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GetLogo } from "../Utils/Apis";
import { toast } from "react-hot-toast";

const ResponsiveCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const baseUrl = 'https://dc.damio.in/';

    const [banner, setBanner] = useState([]);

    useEffect(() => {
        getBanner();
    }, []);

    const getBanner = async () => {
        try {
            const response = await GetLogo();
            if (response?.status === 200) {
                toast.success("Get client Logo");
                setBanner(response?.data?.data);
            } else {
                toast.error("Failed to fetch categories");
            }
        } catch (err) {
            toast.error(err?.message);
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Slider {...settings}>
                {banner.map((item, index) => (
                    <Grid key={index} item>
                        <Grid
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 2,
                                backgroundColor: "transparent" // Transparent background
                            }}
                        >
                            <img
                                src={baseUrl + item?.client_logo}
                                alt=""
                                style={{
                                    width: "55%", 
                                    aspectRatio: 3/2,
                                    mixBlendMode: "color-burn",
                                    objectFit: "contain",
                                }}
                            />
                        </Grid>
                    </Grid>
                ))}
            </Slider>
        </Box>
    );
};

export default ResponsiveCarousel;
