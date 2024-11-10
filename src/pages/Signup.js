import React, { useState } from 'react';
import Base from '../components/Base';
import { signup } from '../Services/User-service';
import { toast } from 'react-toastify';
import { FormFeedback } from 'reactstrap';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        address: {
            country: '',
            state: '',
            city: '',
            pincode: '',
            street: '',
            buildingName: '',
        },
    });

    const [error, setError] = useState({
        errors: {},
        isError: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name in formData.address) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                address: {
                    ...prevFormData.address,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate password match before submitting
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        // Clear previous errors
        setError({ errors: {}, isError: false });

        signup(formData)
            .then((resp) => {
                console.log("Signup successful", resp);
                toast.success("User successfully registered!");
                // Reset the form data after successful signup
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    password: '',
                    confirmPassword: '',
                    address: {
                        country: '',
                        state: '',
                        city: '',
                        pincode: '',
                        street: '',
                        buildingName: '',
                    },
                });
            })
            .catch((error) => {
                if (error.response) {
                    console.error("Error response:", error.response);
                    setError({
                        errors: error.response.data.errors || {},
                        isError: true
                    });
                    toast.error("Something went wrong, please try again.");
                } else if (error.request) {
                    console.error("Error request:", error.request);
                    setError({
                        errors: error.request,
                        isError: true
                    });
                    toast.error("No response received from the server.");
                } else {
                    console.error("Error message:", error.message);
                    setError({
                        errors: error.message,
                        isError: true
                    });
                    toast.error("An unexpected error occurred.");
                }
            });
    };

    return (
        <Base>
            <div style={styles.container}>
                <div style={styles.formContainer}>
                    <h2 style={styles.title}>Sign Up</h2>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <label style={styles.label}>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            style={styles.input}
                            required
                            invalid={error.errors?.firstName ? true : false}
                        />
                        {error.errors?.firstName && <FormFeedback>{error.errors.firstName}</FormFeedback>}

                        <label style={styles.label}>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />

                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />

                        <label style={styles.label}>Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />

                        <label style={styles.label}>Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.address.country}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />

                        <label style={styles.label}>State</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.address.state}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />

                        <label style={styles.label}>City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.address.city}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />

                        <label style={styles.label}>Pincode</label>
                        <input
                            type="text"
                            name="pincode"
                            value={formData.address.pincode}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />

                        <label style={styles.label}>Street</label>
                        <input
                            type="text"
                            name="street"
                            value={formData.address.street}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />

                        <label style={styles.label}>Building Name</label>
                        <input
                            type="text"
                            name="buildingName"
                            value={formData.address.buildingName}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />

                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />

                        <label style={styles.label}>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />

                        <button type="submit" style={styles.button}>Sign Up</button>
                    </form>
                </div>
            </div>
        </Base>
    );
};

const styles = {
    container: {
        padding: '25px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f8ff',
    },
    formContainer: {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
    },
    title: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
        fontSize: '24px',
        fontWeight: '600',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        color: '#666',
        fontSize: '14px',
        marginBottom: '5px',
    },
    input: {
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
    },
    button: {
        padding: '12px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: 'pink',
        color: 'black',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default Signup;
