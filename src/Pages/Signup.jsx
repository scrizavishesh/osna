import React from 'react';
import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography,
    MenuItem,
} from '@mui/material';
import { useForm } from 'react-hook-form'; 
import { userRegistration } from '../Utils/Apis';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm(); // Initialize useForm

    // Function to handle form submission
    const onSubmit = async (data) => {
        const payload = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            salutation: data.salutation,
            company: data.company,
            position: data.position,
            address: data.address,
            zip: data.zip,
            city: data.city,
            country: data.country,
        };

        try {
            // API call (replace `YourAPI` with the actual API function or axios call)
            const response = await userRegistration(payload);
            if (response.status === 201) {
                toast.success("Register Successfully");
                navigate("/signin");
                reset();
            } else {
                alert('Signup failed');
            }
        } catch (error) {
            console.error('API Error:', error);
            alert('Error during signup');
        }
    };

    return (
        <>
            <Container maxWidth="lg">
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Grid sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: 'center',
                        mt: 4
                    }}>
                        <Grid>
                            <img src="/signupForm.svg" alt="" />
                        </Grid>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: '32px',
                                fontWeight: '700',
                                lineHeight: '42px',
                                textAlign: 'center',
                                color: '#FA8232',
                                display: 'inline-block',
                                padding: '10px 20px',
                                borderRadius: '4px',
                            }}
                        >
                            Sign Up
                        </Typography>
                    </Grid>
                </Box>

                {/* Personal Data Section */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ backgroundColor: '#FDFDFD', padding: '16px', borderRadius: '8px', mb: 4, border: "1px solid #DBDBDB80" }}>
                        <Typography variant="h4" sx={{ fontSize: '20px', fontWeight: '500', lineHeight: '32px', mb: 2 }}>
                            Personal Data
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Salutation"
                                    select
                                    {...register("salutation", { required: "Salutation is required" })}
                                    variant="outlined"
                                    size="small"
                                >
                                    <MenuItem value="mr">Mr</MenuItem>
                                    <MenuItem value="ms">Ms</MenuItem>
                                    <MenuItem value="dr">Dr</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    {...register("first_name", { required: "First name is required" })}
                                    error={!!errors.first_name}
                                    helperText={errors.first_name?.message}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    {...register("last_name", { required: "Last name is required" })}
                                    error={!!errors.last_name}
                                    helperText={errors.last_name?.message}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
                                    error={!!errors.email}
                                    helperText={errors.email ? "Invalid email" : ""}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Contact Data Section */}
                    <Box sx={{ backgroundColor: '#FDFDFD', padding: '16px', borderRadius: '8px', mb: 4, border: "1px solid #DBDBDB80" }}>
                        <Typography variant="h4" sx={{ fontSize: '20px', fontWeight: '500', lineHeight: '32px', mb: 2 }}>
                            Contact Data
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Company"
                                    {...register("company", { required: "Company name is required" })}
                                    error={!!errors.company}
                                    helperText={errors.company?.message}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Position"
                                    {...register("position", { required: "Position is required" })}
                                    error={!!errors.position}
                                    helperText={errors.position?.message}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Address"
                                    {...register("address", { required: "Address is required" })}
                                    error={!!errors.address}
                                    helperText={errors.address?.message}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Zip"
                                    {...register("zip", { required: "Zip code is required" })}
                                    error={!!errors.zip}
                                    helperText={errors.zip?.message}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="City"
                                    {...register("city", { required: "City is required" })}
                                    error={!!errors.city}
                                    helperText={errors.city?.message}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Country"
                                    {...register("country", { required: "Country is required" })}
                                    error={!!errors.country}
                                    helperText={errors.country?.message}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Grid item xs={12} sx={{ textAlign: 'center', mt: 3 }}>
                        <Button type="submit" variant="contained" sx={{ backgroundColor: '#FA8232', color: '#fff', padding: '10px 20px' }}>
                            Submit
                        </Button>
                    </Grid>
                </form>
            </Container>
        </>
    );
};

export default SignUp;
