import React, { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../services/appApi";

function CheckoutForm() {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [createOrder, { isLoading, isError, isSuccess, error }] = useCreateOrderMutation();
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (!address || !phone || !paymentMethod || user.cart.count <= 0) {
            return alert("Điền đủ thông tin");
        }
        createOrder({ userId: user._id, cart: user.cart, address, phone, paymentMethod }).then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate("/orders");  // back to homepage
                }, 3000);
            }
        });
    }

    return (
        <Col className="cart-payment-container">
            <Form onSubmit={handleSubmit}>
                <Row>
                    {isSuccess && <Alert variant="success">Đơn hàng đã được thêm</Alert>}
                    {isError && <Alert variant="danger">{error.data}</Alert>}


                    <Form.Group className="mb-3">
                        <Form.Label>Họ tên</Form.Label>
                        <Form.Control type="text" placeholder="Họ tên" value={user.name} disabled />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Email" value={user.email} disabled />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control type="text" placeholder="Nhập địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </Form.Group>



                    <Form.Group className="mb-3">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control type="text" placeholder="Nhập SĐT" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </Form.Group>


                    <Form.Group className="mb-3" onChange={(e) => setPaymentMethod(e.target.value)}>
                        <Form.Label>Phương thức thanh toán</Form.Label>
                        <Form.Select>
                            <option disabled selected>
                                -- Lựa chọn --
                            </option>
                            <option value="Thanh toán trực tiếp">Thanh toán trực tiếp</option>

                        </Form.Select>
                    </Form.Group>




                </Row>
                <Button style={{ borderRadius: "20px" }} className="mt-3" type="submit" variant="success" disabled={user.cart.count <= 0 || isLoading || isSuccess}>
                    Thanh toán
                </Button>

            </Form>

        </Col>
    );
}

export default CheckoutForm;