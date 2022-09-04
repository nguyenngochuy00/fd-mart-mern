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
import ScrollToTop from "react-scroll-to-top";

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
        <Link to="/category/all">
          <img src={sale} className="home-banner" />
        </Link>
      </AliceCarousel>

      <div className="recent-products-container container mt-4">
        <h2 style={{ color: "#008c7a" }}>DANH MỤC SẢN PHẨM</h2>
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
                    borderRadius: "20px",
                  }}
                  className="category-tile"
                >
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
        <br></br>
      </div>

      <div className="featured-products-container container mt-4">
        <h2 style={{ color: "#008c7a" }}>DANH SÁCH SẢN PHẨM</h2><br></br>
        {/* last products here */}
        <div
          className="d-flex justify-content-center flex-wrap"
          style={{ background: "#F9F8F4", borderRadius: "20px" }}
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
              textDecoration: "underline",
              fontSize: "20px",
              fontWeight: "bold",
            }}
            className="product-list"
          >
            Xem thêm {">>"}
          </Link>
        </div>
      </div>

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

export default Home;