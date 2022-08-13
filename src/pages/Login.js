import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../services/appApi";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, { isError, isLoading, error }] = useLoginMutation();
    function handleLogin(e) {
        e.preventDefault();
        login({ email, password });
    }
    return (
        <div className="home">

            <Container>
                <Row>
                    <Col md={6} className="login__form--container">
                        <h1 style={{ color: "#d3b062" }}>ĐĂNG NHẬP</h1>
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form style={{ width: "100%", background: "#F9F8F4" }} onSubmit={handleLogin} >

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
                                    Đăng nhập
                                </Button>
                            </Form.Group>

                            <p className="pt-3 text-center">
                                Chưa có tài khoản? <Link to="/signup">Tạo tài khoản</Link>{" "}
                            </p>
                        </Form>
                    </Col>
                    <Col md={6} className="login__image--container"></Col>
                </Row>


            </Container>

            <div style={{ marginTop: "10px", background: "#ececec" }}>
                <Row>
                    <Col sm={3}>
                        <img src="https://cdn-crownx.winmart.vn/images/prod/162964655378716287682220181%20(1).png"></img>
                    </Col>
                    <Col sm={3}>
                        <img src="https://cdn-crownx.winmart.vn/images/prod/162964658411816287682628462%20(1).png"></img>
                    </Col>
                    <Col sm={3}>
                        <img src="https://cdn-crownx.winmart.vn/images/prod/162964661464516287682943943%20(1).png"></img>
                    </Col>
                    <Col sm={3}>
                        <img src="https://cdn-crownx.winmart.vn/images/prod/162964665580516292779811154%20(1).png"></img>
                    </Col>
                </Row>
                <Row>
                    <Col sm={3}>
                        <strong>Sản phẩm an toàn</strong>
                    </Col>
                    <Col sm={3}>
                        <strong>Chất lượng cam kết</strong>
                    </Col>
                    <Col sm={3}>
                        <strong>Dịch vụ vượt trội</strong>
                    </Col>
                    <Col sm={3}>
                        <strong>Giao hàng nhanh</strong>
                    </Col>
                </Row>
            </div>

            <footer style={{ background: "#2c2c2c" }}>
                <div className="recent-products-container container">
                    <Row>
                        <Col md={3}>
                            <div style={{ gap: "10px" }} className="footer-column">
                                <ul>
                                    <strong style={{ color: "#deb062" }}>FD-MART</strong>
                                    <li className="footer-li">
                                        Công ty Cổ phần Dịch vụ Thương mại FD-Mart
                                    </li>
                                    <li className="footer-li">Địa chỉ: Hà Nội</li>
                                    <li className="footer-li">
                                        <i class="fa-solid fa-phone-volume"></i> Hotline:
                                        0987.654.321
                                    </li>
                                    <li className="footer-li">
                                        <i class="fa-solid fa-envelope-circle-check"></i> Email:
                                        fdmart@gmail.com
                                    </li>

                                    <li className="footer-li">
                                        <strong style={{ color: "gray" }}>Kết nối với chúng tôi</strong>
                                    </li>
                                    <Row>
                                        <Col md={4}>
                                            <li className="footer-li">
                                                <i class="fa-brands fa-facebook" />
                                            </li>
                                        </Col>

                                        <Col md={4}>
                                            <li className="footer-li">
                                                <i class="fa-brands fa-youtube" />
                                            </li>
                                        </Col>

                                        <Col md={4}>
                                            <li className="footer-li">
                                                <i class="fa-brands fa-instagram" />
                                            </li>
                                        </Col>
                                    </Row>
                                </ul>
                            </div>
                        </Col>

                        <Col md={3}>
                            <div style={{ gap: "10px" }} className="footer-column">
                                <ul>
                                    <strong style={{ color: "gray" }}>Về chúng tôi</strong>
                                    <li className="footer-li">Giới thiệu về FD-Mart</li>
                                    <li className="footer-li">Câu chuyện về FD-Mart</li>
                                    <li className="footer-li">Quản lý chất lượng</li>
                                    <li className="footer-li">
                                        Chính sách bảo mật và chia sẻ thông tin
                                    </li>
                                    <li className="footer-li">
                                        Điều kiện và điều khoản giao dịch
                                    </li>
                                </ul>
                            </div>
                        </Col>

                        <Col md={3}>
                            <div style={{ gap: "10px" }} className="footer-column">
                                <ul>
                                    <strong style={{ color: "gray" }}>Hỗ trợ khách hàng</strong>
                                    <li className="footer-li">Trung tâm hỗ trợ khách hàng</li>
                                    <li className="footer-li">Chính sách giao hàng</li>
                                    <li className="footer-li">Chính sách thanh toán</li>
                                    <li className="footer-li">Chính sách đổi trả</li>
                                    <li className="footer-li">
                                        Chính sách chiết khấu ưu đãi mua sắm
                                    </li>
                                </ul>
                            </div>
                        </Col>

                        <Col md={3}>
                            <div style={{ gap: "10px" }} className="footer-column">
                                <ul>
                                    <strong style={{ color: "gray" }}>
                                        Chăm sóc khách hàng
                                    </strong>
                                    <li className="footer-li">Mua Online: 0987.654.321</li>
                                    <li className="footer-li">Email: cskh@fdmart.com</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div >
                    <strong style={{ color: '#deb062', fontSize: '14px' }}>
                        Bản quyền thuộc về <a href="https://chimerical-caramel-c205a4.netlify.app/" style={{ color: '#deb062', fontSize: '14px', textDecoration: 'none' }}>fdmart.com.vn</a>
                    </strong>
                </div>
            </footer>
        </div>



    );
}

export default Login;