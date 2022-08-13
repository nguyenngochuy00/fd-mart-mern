import axios from "../axios";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import categories from "../categories";
import "../style/Home.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";
import banner from "../images/banner.png"
import banner_meat from "../images/banner_meat.png"
import sale from "../images/sale.png"
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const lastProducts = products.slice(0, 8);
  useEffect(() => {
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
  }, []);



  return (
    <div className="home">
      <AliceCarousel
        controlsStrategy="alternate"
        autoPlay="false"
        infinite="false"
        animationDuration={3000}
      >
        <Link to="/category/all">
          <img src={banner} className="home-banner" />
        </Link>
        <Link to="/category/rau - củ - trái cây">
          <img
            src="https://cdn-crownx.winmart.vn/images/prod/rau%20c%E1%BB%A7%20th%E1%BB%8Bt_1180x400-02_f4fb5d58-9253-4fb0-bde1-6357cc88d3e8.jpg"
            className="home-banner"
          />
        </Link>
        <Link to="/category/thịt - trứng - hải sản">
          <img src={banner_meat} className="home-banner" />
        </Link>
        <Link to="/category/sữa - sản phẩm từ sữa">
          <img
            src="https://cdn-crownx.winmart.vn/images/prod/b%C6%A1%20tr%E1%BB%A9ng%20s%E1%BB%AFa_1180x400-25_deeedae5-5729-4c8f-b7fb-ad0d9cadc035.jpg"
            className="home-banner"
          />
        </Link>
      </AliceCarousel>

      <div className="featured-products-container container mt-4">
        <h2 style={{ color: "#d3b062" }}>DANH SÁCH SẢN PHẨM</h2>
        {/* last products here */}
        <div
          className="d-flex justify-content-center flex-wrap"
          style={{ background: "#F9F8F4" }}
        >
          {lastProducts.map((product) => (
            <ProductPreview {...product} />
          ))}
        </div>
        <div className="d-flex justify-content-center flex-wrap"></div>
        <div>
          <Link
            to="/category/all"
            style={{
              textAlign: "right",
              display: "block",
              textDecoration: "none",
              fontSize: "20px",
            }}
            className="product-list"
          >
            Xem thêm {">>"}
          </Link>
        </div>
      </div>

      {/* sale banner */}
      <div className="sale__banner--container mt-4">
        <img src={sale} />
      </div>

      <div className="recent-products-container container mt-4">
        <h2 style={{ color: "#d3b062" }}>DANH MỤC SẢN PHẨM</h2>
        <Row>
          {categories.map((category) => (
            <LinkContainer
              to={`/category/${category.name.toLocaleLowerCase()}`}
            >
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`,
                    gap: "10px",
                  }}
                  className="category-tile"
                >
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>

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

export default Home;