'use client';

import constant from '@/common/constant';
import { axiosInstance, encryptData, toastSuccess } from '@/common/utils/common';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const LoginForm = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, status } = await axiosInstance.post('/api/login', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (status === 200) {
        toastSuccess(data.msg);
        sessionStorage.setItem(constant.encrypted_constant.userToken, encryptData(data.token));
        router.push('/about');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <h2>Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="Enter Email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} required />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
