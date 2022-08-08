import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style/Signup.css";
import { useSignupMutation } from "../services/appApi";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [signup, { error, isLoading, isError }] = useSignupMutation();

    function handleSignup(e) {
        e.preventDefault();
        signup({ name, email, password });
    }

    return (
        <Container>
            <Row>
                <Col md={6} className="signup__form--container">
                    <Form style={{ width: "100%" }} onSubmit={handleSignup}>
                        <h1>Đăng ký</h1>
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form.Group>
                            <Form.Label>Họ tên</Form.Label>
                            <Form.Control type="text" placeholder="Nhập họ tên" value={name} required onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Nhập email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control type="password" placeholder="Nhập mật khẩu" value={password} required onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Button type="submit" variant="success" disabled={isLoading}>
                                Tạo tài khoản
                            </Button>
                        </Form.Group>
                        {/* <p className="pt-3 text-center">
                            Don't have an account? <Link to="/login">Login</Link>{" "}
                        </p> */}
                    </Form>
                </Col>
                <Col md={6} className="signup__image--container"></Col>
            </Row>
        </Container>
    );
}

export default Signup;