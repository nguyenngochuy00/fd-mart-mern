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
import banner from"../images/banner.png"
import sale from"../images/sale.png"

function Home() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const lastProducts = products.slice(0, 8);
    useEffect(() => {
        axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
    }, []);

    return (
      <div>
        <img src={banner} className="home-banner" />
        <div className="featured-products-container container mt-4">
          <h2>DANH SÁCH SẢN PHẨM</h2>
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
              to="/category/list"
              style={{
                textAlign: "right",
                display: "block",
                textDecoration: "none",
              }}
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
          <h2>DANH MỤC SẢN PHẨM</h2>
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

        <div style={{ marginTop: "10px", backgroundColor: "#F9F8F4" }}>
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
            <Col sm={3}><strong>Sản phẩm an toàn</strong></Col>
            <Col sm={3}><strong>Chất lượng cam kết</strong></Col>
            <Col sm={3}><strong>Dịch vụ vượt trội</strong></Col>
            <Col sm={3}><strong>Giao hàng nhanh</strong></Col>
          </Row>
        </div>

        {/* <div style={{ marginTop: "10px", backgroundColor: "#F9F8F4" }}>
          <Row>
            <Col style={{textAlign: "left" }}>
              FD - MART
              <br></br>Công ty cổ phần dịch vụ thương mại FD-Mart
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
            <Col sm={3}><strong>Sản phẩm an toàn</strong></Col>
            <Col sm={3}><strong>Chất lượng cam kết</strong></Col>
            <Col sm={3}><strong>Dịch vụ vượt trội</strong></Col>
            <Col sm={3}><strong>Giao hàng nhanh</strong></Col>
          </Row>
        </div> */}
      </div>
    );
}

export default Home;