import React, { useState } from 'react';
import Base from '../components/Base';
import { toast } from 'react-toastify';
import { loginUser } from '../Services/User-service';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       // Optionally, validate the form data before submission
    if (!formData.email || !formData.password) {
        toast.error("Please fill out all fields.");
        return;
    }

    loginUser(formData)
        .then((jwtTokenData) => {
            console.log("User login success");
            console.log(jwtTokenData);

            // Handle the JWT token, maybe save it to localStorage or context
            localStorage.setItem("jwtToken", jwtTokenData.token); // Save the token if needed
            toast.success("Login successful!");

            // Redirect to the user's dashboard or the appropriate page
            // e.g., history.push('/dashboard');
        })
        .catch((error) => {
            console.error("Login error:", error);

            // Handle different types of errors from the server
            if (error.response) {
                // If server returns a response with error status (like 400 or 500)
                if (error.response.status === 401) {
                    // Unauthorized - incorrect credentials
                    toast.error("Invalid credentials. Please try again.");
                } else if (error.response.status === 400) {
                    // Bad request, for example missing fields
                    toast.error("Bad request. Please check your inputs.");
                } else {
                    // For other errors
                    toast.error("Something went wrong. Please try again later.");
                }
            } else if (error.request) {
                // If no response was received from the server
                toast.error("No response from the server. Please try again later.");
            } else {
                // Any other errors
                toast.error("An unexpected error occurred.");
            }
        });

    console.log('Login data submitted:', formData);
};

    return (
        <Base>
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>Login</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <label style={styles.label}>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
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

                    <button type="submit" style={styles.button}>Login</button>
                </form>
                <p style={styles.signupLink}>
                    Don’t have an account? <a href="/signup" style={styles.link}>Sign up</a>
                </p>
            </div>
        </div></Base>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f7f9fc',
    },
    formContainer: {
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
    },
    title: {
        fontSize: '24px',
        fontWeight: '600',
        color: '#333',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        color: '#666',
        fontSize: '14px',
        marginBottom: '5px',
        textAlign: 'left',
    },
    input: {
        padding: '12px',
        marginBottom: '20px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '16px',
    },
    button: {
        padding: '12px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: 'pink',
        color: '#fff',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    signupLink: {
        marginTop: '20px',
        fontSize: '14px',
        color: '#666',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
    },
};

export default Login;
