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
        <Container style={{ minHeight: "95vh" }} className="cart-container">
            <Row>
            <h1 className="pt-2 h3">GIỎ HÀNG</h1>
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
                                <h3 className="h4 pt-4">Tổng: {user.cart.total} ₫</h3>
                            </div>
                        </>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default CartPage;