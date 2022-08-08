import React, { useEffect, useState } from "react";
import { Badge, Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "../components/Loading";
// import "./OrdersPage.css";

function OrdersPage() {
    const user = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/users/${user._id}/orders`)
            .then(({ data }) => {
                setLoading(false);
                setOrders(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e);
            });
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (orders.length === 0) {
        return <h1 className="text-center pt-3">Không có đơn hàng</h1>;
    }

    return (
        <Container>
            <h1 className="text-center">Đơn hàng</h1>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Mã đơn hàng</th>
                        <th>Trạng thái</th>
                        <th>Ngày đặt hàng</th>
                        <th>Tổng tiền</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <tr>
                            <td>{order._id}</td>

                            <td>
                                <Badge bg={`${order.status == "Đang xử lý" ? "warning" : "success"}`} text="white">
                                    {order.status}
                                </Badge>
                            </td>

                            {/* <td>{user.cart}</td> */}
                            

                            <td>{order.date}</td>

                            <td>{order.total} ₫</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default OrdersPage;