import React from "react";
import { Container, Nav, Tab, Col, Row } from "react-bootstrap";
import ClientsAdminPage from "../components/ClientsAdminPage";
import DashboardProducts from "../components/DashboardProducts";
import OrdersAdminPage from "../components/OrdersAdminPage";
import ScrollToTop from "react-scroll-to-top";

function AdminDashboard() {
    return (
        <div className="home" style={{ marginTop: '56px' }}>
            <Container style={{ minHeight: "95vh", paddingTop: '10px' }}>
                <Tab.Container defaultActiveKey="products">
                    <Row>
                        <Col sm={2}>
                            <Nav variant="pills" className="flex-column" >
                                <Nav.Item>
                                    <Nav.Link eventKey="products" style={{ borderRadius: '10px' }}>Sản phẩm</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="orders" style={{ borderRadius: '10px' }}>Đơn hàng</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="clients" style={{ borderRadius: '10px' }}>Khách hàng</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>

                        <Col sm={10}>
                            <Tab.Content>
                                <Tab.Pane eventKey="products">
                                    <h2 style={{ color: "#008c7a", textTransform: "uppercase", paddingBottom: "10px" }}>Quản lý sản phẩm</h2>
                                    <DashboardProducts />
                                </Tab.Pane>
                                <Tab.Pane eventKey="orders">
                                    <h2 style={{ color: "#008c7a", textTransform: "uppercase", paddingBottom: "10px" }}>Quản lý đơn hàng</h2>
                                    <OrdersAdminPage />
                                </Tab.Pane>
                                <Tab.Pane eventKey="clients">
                                    <h2 style={{ color: "#008c7a", textTransform: "uppercase", paddingBottom: "10px" }}>Quản lý khách hàng</h2>
                                    <ClientsAdminPage />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>

            <div className="footer_top-background">
                <div className="container">
                    <Row>
                        <Col md={3}>
                            <div className="footer_top-1">
                                <ul>
                                    <li className="footer_top-li">
                                        <img src="https://cdn-crownx.winmart.vn/images/prod/162964655378716287682220181%20(1).png"></img><br></br><br></br>
                                    </li>
                                    <li className="footer_top-li"><h1 className="footer_top-title">Sản phẩm an toàn</h1></li>
                                    <li className="footer_top-li"><p className="footer_top-description">Sản phẩm đảm bảo vệ sinh an toàn thực phẩm, không chất bảo quản, đảm bảo tươi sạch từ quy trình sản xuất đến người tiêu dùng.</p></li>
                                </ul>
                            </div>
                        </Col>

                        <Col md={3}>
                            <div className="footer_top-1">
                                <ul>
                                    <li className="footer_top-li">
                                        <img src="https://cdn-crownx.winmart.vn/images/prod/162964658411816287682628462%20(1).png"></img><br></br><br></br>
                                    </li>
                                    <li className="footer_top-li"><h1 className="footer_top-title">Chất lượng cam kết</h1></li>
                                    <li className="footer_top-li"><p className="footer_top-description">Chú trọng khẩu tuyển chọn nhân viên chuyên nghiệp, sản phẩm của FD-Mart luôn được thêm mới, đa dạng nhằm phục vụ người tiêu dùng tốt nhất.</p></li>
                                </ul>
                            </div>
                        </Col>

                        <Col md={3}>
                            <div className="footer_top-1">
                                <ul>
                                    <li className="footer_top-li">
                                        <img src="https://cdn-crownx.winmart.vn/images/prod/162964661464516287682943943%20(1).png"></img><br></br><br></br>

                                    </li>
                                    <li className="footer_top-li"><h1 className="footer_top-title">Dịch vụ vượt trội</h1></li>
                                    <li className="footer_top-li"><p className="footer_top-description">FD-Mart cùng với đội ngũ nhân viên mang đầy sức trẻ và nhiệt huyết, chúng tôi luôn mong muốn đem lại cho khách hàng của mình chất lượng dịch vụ tốt nhất, luôn lắng nghe và chăm sóc những nhu cầu dù là nhỏ nhất của Quý khách.</p></li>
                                </ul>
                            </div>
                        </Col>

                        <Col md={3}>
                            <div className="footer_top-1">
                                <ul>
                                    <li className="footer_top-li">
                                        <img src="https://cdn-crownx.winmart.vn/images/prod/162964665580516292779811154%20(1).png"></img><br></br><br></br>

                                    </li>
                                    <li className="footer_top-li"><h1 className="footer_top-title">Giao hàng nhanh</h1></li>
                                    <li className="footer_top-li"><p className="footer_top-description">Để tăng cường sự tin tưởng và yên tâm với khách hàng, FD-Mart cam kết luôn giao hàng đúng giờ và chi phí giao hàng rẻ nhất để đảm bảo khách hàng có thể nhận sản phẩm trong thời gian nhanh nhất.</p></li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

            <footer style={{ background: "#008c7a" }}>
                <div className="container">
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
                                        <strong style={{ color: "#2c2c2c" }}>Kết nối với chúng tôi</strong>
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
                                    <strong style={{ color: "#2c2c2c" }}>Về chúng tôi</strong>
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
                                    <strong style={{ color: "#2c2c2c" }}>Hỗ trợ khách hàng</strong>
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
                                    <strong style={{ color: "#2c2c2c" }}>
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
            <ScrollToTop smooth color="#008c7a" style={{ background: "#d3b062" }} />
        </div>
    );
}

export default AdminDashboard;