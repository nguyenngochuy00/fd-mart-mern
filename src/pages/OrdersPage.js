import React, { useEffect, useState } from "react";
import { Badge, Container, Table, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "../components/Loading";
import "../style/OrdersPage.css";
import ScrollToTop from "react-scroll-to-top";

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
    <div className="home" style={{ marginTop: '56px' }}>
      <Container style={{ minHeight: "95vh" }}><br></br>
        <h2 className="text-center" style={{ color: "#008c7a", textTransform: "uppercase" }}>Đơn hàng</h2><br></br>
        <Table responsive striped bordered style={{ background: "#F9F8F4" }} >
          <thead>
            <tr>
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

          <tbody >
            {orders.map((order) => (
              <tr className="table-client-order">
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{order.phone}</td>
                <td>{order.address}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.date}</td>
                {/* <td>{order.count}</td> */}
                <td>{order.total} ₫</td>
                <td>
                  <Badge bg={`${order.status == "Đang xử lý" ? "warning" : "success"}`} text="white">
                    {order.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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

export default OrdersPage;