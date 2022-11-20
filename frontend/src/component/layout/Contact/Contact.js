import React from 'react';
import { Button } from '@mui/material';
import "./Contact.css";






const Contact = () => {

    return (
    <div className="contactContainer">
        <a className="mailBtn" href="mailto:zzzz@z.com">
        <Button>We want hear from you</Button>
        </a>
    </div>
    );
};


export default Contact