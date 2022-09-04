import React from "react";
import { Navbar, Button, Nav, NavDropdown, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../features/userSlice";
import "../style/Navigation.css";

function Navigation() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <Navbar bg="" expand="lg" className="navbar" style={{ background: "rgb(0, 140, 122)" }}>
      <Container className="navbar-hover">
        <LinkContainer to="/">
          <Navbar.Brand className="navbar-hover">FD - MART</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="navbar-hover">
              <i class="fa-solid fa-phone"></i> Hotline: 0987.654.321
            </Nav.Link>
            <Nav.Link className="navbar-hover">
              <i class="fa-solid fa-envelope"></i> Tin tức FD-Mart
            </Nav.Link>
            <Nav.Link className="navbar-hover">
              <i class="fa-solid fa-headphones-simple"></i> Tư vấn mua hàng
            </Nav.Link>

            {/* if no user */}
            {!user && (
              <LinkContainer to="/login">
                <Nav.Link className="navbar-hover">
                  <i className="fa-solid fa-right-to-bracket"></i> Đăng nhập
                </Nav.Link>
              </LinkContainer>
            )}

            {/* {user && user.isAdmin && ( */}
            {user && !user.isAdmin && (
              <LinkContainer to="/cart">
                <Nav.Link className="navbar-hover">
                  <i className="fas fa-shopping-cart"></i>
                  {user?.cart.count > 0 && (
                    <span className="badge badge-warning" id="cartcount">
                      {user.cart.count}
                    </span>
                  )}
                  Giỏ hàng
                </Nav.Link>
              </LinkContainer>
            )}

            {/* if user */}
            {user && (
              <NavDropdown title={`${user.email}`} id="basic-nav-dropdown" >
                {user.isAdmin && (
                  <>
                    <LinkContainer to="/admin">
                      <NavDropdown.Item>Quản lý</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/new-product">
                      <NavDropdown.Item>Tạo sản phẩm</NavDropdown.Item>
                    </LinkContainer>
                  </>
                )}

                {!user.isAdmin && (
                  <>
                    <LinkContainer to="/cart">
                      <NavDropdown.Item>Giỏ hàng</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orders">
                      <NavDropdown.Item>Đơn hàng</NavDropdown.Item>
                    </LinkContainer>
                  </>
                )}
                <NavDropdown.Divider />
                <Button
                  variant="danger"
                  onClick={handleLogout}
                  className="logout-btn"
                >
                  <Nav.Link style={{ color: "white" }}>
                    <i class="fa-solid fa-right-from-bracket"></i> Đăng xuất
                  </Nav.Link>
                </Button>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
