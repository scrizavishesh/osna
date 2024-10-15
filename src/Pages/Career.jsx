import React from 'react';
import { Container, Box, Typography, TextField, Button, Grid, Checkbox, FormControlLabel, MenuItem, InputLabel, Select } from '@mui/material';
import { useForm } from 'react-hook-form';
import { CareerAPI } from '../Utils/Apis';
import { toast } from 'react-hot-toast';

const Career = () => {
    const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm({
        mode: 'onChange'
    });

    const handleClose = () => {
        // Logic to close the modal or reset state
    };

    const from = watch("applying_for");

    // Function to handle form submission
    const onSubmit = async (data) => {
        try {
            const formData = new FormData(); // Create a new FormData object

            // Append all fields to the FormData object
            formData.append('name', data.name);
            formData.append('company', data.company);
            formData.append('email', data.email);
            formData.append('phone', data.phone);
            formData.append('applying_for', data.applying_for); // Convert array to JSON string
            formData.append('time_to_reach', data.time_to_reach);
            formData.append('hear_about_us', data.hear_about_us);

            if (data.resume && data.resume.length > 0) {
                formData.append('resume', data.resume[0]); // Append the actual file
            }
            const response = await CareerAPI(formData); // Send FormData
            if (response.status === 201) {
                toast.success('Profile submitted successfully!');
                localStorage.setItem('osna_token', response?.data?.token);
                reset();
                handleClose();
            } else {
                toast.error('Failed to submit profile');
            }
        } catch (error) {
            toast.error('Error submitting profile');
            console.error('API Error:', error); // Log error for debugging
        }
    };


    return (
        <>
            <Container sx={{ textAlign: 'center', mt: 5 }}>
                <img src="/carrer.svg" alt="Career Icon" width="80" />
                <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold', color: '#FA8232' }}>
                    Career
                </Typography>
            </Container>

            {/* Apply Now Form */}
            <Container maxWidth="lg" sx={{ mt: 5 }}>
                <Box sx={{ backgroundColor: '#FDFDFD', padding: '16px', borderRadius: '8px', mb: 4, border: "1px solid #DBDBDB80" }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: '20px',
                            fontWeight: '500',
                            lineHeight: '32px',
                            textAlign: 'left',
                            color: '#2C2C2C',
                            mb: 2,
                        }}
                    >
                        Apply Now
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>

                            {/* Name */}
                            <Grid item xs={12} sm={6}>
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: '400',
                                        lineHeight: '20px',
                                        textAlign: 'left',
                                        color: '#191C1F',
                                        mb: 1,
                                    }}
                                >
                                    Name
                                    <span style={{ color: '#E02F2F' }}>*</span>
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Enter Name"
                                    variant="outlined"
                                    {...register('name', { required: 'Name is required' })}
                                    error={!!errors.name}
                                    helperText={errors.name ? errors.name.message : ''}
                                />
                            </Grid>

                            {/* Company */}
                            <Grid item xs={12} sm={6}>
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: '400',
                                        lineHeight: '20px',
                                        textAlign: 'left',
                                        color: '#191C1F',
                                        mb: 1,
                                    }}
                                >
                                    Company
                                    <span style={{ color: '#E02F2F' }}>*</span>
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Enter Company Name"
                                    variant="outlined"
                                    {...register('company', { required: 'Company is required' })}
                                    error={!!errors.company}
                                    helperText={errors.company ? errors.company.message : ''}
                                />
                            </Grid>

                            {/* Email */}
                            <Grid item xs={12} sm={6}>
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: '400',
                                        lineHeight: '20px',
                                        textAlign: 'left',
                                        color: '#191C1F',
                                        mb: 1,
                                    }}
                                >
                                    Email
                                    <span style={{ color: '#E02F2F' }}>*</span>
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Enter Email Id"
                                    variant="outlined"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: 'Email is not valid',
                                        },
                                    })}
                                    error={!!errors.email}
                                    helperText={errors.email ? errors.email.message : ''}
                                />
                            </Grid>

                            {/* Phone Number */}
                            <Grid item xs={12} sm={6}>
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: '400',
                                        lineHeight: '20px',
                                        textAlign: 'left',
                                        color: '#191C1F',
                                        mb: 1,
                                    }}
                                >
                                    Phone Number
                                    <span style={{ color: '#E02F2F' }}>*</span>
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Enter Phone Number"
                                    variant="outlined"
                                    {...register('phone', {
                                        required: 'Phone number is required',
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: 'Phone number must be 10 digits',
                                        },
                                    })}
                                    error={!!errors.phone}
                                    helperText={errors.phone ? errors.phone.message : ''}
                                />
                            </Grid>

                            {/* Apply For (Checkboxes) */}
                            <Grid item xs={12}>
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: '400',
                                        lineHeight: '20px',
                                        textAlign: 'left',
                                        color: '#191C1F',
                                        mb: 1,
                                    }}
                                >
                                    Apply For
                                </Typography>
                                <Grid container spacing={1}>
                                    {['Agricultural Engineering', 'Chemical Research', 'Material Science', 'Mechanical Engineering', 'Oil and Gas', 'Power and Energy'].map((field, index) => (
                                        <Grid item xs={6} sm={4} key={index}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        {...register('applying_for')}
                                                        value={field}
                                                    />
                                                }
                                                label={field}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>

                            {/* Best Time to Reach */}
                            <Grid item xs={12} sm={6}>
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: '400',
                                        lineHeight: '20px',
                                        textAlign: 'left',
                                        color: '#191C1F',
                                        mb: 1,
                                    }}
                                >
                                    Best Time to Reach
                                </Typography>
                                <Select
                                    fullWidth
                                    size="small"
                                    {...register('time_to_reach')}
                                >
                                    <MenuItem value="morning">9AM - 12PM</MenuItem>
                                    <MenuItem value="afternoon">12PM - 3PM</MenuItem>
                                    <MenuItem value="evening">3PM - 6PM</MenuItem>
                                </Select>
                            </Grid>

                            {/* Hear About Us */}
                            <Grid item xs={12} sm={6}>
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: '400',
                                        lineHeight: '20px',
                                        textAlign: 'left',
                                        color: '#191C1F',
                                        mb: 1,
                                    }}
                                >
                                    Hear About Us
                                </Typography>
                                <Select
                                    fullWidth
                                    size="small"
                                    {...register('hear_about_us')}
                                >
                                    <MenuItem value="friend">Friend</MenuItem>
                                    <MenuItem value="facebook">Facebook</MenuItem>
                                    <MenuItem value="google">Google</MenuItem>
                                    <MenuItem value="social-media">Social Media</MenuItem>
                                    <MenuItem value="referral">Referral</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </Select>
                            </Grid>

                            {/* Attach Resume */}
                            <Grid item xs={12}>
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: '400',
                                        lineHeight: '20px',
                                        textAlign: 'left',
                                        color: '#191C1F',
                                        mb: 1,
                                    }}
                                >
                                    Attach Resume
                                </Typography>

                                {/* <TextField
                                    fullWidth
                                    size="small"
                                    type='file'
                                    variant="outlined"
                                    accept=".jpg, .doc, .docx , .pdf"
                                    {...register('resume', { required: 'Resume is required' })}
                                /> */}
                                <TextField fullWidth size="small" id="resume" type="file" className={`form-control font14 ${errors.resume ? 'border-danger' : ''}`} accept='.jpg, .jpeg, .png., pdf' {...register('resume', { required: 'Resume is required *' })} />
                                {errors.resume && <p style={{ color: 'red' }}>{errors.resume.message}</p>}
                            </Grid>

                            {/* Submit Button */}
                            <Grid item xs={12} sx={{ textAlign: 'center', mt: 3 }}>
                                <Button type="submit" variant="contained" sx={{
                                    backgroundColor: '#FA8232',
                                    color: '#fff',
                                    padding: '10px 20px',
                                    marginRight: '15px',
                                    '&:hover': { backgroundColor: '#E57A2D' }
                                }}>
                                    Submit
                                </Button>
                                <Button variant="outlined" sx={{
                                    color: '#FA8232',
                                    borderColor: '#FA8232',
                                    padding: '10px 20px',
                                    '&:hover': { borderColor: '#E57A2D', color: '#E57A2D' }
                                }}>
                                    Cancel
                                </Button>
                            </Grid>

                        </Grid>
                    </form>
                </Box>
            </Container>
        </>
    );
};

export default Career;
