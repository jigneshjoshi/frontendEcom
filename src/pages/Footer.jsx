import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <p style={styles.text}>© 2024 Your Company. All rights reserved.</p>
               
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: 'pink',
        color: 'black',
        padding: '10px 0',
        marginTop: '0px',
        textAlign: 'center',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    text: {
        marginBottom: '5px',
        fontSize: '14px',
    },
   
};

export default Footer;
