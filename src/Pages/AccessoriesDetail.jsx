import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Box, Button, Typography, Container, CardMedia, CardContent, Card } from "@mui/material";
import Header from "../Layouts/Header";
import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";
import { getProductAccessories, getSingleAccessories, getSingleProduct } from '../Utils/Apis';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DownloadPDF from '../Layouts/DownloadPDF';
import Modal from '../Layouts/Modal';
import ReactPlayer from 'react-player';

const AccessoriesDetail = () => {

    const baseUrl = 'https://dc.damio.in/';
    const token = localStorage.getItem('osna_token');

    // State for main image list and selected main image
    const [mainImageList, setMainImageList] = useState([]); // Holds the list of product images
    const [selectedImage, setSelectedImage] = useState(''); // Holds the currently selected main image
    const [product, setProduct] = useState({});
    const [productDescription, setProductDescription] = useState('');
    const [open, setOpen] = useState(false);
    const [PDFData, setPDFData] = useState('');

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchProductResults(id);
        }
    }, [id]);

    const fetchProductResults = async (terms) => {
        try {
            const response = await getSingleAccessories(terms);
            if (response?.status === 200) {
                const productData = response?.data?.data;
                setProduct(productData);
                setProductDescription(productData.accessory_description || "");
                const imageList = Array.isArray(productData?.accessory_image) ? productData?.accessory_image : [];
                setMainImageList(imageList);
                if (imageList.length > 0) {
                    setSelectedImage(imageList[0]?.image);
                }
            } else {
                console.error('Failed to fetch product details');
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleOpen = (pdf) => {
        setOpen(true);
        setPDFData(pdf);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
           
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Box sx={{ p: 3 }}>
                    {/* First Section: Image & Product Details */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Box>
                                {/* Main Product Image */}
                                <Box
                                    component="img"
                                    src={baseUrl + selectedImage}
                                    alt="Main Product"
                                    sx={{
                                        width: "100%",
                                        height: "500px",
                                        objectFit: "cover",  // Fills the container, but may crop parts of the image
                                        objectPosition: "center",
                                        borderRadius: 2
                                    }}
                                />

                            </Box>
                            <Box sx={{ display: "flex", mt: 2 }}>
                                {/* Product Carousel */}
                                {mainImageList.map((image, index) => (
                                    <Box
                                        key={index}
                                        component="img"
                                        src={baseUrl + image?.image}
                                        alt={`Product ${index + 1}`}
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            objectFit: "cover", // Makes sure the image covers the entire box, even if cropped slightly
                                            mx: 1,
                                            cursor: "pointer",
                                            border: selectedImage === image?.image ? '2px solid orange' : 'none'
                                        }}
                                        onClick={() => setSelectedImage(image?.image)} // Set the clicked image as the main image
                                    />

                                ))}
                            </Box>
                        </Grid>

                        {/* Product Name and Description */}
                        <Grid item xs={12} md={6}>
                            <Typography
                                sx={{
                                    fontSize: '20px',
                                    fontWeight: 600,
                                    lineHeight: '28px',
                                    textAlign: 'left',
                                    color: '#0462b6',
                                    mb: 1,
                                }}
                            >
                                {product?.accessory_name || "Accessories Name"}
                            </Typography>



                            <Typography>
                                <div
                                    dangerouslySetInnerHTML={{ __html: productDescription }}
                                />
                            </Typography>
                            <Button
                                onClick={(e) => handleOpen(product?.document)}
                                variant="contained"
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    textTransform: 'none',
                                    padding: '10px 20px',
                                    fontSize: { xs: '14px', md: '16px' },
                                    backgroundColor: '#FA8232',
                                    color: '#FFFFFF',
                                }}
                            >
                                View All
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Second Section: Product Data & Videos */}
                    <Grid container spacing={3} sx={{ mt: 4 }}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" fontWeight="bold">Product Data</Typography>
                            <ul>
                                <li>Resolution: 2560 x 1936</li>
                                <li>Type: VISOR® Code Reader</li>
                                <li>Variant: Professional</li>
                                <li>Optics: Wide (integrated)</li>
                            </ul>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" fontWeight="bold">Product Videos</Typography>
                            <Box sx={{ mt: 2 }}>
                                <ReactPlayer
                                    url={baseUrl + product?.accessory_video}
                                    width="100%"
                                    controls
                                    onContextMenu={(e) => e.preventDefault()}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <DownloadPDF open={open} onClose={handleClose} PDFData={PDFData} />
        </>
    );
}

export default AccessoriesDetail;
