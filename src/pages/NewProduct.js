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
                        <h2 style={{ color: "#008c7a", textTransform: "uppercase", paddingBottom: "10px" }}>Th??m m???i s???n ph???m</h2>
                        {isSuccess && <Alert variant="success">S???n ph???m ???? ???????c th??m m???i</Alert>}
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form style={{ width: "100%", background: "#F9F8F4", borderRadius: "20px" }} onSubmit={handleSubmit}>


                            <Form.Group className="mb-3">
                                <Form.Label>T??n s???n ph???m</Form.Label>
                                <Form.Control type="text" placeholder="Nh???p t??n s???n ph???m" value={name} required onChange={(e) => setName(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>M?? t??? s???n ph???m</Form.Label>
                                <Form.Control as="textarea" placeholder="Nh???p m?? t??? s???n ph???m" style={{ height: "100px" }} value={description} required onChange={(e) => setDescription(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Gi?? (?????ng)</Form.Label>
                                <Form.Control type="text" placeholder="Gi?? (?????ng)" value={price} required onChange={(e) => setPrice(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" onChange={(e) => setCategory(e.target.value)}>
                                <Form.Label>Danh m???c s???n ph???m</Form.Label>
                                <Form.Select>
                                    <option disabled selected>
                                        -- Danh m???c --
                                    </option>
                                    <option value="rau - c??? - tr??i c??y">rau - c??? - tr??i c??y</option>
                                    <option value="th???t - tr???ng - h???i s???n">th???t - tr???ng - h???i s???n</option>
                                    <option value="s???a - s???n ph???m t??? s???a">s???a - s???n ph???m t??? s???a</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Button type="button" onClick={showWidget} style={{ borderRadius: "20px" }}>
                                    T???i ???nh s???n ph???m
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
                                    T???o s???n ph???m
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
                                    <li className="footer_top-li"><h1 className="footer_top-title">S???n ph???m an to??n</h1></li>
                                    <li className="footer_top-li"><p className="footer_top-description">S???n ph???m ?????m b???o v??? sinh an to??n th???c ph???m, kh??ng ch???t b???o qu???n, ?????m b???o t????i s???ch t??? quy tr??nh s???n xu???t ?????n ng?????i ti??u d??ng.</p></li>
                                </ul>
                            </div>
                        </Col>

                        <Col md={3}>
                            <div className="footer_top-1">
                                <ul>
                                    <li className="footer_top-li">
                                        <img src="https://cdn-crownx.winmart.vn/images/prod/162964658411816287682628462%20(1).png"></img><br></br><br></br>
                                    </li>
                                    <li className="footer_top-li"><h1 className="footer_top-title">Ch???t l?????ng cam k???t</h1></li>
                                    <li className="footer_top-li"><p className="footer_top-description">Ch?? tr???ng kh???u tuy???n ch???n nh??n vi??n chuy??n nghi???p, s???n ph???m c???a FD-Mart lu??n ???????c th??m m???i, ??a d???ng nh???m ph???c v??? ng?????i ti??u d??ng t???t nh???t.</p></li>
                                </ul>
                            </div>
                        </Col>

                        <Col md={3}>
                            <div className="footer_top-1">
                                <ul>
                                    <li className="footer_top-li">
                                        <img src="https://cdn-crownx.winmart.vn/images/prod/162964661464516287682943943%20(1).png"></img><br></br><br></br>

                                    </li>
                                    <li className="footer_top-li"><h1 className="footer_top-title">D???ch v??? v?????t tr???i</h1></li>
                                    <li className="footer_top-li"><p className="footer_top-description">FD-Mart c??ng v???i ?????i ng?? nh??n vi??n mang ?????y s???c tr??? v?? nhi???t huy???t, ch??ng t??i lu??n mong mu???n ??em l???i cho kh??ch h??ng c???a m??nh ch???t l?????ng d???ch v??? t???t nh???t, lu??n l???ng nghe v?? ch??m s??c nh???ng nhu c???u d?? l?? nh??? nh???t c???a Qu?? kh??ch.</p></li>
                                </ul>
                            </div>
                        </Col>

                        <Col md={3}>
                            <div className="footer_top-1">
                                <ul>
                                    <li className="footer_top-li">
                                        <img src="https://cdn-crownx.winmart.vn/images/prod/162964665580516292779811154%20(1).png"></img><br></br><br></br>

                                    </li>
                                    <li className="footer_top-li"><h1 className="footer_top-title">Giao h??ng nhanh</h1></li>
                                    <li className="footer_top-li"><p className="footer_top-description">????? t??ng c?????ng s??? tin t?????ng v?? y??n t??m v???i kh??ch h??ng, FD-Mart cam k???t lu??n giao h??ng ????ng gi??? v?? chi ph?? giao h??ng r??? nh???t ????? ?????m b???o kh??ch h??ng c?? th??? nh???n s???n ph???m trong th???i gian nhanh nh???t.</p></li>
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
                                        C??ng ty C??? ph???n D???ch v??? Th????ng m???i FD-Mart
                                    </li>
                                    <li className="footer-li">?????a ch???: H?? N???i</li>
                                    <li className="footer-li">
                                        <i class="fa-solid fa-phone-volume"></i> Hotline:
                                        0987.654.321
                                    </li>
                                    <li className="footer-li">
                                        <i class="fa-solid fa-envelope-circle-check"></i> Email:
                                        fdmart@gmail.com
                                    </li>

                                    <li className="footer-li">
                                        <strong style={{ color: "#2c2c2c" }}>K???t n???i v???i ch??ng t??i</strong>
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
                                    <strong style={{ color: "#2c2c2c" }}>V??? ch??ng t??i</strong>
                                    <li className="footer-li">Gi???i thi???u v??? FD-Mart</li>
                                    <li className="footer-li">C??u chuy???n v??? FD-Mart</li>
                                    <li className="footer-li">Qu???n l?? ch???t l?????ng</li>
                                    <li className="footer-li">
                                        Ch??nh s??ch b???o m???t v?? chia s??? th??ng tin
                                    </li>
                                    <li className="footer-li">
                                        ??i???u ki???n v?? ??i???u kho???n giao d???ch
                                    </li>
                                </ul>
                            </div>
                        </Col>

                        <Col md={3}>
                            <div style={{ gap: "10px" }} className="footer-column">
                                <ul>
                                    <strong style={{ color: "#2c2c2c" }}>H??? tr??? kh??ch h??ng</strong>
                                    <li className="footer-li">Trung t??m h??? tr??? kh??ch h??ng</li>
                                    <li className="footer-li">Ch??nh s??ch giao h??ng</li>
                                    <li className="footer-li">Ch??nh s??ch thanh to??n</li>
                                    <li className="footer-li">Ch??nh s??ch ?????i tr???</li>
                                    <li className="footer-li">
                                        Ch??nh s??ch chi???t kh???u ??u ????i mua s???m
                                    </li>
                                </ul>
                            </div>
                        </Col>

                        <Col md={3}>
                            <div style={{ gap: "10px" }} className="footer-column">
                                <ul>
                                    <strong style={{ color: "#2c2c2c" }}>
                                        Ch??m s??c kh??ch h??ng
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
                        B???n quy???n thu???c v??? <a href="https://chimerical-caramel-c205a4.netlify.app/" style={{ color: '#deb062', fontSize: '14px', textDecoration: 'none' }}>fdmart.com.vn</a>
                    </strong>
                </div>
            </footer>
            <ScrollToTop smooth color="#008c7a" style={{ background: "#d3b062" }} />
        </div>
    );
}

export default NewProduct;