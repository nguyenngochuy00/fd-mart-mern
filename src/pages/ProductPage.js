import axios from "../axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Container, Row, Col, Badge, ButtonGroup, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import SimilarProduct from "../components/SimilarProduct";
import "../style/ProductPage.css";
import { LinkContainer } from "react-router-bootstrap";
import { useAddToCartMutation } from "../services/appApi";
import ToastMessage from "../components/ToastMessage";
import ScrollToTop from "react-scroll-to-top";

function ProductPage() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [addToCart, { isSuccess }] = useAddToCartMutation();

  const handleDragStart = (e) => e.preventDefault();
  useEffect(() => {
    axios.get(`/products/${id}`).then(({ data }) => {
      setProduct(data.product);
      setSimilar(data.similar);
    });
  }, [id]);

  if (!product) {
    return <Loading />;
  }

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    720: { items: 3 },
    960: { items: 4 },
    1024: { items: 5 },
  };

  const images = product.pictures.map((picture) => <img className="product__carousel--image" src={picture.url} onDragStart={handleDragStart} />);

  let similarProducts = [];
  if (similar) {
    similarProducts = similar.map((product, idx) => (
      <div className="item" data-value={idx}>
        <SimilarProduct {...product} />
      </div>
    ));
  }

  return (
    <div className="home" style={{ marginTop: '56px' }}>
      <Container className="pt-4" style={{ position: "relative" }}><br></br>
        <h2 style={{ color: "#008c7a", textTransform: "uppercase" }}>Thông tin sản phẩm</h2><br></br>
        <Row style={{ background: "#F9F8F4", padding: "10px", borderRadius: "20px" }}>
          <Col md={6}>
            <AliceCarousel mouseTracking items={images} controlsStrategy="alternate" />
          </Col>

          <Col md={6} className="pt-4">
            <h1>{product.name}</h1>
            <p>
              <Badge bg="warning" text="dark">{product.category}</Badge>
            </p>
            <h6 className="product__price">Giá: <strong style={{ color: "red" }}>{product.price} ₫</strong></h6>
            <p style={{ textAlign: "justify" }} className="py-3">
              <h5><strong>Mô tả: </strong></h5>
              <div>
                {product.description}
              </div>
            </p>

            {user && !user.isAdmin && (
              <ButtonGroup style={{ width: "90%", gap: "10px" }}>
                <Form.Select size="lg" style={{ width: "40%", borderRadius: "20px" }}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </Form.Select>

                <Button style={{ borderRadius: "20px" }} size="lg" variant="danger" onClick={() => addToCart({ userId: user._id, productId: id, price: product.price, image: product.pictures[0].url })}>
                  Thêm vào giỏ hàng
                </Button>
              </ButtonGroup>
            )}

            {user && user.isAdmin && (
              <LinkContainer to={`/product/${product._id}/edit`}>
                <ButtonGroup style={{ width: "90%" }}>
                  <Button style={{ borderRadius: "20px" }} size="lg" variant="warning">Sửa sản phẩm</Button>
                </ButtonGroup>
              </LinkContainer>
            )}

            {isSuccess && <ToastMessage bg="info" title="Thêm vào giỏ hàng" body={`${product.name} được thêm vào giỏ hàng`} />}
          </Col>
        </Row><br></br>

        <div className="pt-4" >
          <h2 style={{ color: "#008c7a", textTransform: "uppercase" }}>Sản phẩm liên quan</h2><br></br>

          <div className="d-flex justify-content-center align-items-center flex-wrap" style={{ background: "#F9F8F4", borderRadius: '20px', width: '100%' }}>
            <AliceCarousel mouseTracking items={similarProducts} responsive={responsive} controlsStrategy="alternate" autoPlay="false" infinite="false" autoPlayInterval={1000} keyboardNavigation="false" />
          </div>
        </div>

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

export default ProductPage;