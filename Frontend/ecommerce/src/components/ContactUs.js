import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const ContactUs = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement your contact form submission logic here
        alert('Form submitted!'); // Replace with actual form submission code
    };

    return (
        <Container className="mt-5">
            <h1>Contact Us</h1>
            <p>Have a question or feedback for us? Please fill out the form below and we'll get back to you as soon as possible.</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" required />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" required />
                </Form.Group>
                <Form.Group controlId="formMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={4} placeholder="Enter your message" required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default ContactUs;
