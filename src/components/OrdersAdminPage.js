import React, { useEffect, useState } from "react";
import { Badge, Button, Modal, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "./Loading";
// import Pagination from "./Pagination";

function OrdersAdminPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const products = useSelector((state) => state.products);
    const [orderToShow, setOrderToShow] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    function markShipped(orderId, ownerId) {
        axios
            .patch(`/orders/${orderId}/mark-shipped`, { ownerId })
            .then(({ data }) => setOrders(data))
            .catch((e) => console.log(e));
    }

    function showOrder(productsObj) {
        let productsToShow = products.filter((product) => productsObj[product._id]);
        productsToShow = productsToShow.map((product) => {
            const productCopy = { ...product };
            productCopy.count = productsObj[product._id];
            delete productCopy.description;
            return productCopy;
        });
        console.log(productsToShow);
        setShow(true);
        setOrderToShow(productsToShow);
    }

    useEffect(() => {
        setLoading(true);
        axios
            .get("/orders")
            .then(({ data }) => {
                setLoading(false);
                setOrders(data);
            })
            .catch((e) => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (orders.length === 0) {
        return <h1 className="text-center pt-4">Không có đơn hàng</h1>;
    }

    // function TableRow({ _id, count, owner, total, status, products, address }) {
    //     return (
    //         <tr>
    //             <td>{_id}</td>
    //             <td>{owner?.name}</td>
    //             <td>{count}</td>
    //             <td>{total}</td>
    //             <td>{address}</td>
    //             <td>
    //                 {status === "processing" ? (
    //                     <Button size="sm" onClick={() => markShipped(_id, owner?._id)}>
    //                         Mark as shipped
    //                     </Button>
    //                 ) : (
    //                     <Badge bg="success">Shipped</Badge>
    //                 )}
    //             </td>
    //             <td>
    //                 <span style={{ cursor: "pointer" }} onClick={() => showOrder(products)}>
    //                     View order <i className="fa fa-eye"></i>
    //                 </span>
    //             </td>
    //         </tr>
    //     );
    // }

    return (
      <>
        <Table responsive striped bordered hover style={{ background: "#F9F8F4" }}>
          <thead>
            <tr>
              {/* <th>Mã đơn hàng</th> */}
              <th>Tên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Địa chỉ</th>
              <th>Phương thức</th>
              <th>Ngày đặt hàng</th>
              {/* <th>Số lượng đơn hàng</th> */}
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {/* <Pagination data={orders} RenderComponent={TableRow} pageLimit={1} dataLimit={10} tablePagination={true} /> */}
            {orders.map((order) => (
                <tr className="table-admin">
                    {/* <td>{order._id}</td> */}
                    <td>{order.owner?.name}</td>
                    <td>{order.owner?.email}</td>
                    <td>{order.phone}</td>
                    <td>{order.address}</td>
                    <td>{order.paymentMethod}</td>
                    <td>{order.date}</td>
                    {/* <td>{order.count}</td> */}
                    <td>{order.total} ₫</td>
                    <td>
                        {order.status === "Đang xử lý" ? (
                        <Button
                            variant="warning"
                            size="sm"
                            onClick={() => markShipped(order._id, order.owner?._id)}
                        >
                            Xác nhận đơn hàng
                        </Button>
                        ) : (
                        <Badge bg="success">Đã giao hàng</Badge>
                        )}
                    </td>
                     
                    <td>
                        <span
                        style={{ cursor: "pointer" }}
                        onClick={() => showOrder(products)}
                        >
                        Xem đơn hàng <i className="fa fa-eye"></i>
                        </span>
                    </td>
                </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Chi tiết đơn hàng</Modal.Title>
          </Modal.Header>
          {orderToShow.map((order) => (
            <div className="order-details__container d-flex justify-content-around py-2">
              <img
                src={order.pictures[0].url}
                style={{ maxWidth: 100, height: 100, objectFit: "cover" }}
              />
              <p>
                <span>{order.count} x </span> {order.name}
              </p>
              <p>Price: {Number(order.price) * order.count} ₫</p>
            </div>
          ))}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default OrdersAdminPage;