import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const Register = () => {
    const unsplashUrl = 'https://source.unsplash.com/1600x900/?vacation/travel'; 
    const navigate = useNavigate();

    const [input, setInput] = useState({
        name: "",
        email: '',
        phone: "",
        password: '',
        answer: "",
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
            const { data } = await axios.post('https://leave-notice-backend.vercel.app/api/auth/register', input);
            if (data?.success) {
                setInput({ name: "", email: "", phone: "", answer: "", password: "", });
                console.log('Registration Successful!');
                toast.success("Registration Successful");
                navigate("/login")
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <>
        <div  style={{
        
        backgroundImage: `url(${unsplashUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
            <Container 
            
            className="mt-5 vh-100">
                <Row className="justify-content-md-center">
                    <Col xs={12} md={6}>
                        <Card className="p-4" style={{ boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)', marginTop: 'calc(50vh - 200px)' }}>
                            <Form onSubmit={handleSubmit}>
                                <h2 className="text-center mb-4">REGISTER</h2>
                                <hr />

                                <Row>
                                    <Col>
                                        <Form.Group controlId="formName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Name" name="name" value={input.name} onChange={handleInput} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formEmail">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control type="email" placeholder="example@gmail.com" name="email" value={input.email} onChange={handleInput} />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Form.Group controlId="formPhone">
                                            <Form.Label>Phone</Form.Label>
                                            <Form.Control type="phone" placeholder="Enter Phone" name="phone" value={input.phone} onChange={handleInput} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formAnswer">
                                            <Form.Label>Favorite Thing</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Your Favorite Thing" name="answer" value={input.answer} onChange={handleInput} />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Form.Group controlId="formPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" name="password" value={input.password} onChange={handleInput} />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Button className='mt-2' variant="primary" type="submit" block>
                                    Register
                                </Button>

                                <NavLink to="/login" className="d-block mt-3 text-center">Already have an account?</NavLink>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
            </div>
        </>
    );
};

export default Register;
