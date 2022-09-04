import React from "react";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import CheckoutForm from "../components/CheckoutForm";
import { useIncreaseCartProductMutation, useDecreaseCartProductMutation, useRemoveFromCartMutation } from "../services/appApi";
import "../style/CartPage.css";
import ScrollToTop from "react-scroll-to-top";

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
    <div className="home" style={{ marginTop: '56px' }}>
      <Container style={{ minHeight: "95vh" }} className="cart-container"><br></br>
        <Row style={{ gap: "10px" }}>
          <h2 style={{ color: "#008c7a", textTransform: "uppercase", paddingBottom: "10px" }}>Giỏ hàng</h2>
          <Col style={{ background: "#F9F8F4", borderRadius: "20px" }}>

            {cart.length == 0 ? (
              <div className="cart-empty">
                <img className="cart-empty_icon" src="https://res.cloudinary.com/duitozhul/image/upload/v1656383537/the-pizza-heaven/cart/empty-cart.svg" alt="" />
                <p class="cart-empty_text">Bạn không có sản phẩm!!! (Nếu bạn đã thanh toán sản phẩm, vào mục Đơn hàng để xem sản phẩm)</p>
              </div>
            ) : (
              <CheckoutForm />
            )}
          </Col>

          {cart.length > 0 && (
            <Col md={5} style={{ background: "#F9F8F4", borderRadius: "20px" }}>
              <>
                <Table responsive="sm">

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
                      <tr className="cart-table">
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

export default CartPage;