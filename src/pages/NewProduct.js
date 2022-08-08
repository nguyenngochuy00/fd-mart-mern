import React, { useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../services/appApi";
import axios from "../axios";
import "../style/NewProduct.css";

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
        <Container>
            <Row>
                <Col md={6} className="new-product__form--container">
                    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <h1 className="mt-4">Thêm mới sản phẩm</h1>
                        {isSuccess && <Alert variant="success">Sản phẩm đã được thêm mới</Alert>}
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        
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
                            <Form.Label>Phân loại</Form.Label>
                            <Form.Select>
                                <option disabled selected>
                                    -- Lựa chọn --
                                </option>
                                <option value="rau">Rau - Củ - Trái cây</option>
                                <option value="Thịt - Trứng - Hải sản">Thịt - Trứng - Hải sản</option>
                                <option value="Sữa - Sản phẩm từ sữa">Sữa - Sản phẩm từ sữa</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Button type="button" onClick={showWidget}>
                                Thêm hình ảnh sản phẩm
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
                            <Button type="submit" disabled={isLoading || isSuccess}>
                                Tạo sản phẩm
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={6} className="new-product__image--container"></Col>
            </Row>
        </Container>
    );
}

export default NewProduct;