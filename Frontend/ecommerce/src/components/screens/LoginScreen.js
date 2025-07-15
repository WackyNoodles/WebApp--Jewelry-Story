import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Message from '../Message'; // Ensure the path is correct
import Loader from '../Loader'; // Ensure the path is correct
import { Row, Col, Form } from 'react-bootstrap';
import './LoginScreen.css'; // Ensure this import is correct

function LoginScreen() {
    const [usernameInput, setUsernameInput] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userInfo = false; // Replace with actual user info from your state management

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const { data } = await axios.post('/api/users/login/', {
                username: usernameInput,
                password
            }, config);
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            navigate(redirect);
        } catch (error) {
            setLoading(false);
            setError(error.response && error.response.data.detail ? error.response.data.detail : error.message);
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3">
                    <Form.Control
                        type='text'
                        placeholder='Email Address'
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <button className='login-btn' type='submit'>
                    Login
                </button>
            </Form>

            <Row className='py-3'>
                <Col className="text-center">
                    New User?{' '}
                    <Link to={redirect ? `/signup?redirect=${redirect}` : '/signup'}>
                        Register Here
                    </Link>
                </Col>
            </Row>
        </div>
    );
}

export default LoginScreen;