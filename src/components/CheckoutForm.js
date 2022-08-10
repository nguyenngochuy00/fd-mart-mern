// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../services/appApi";

function CheckoutForm() {
    // const stripe = useStripe();
    // const elements = useElements();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    // const [alertMessage, setAlertMessage] = useState("");
    const [createOrder, { isLoading, isError, isSuccess, error}] = useCreateOrderMutation();
    // const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("");

    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");

    // const [paying, setPaying] = useState(false);

    // async function handlePay(e) {
    //     e.preventDefault();
    //     if (!stripe || !elements || user.cart.count <= 0) return;
    //     setPaying(true);
    //     const { client_secret } = await fetch("http://localhost:8080/create-payment", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: "Bearer ",
    //         },
    //         body: JSON.stringify({ amount: user.cart.total }),
    //     }).then((res) => res.json());
    //     const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
    //         payment_method: {
    //             card: elements.getElement(CardElement),
    //         },
    //     });
    //     setPaying(false);

    //     if (paymentIntent) {
    //         createOrder({ userId: user._id, cart: user.cart, address, country }).then((res) => {
    //             if (!isLoading && !isError) {
    //                 setAlertMessage(`Payment ${paymentIntent.status}`);
    //                 setTimeout(() => {
    //                     navigate("/orders");
    //                 }, 3000);
    //             }
    //         });
    //     }
    // }

    function handleSubmit(e) {
        e.preventDefault();
        if (!address || !phone || !paymentMethod || user.cart.count <= 0) {
            return alert("Điền đủ thông tin");
        }
        createOrder({userId: user._id, cart: user.cart, address, phone, paymentMethod}).then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate("/orders");  // back to homepage
                }, 3000);
            }
        });
    }

    return (
        <Col className="cart-payment-container">
            {/* <Form onSubmit={handlePay}> */}
            <Form onSubmit={handleSubmit}>
                <Row>
                    {/* {alertMessage && <Alert>{alertMessage}</Alert>} */}
                    {isSuccess && <Alert variant="success">Đơn hàng đã được thêm</Alert>}
                    {isError && <Alert variant="danger">{error.data}</Alert>}

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Họ tên</Form.Label>
                            <Form.Control type="text" placeholder="Họ tên" value={user.name} disabled />
                        </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Email" value={user.email} disabled />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={7}>
                        <Form.Group className="mb-3">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control type="text" placeholder="Nhập địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        </Form.Group>
                    </Col>

                    {/* <Col md={5}>
                        <Form.Group className="mb-3">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
                        </Form.Group>
                    </Col> */}

                    <Col md={5}>
                        <Form.Group className="mb-3">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control type="text" placeholder="Nhập SĐT" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3" onChange={(e) => setPaymentMethod(e.target.value)}>
                        <Form.Label>Phương thức thanh toán</Form.Label>
                            <Form.Select>
                                <option disabled selected>
                                    -- Lựa chọn --
                                </option>
                                <option value="Thanh toán trực tiếp">Thanh toán trực tiếp</option>
                                {/* <option value="tablets" disabled selected>Chuyển khoản</option> */}
                                {/* <option value="phones">phones</option>
                                <option value="laptops">laptops</option> */}
                            </Form.Select>
                </Form.Group>

                {/* <label htmlFor="card-element">Card</label>
                <CardElement id="card-element" /> */}

                <Button className="mt-3" type="submit" variant="success" disabled={user.cart.count <= 0 || isLoading || isSuccess}>
                    Thanh toán
                </Button>
            </Form>
        </Col>
    );
}

export default CheckoutForm;