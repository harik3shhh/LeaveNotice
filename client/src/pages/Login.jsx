import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth'; 
import { Card, Form, Button, Row, Col, Container } from 'react-bootstrap';

const Login = () => {
  const unsplashUrl = 'https://source.unsplash.com/1600x900/?dubai'; 
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('https://leave-notice-backend.vercel.app/api/auth/login', input);
      console.log(data);
      if (data?.success) {
        setInput({ email: '', password: '' });
        console.log('Login Successful!');
        toast.success('Login Successful');
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });
        localStorage.setItem('auth', JSON.stringify(data));
        navigate(location.state || '/');
      } else {
        toast.error(data?.message);
        toast.error('Invalid Email of Password');
      }
    } catch (error) {
      console.log(error);
      toast.error('Invalid email or password');
    }
  };

  return (
    <Container
    style={{
        
      backgroundImage: `url(${unsplashUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    fluid className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '500px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', padding: '20px' }}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <h2 className="text-center">LOGIN</h2>
            <hr />

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="example@gmail.com"
                name="email"
                value={input.email}
                onChange={handleInput}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={input.password}
                onChange={handleInput}
                required
              />
            </Form.Group>

            <Row>
              {/* <Col>
                <NavLink to="/forgot-password" className="forgot">Forgot Password?</NavLink>
              </Col> */}
              <Col>
                <NavLink to="/register" className="create">Create Account</NavLink>
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="mt-3">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
