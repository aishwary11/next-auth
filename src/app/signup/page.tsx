'use client';

import { axiosInstance, toastSuccess } from '@/common/utils/common';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const SignupForm = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    userName: '',
    password: '',
    email: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, status } = await axiosInstance.post('/signup', user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (status === 200) {
      toastSuccess(data.msg);
      router.push('/login');
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <h2>Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={user.userName} onChange={e => setUser({ ...user, userName: e.target.value })} required />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} required />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;
