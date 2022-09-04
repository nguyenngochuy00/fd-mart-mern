import React from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../services/appApi";
import "../style/DashboardProducts.css";
import Pagination from "./Pagination";

function DashboardProducts() {
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  // removing the product
  const [deletProduct, { isLoading, isSuccess }] = useDeleteProductMutation();

  function handleDeleteProduct(id) {
    // logic here
    if (window.confirm("Bạn chắc chắn xóa sản phẩm này?")) deletProduct({ product_id: id, user_id: user._id });
  }

  // function TableRow({ pictures, _id, name, price, category }) {
  //   return (
  //     <tr className="table-admin">
  //       <td>
  //         <img src={pictures[0].url} className="dashboard-product-preview" />
  //       </td>
  //       {/* <td>{product._id}</td> */}
  //       <td>{name}</td>
  //       <td>{price} ₫</td>
  //       <td>{category}</td>
  //       <td>
  //         <Link to={`/product/${_id}/edit`} className="btn btn-warning" style={{borderRadius: "20px"}}>
  //           Sửa
  //         </Link>
  //         <Button onClick={() => handleDeleteProduct(_id, user._id)} className="btn btn-danger" disabled={isLoading} style={{borderRadius: "20px"}}>
  //           Xóa
  //         </Button>
  //       </td>
  //     </tr>
  //   );
  // }

  return (
    <Table striped bordered responsive style={{ background: "#F9F8F4" }} >
      <thead>
        <tr>
          <th></th>
          {/* <th>Mã sản phẩm</th> */}
          <th>Tên sản phẩm</th>
          <th>Giá bán</th>
          <th>Danh mục</th>
        </tr>
      </thead>

      <tbody >
        {products.map((product) => (
          <tr className="table-admin">
            <td>
              <img src={product.pictures[0].url} className="dashboard-product-preview" />
            </td>
            {/* <td>{product._id}</td> */}
            <td>{product.name}</td>
            <td>{product.price} ₫</td>
            <td>{product.category}</td>
            <td>
              <Link to={`/product/${product._id}/edit`} className="btn btn-warning" style={{ borderRadius: "20px" }}>
                Sửa
              </Link>
              <Button onClick={() => handleDeleteProduct(product._id, product.user._id)} className="btn btn-danger" disabled={isLoading} style={{ borderRadius: "20px" }}>
                Xóa
              </Button>
            </td>
          </tr>
        ))}

        {/* <Pagination data={products} RenderComponent={TableRow} pageLimit={1} dataLimit={5} tablePagination={true} /> */}

      </tbody>
    </Table>
  );
}

export default DashboardProducts;