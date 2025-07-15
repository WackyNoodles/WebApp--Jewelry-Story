import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Message from '../Message'; // Ensure the path is correct
import Loader from '../Loader'; // Ensure the path is correct
import { Row, Col, Form } from 'react-bootstrap';
import './SignUpScreen.css'; // Ensure this import is correct

function SignUpScreen() {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
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
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      try {
        setLoading(true);
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const { data } = await axios.post('/api/users/register/', {
          fname,
          lname,
          email,
          password
        }, config);
        localStorage.setItem('userInfo', JSON.stringify(data));
        setLoading(false);
        window.alert('Kindly verify email sent to your email provided');
        navigate(`/login?redirect=${redirect}`);
      } catch (error) {
        setLoading(false);
        setError(error.response && error.response.data.detail ? error.response.data.detail : error.message);
      }
    }
  };

  return (
    <div className="signin-container">
      <h1 className="text-center mb-4">Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId='fname'>
          <Form.Control
            type='text'
            placeholder='First Name'
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId='lname'>
          <Form.Control
            type='text'
            placeholder='Last Name'
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId='email'>
          <Form.Control
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId='password'>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId='confirmPassword'>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <button class="register-btn">
          Register
        </button> 
      </Form>

      <Row className='py-3'>
        <Col className="text-center">
          Already got an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default SignUpScreen;
