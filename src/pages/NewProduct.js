import React, { useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../services/appApi";
import axios from "../axios";
import "../style/NewProduct.css";
import ScrollToTop from "react-scroll-to-top";

function NewProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [imgToRemove, setImgToRemove] = useState(null);
    const navigate = useNavigate();
    const [createProduct, { isError, error, isLoading, isSuccess }] = useCreateProductMutation();

    function handleRemoveImg(imgObj) {
        setImgToRemove(imgObj.public_id);
        axios
            .delete(`/images/${imgObj.public_id}/`)
            .then((res) => {
                setImgToRemove(null);
                setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
            })
            .catch((e) => console.log(e));
    }

    // xu ly event cho form create product
    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !description || !price || !category || !images.length) {
            return alert("Please fill out all the fields");
        }
        createProduct({ name, description, price, category, images }).then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate("/");  // back to homepage
                }, 1500);
            }
        });
    }

    // show bang upload image
    function showWidget() {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "dsifphmq0",
                uploadPreset: "yif5okxg",
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
                }
            }
        );
        widget.open();
    }

    return (
        <div className="home" style={{ marginTop: '56px' }}>
            <Container style={{ paddingTop: '10px' }}>
                <Row>
                    <Col md={6} className="new-product__form--container" >
                        <h2 style={{ color: "#008c7a", textTransform: "uppercase", paddingBottom: "10px" }}>Thêm mới sản phẩm</h2>
                        {isSuccess && <Alert variant="success">Sản phẩm đã được thêm mới</Alert>}
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form style={{ width: "100%", background: "#F9F8F4", borderRadius: "20px" }} onSubmit={handleSubmit}>


                            <Form.Group className="mb-3">
                                <Form.Label>Tên sản phẩm</Form.Label>
                                <Form.Control type="text" placeholder="Nhập tên sản phẩm" value={name} required onChange={(e) => setName(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Mô tả sản phẩm</Form.Label>
                                <Form.Control as="textarea" placeholder="Nhập mô tả sản phẩm" style={{ height: "100px" }} value={description} required onChange={(e) => setDescription(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Giá (đồng)</Form.Label>
                                <Form.Control type="text" placeholder="Giá (đồng)" value={price} required onChange={(e) => setPrice(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" onChange={(e) => setCategory(e.target.value)}>
                                <Form.Label>Danh mục sản phẩm</Form.Label>
                                <Form.Select>
                                    <option disabled selected>
                                        -- Danh mục --
                                    </option>
                                    <option value="rau - củ - trái cây">rau - củ - trái cây</option>
                                    <option value="thịt - trứng - hải sản">thịt - trứng - hải sản</option>
                                    <option value="sữa - sản phẩm từ sữa">sữa - sản phẩm từ sữa</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Button type="button" onClick={showWidget} style={{ borderRadius: "20px" }}>
                                    Tải ảnh sản phẩm
                                </Button>
                                <div className="images-preview-container">
                                    {images.map((image) => (
                                        <div className="image-preview">
                                            <img src={image.url} />
                                            {imgToRemove != image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                                        </div>
                                    ))}
                                </div>
                            </Form.Group>

                            <Form.Group>
                                <Button variant="success" type="submit" disabled={isLoading || isSuccess} style={{ borderRadius: "20px" }}>
                                    Tạo sản phẩm
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col md={6} className="new-product__image--container" style={{ borderRadius: "20px", paddingTop: "10px" }}></Col>
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

export default NewProduct;