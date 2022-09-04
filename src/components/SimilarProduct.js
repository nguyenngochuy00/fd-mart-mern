import React from "react";
import { Badge, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function SimilarProduct({ _id, name, category, pictures, price }) {
    return (
        <LinkContainer to={`/product/${_id}`} className="product-preview" style={{ cursor: "pointer", width: "13rem", margin: "10px", padding: "10px" }}>
            <Card style={{ width: "20rem", margin: "10px" }} data-toggle="tooltip" title={name}>
                <Card.Img variant="top" className="product-preview-img" src={pictures[0].url} style={{ height: "150px", objectFit: "cover" }} />
                <Card.Body>
                    <Card.Subtitle style={{ objectFit: "cover", height: "100px" }}>{name}</Card.Subtitle>
                    <Badge bg="warning" text="dark">
                        {category}
                    </Badge>
                    <Card.Text><strong>{price} ₫</strong></Card.Text>
                </Card.Body>
                <Card.Footer style={{ color: "white", backgroundColor: "red", borderRadius: "20px" }}>Xem chi tiết</Card.Footer>
            </Card>
        </LinkContainer>
    );
}

export default SimilarProduct;