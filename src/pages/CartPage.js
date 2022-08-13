// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import CheckoutForm from "../components/CheckoutForm";
import { useIncreaseCartProductMutation, useDecreaseCartProductMutation, useRemoveFromCartMutation } from "../services/appApi";
import "../style/CartPage.css";

// const stripePromise = loadStripe("pk_test_51LTjxIGFjx57sPwAJqjm9aqs1pd1MhuyzSJUkAg3CXKJssQyaVo7cucm4OU9YXiieZPpdlhcOuLsELPClV4NPy0u009Wbh3Vje");

function CartPage() {
    const user = useSelector((state) => state.user);
    const products = useSelector((state) => state.products);
    const userCartObj = user.cart;
    let cart = products.filter((product) => userCartObj[product._id] != null);
    const [increaseCart] = useIncreaseCartProductMutation();
    const [decreaseCart] = useDecreaseCartProductMutation();
    const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();

    function handleDecrease(product) {
        const quantity = user.cart.count;
        if (quantity <= 0) return alert("Số lượng sản phẩm không được nhỏ hơn 0");
        decreaseCart(product);
    }

    return (
        <div className="home">
            <Container style={{ minHeight: "95vh" }} className="cart-container">
                <Row>
                    <h1 className="pt-2 h3" style={{ color: "#d3b062" }}>GIỎ HÀNG</h1>
                    <Col style={{ background: "#F9F8F4" }}>

                        {cart.length == 0 ? (
                            <Alert variant="info">Giỏ hàng chưa có sản phẩm. Thêm sản phẩm mới vào giỏ hàng. Nếu đã thanh toán, hãy mở mục đơn hàng đã mua</Alert>
                        ) : (
                            // <Elements stripe={stripePromise}>
                            //     <CheckoutForm />
                            // </Elements>
                            <CheckoutForm />
                        )}
                    </Col>

                    {cart.length > 0 && (
                        <Col md={5} style={{ background: "#F9F8F4" }}>
                            <>
                                <Table responsive="sm" className="cart-table">

                                    <thead>
                                        <tr>
                                            <th>&nbsp;</th>
                                            <th>Sản phẩm</th>
                                            <th>Giá</th>
                                            <th>Số lượng</th>
                                            <th>Tổng tiền</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {/* loop through cart products */}
                                        {cart.map((item) => (
                                            <tr>
                                                <td>&nbsp;</td>

                                                <td>
                                                    {!isLoading && <i className="fa fa-times" style={{ marginRight: 10, cursor: "pointer" }} onClick={() => removeFromCart({ productId: item._id, price: item.price, userId: user._id })}></i>}
                                                    <img src={item.pictures[0].url} style={{ width: 100, height: 100, objectFit: "cover" }} />
                                                </td>

                                                <td>{item.price} ₫</td>

                                                <td>
                                                    <span className="quantity-indicator">
                                                        <i className="fa fa-minus-circle" onClick={() => handleDecrease({ productId: item._id, price: item.price, userId: user._id })}></i>
                                                        <span>{user.cart[item._id]}</span>
                                                        <i className="fa fa-plus-circle" onClick={() => increaseCart({ productId: item._id, price: item.price, userId: user._id })}></i>
                                                    </span>
                                                </td>

                                                <td>{item.price * user.cart[item._id]} ₫</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>

                                <div>
                                    <h3 className="h4 pt-4" >Tổng: <text style={{ color: 'red' }}>{user.cart.total} ₫</text></h3>
                                </div>
                            </>
                        </Col>
                    )}
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

export default CartPage;