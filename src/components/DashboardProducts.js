import React from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../services/appApi";
import "../style/DashboardProducts.css";
// import Pagination from "./Pagination";

function DashboardProducts() {
    const products = useSelector((state) => state.products);
    const user = useSelector((state) => state.user);
    // removing the product
    const [deletProduct, { isLoading, isSuccess }] = useDeleteProductMutation();
    
    function handleDeleteProduct(id) {
        // logic here
        if (window.confirm("Bạn chắc chắn xóa sản phẩm này?")) deletProduct({ product_id: id, user_id: user._id });
    }

    // function TableRow({ pictures, _id, name, price }) {
    //     return (
    //         <tr>
    //             <td>
    //                 <img src={pictures[0].url} className="dashboard-product-preview" />
    //             </td>
    //             <td>{_id}</td>
    //             <td>{name}</td>
    //             <td>{price}</td>
    //             <td>
    //                 <Button onClick={() => handleDeleteProduct(_id, user._id)} disabled={isLoading}>
    //                     Delete
    //                 </Button>
    //                 <Link to={`/product/${_id}/edit`} className="btn btn-warning">
    //                     Edit
    //                 </Link>
    //             </td>
    //         </tr>
    //     );
    // }

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th></th>
                    {/* <th>Mã sản phẩm</th> */}
                    <th>Tên sản phẩm</th>
                    <th>Giá bán</th>
                    <th>Danh mục</th>
                </tr>
            </thead>

            <tbody>
                {/* <Pagination data={products} RenderComponent={TableRow} pageLimit={1} dataLimit={5} tablePagination={true} /> */}
                {products.map((product) => (
                    <tr>
                      <td>
                        <img src={product.pictures[0].url} className="dashboard-product-preview"/>
                      </td>
                      {/* <td>{product._id}</td> */}
                      <td>{product.name}</td>
                      <td>{product.price} ₫</td>
                      <td>{product.category}</td>
                      <td>
                        <Link to={`/product/${product._id}/edit`} className="btn btn-warning">
                          Sửa
                        </Link>
                        <Button onClick={() => handleDeleteProduct(product._id, user._id)} className="btn btn-danger" disabled={isLoading}>
                          Xóa
                        </Button>
                      </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default DashboardProducts;