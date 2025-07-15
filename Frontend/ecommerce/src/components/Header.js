import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import logo from './logo.png'; // Assuming the logo is in the same folder as Header.js
import './Header.css';

function Header() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const { cartTotalItems } = useCart(); // Use the useCart hook

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    navigate("/");
  };

  return (
    <Navbar className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <LinkContainer to="/">
          <div className="nav-logo">
            <img src={logo} width={60} alt="brand logo of eclectic elegance" />
          </div>
        </LinkContainer>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor04"
          aria-controls="navbarColor04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor04">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <LinkContainer to="/">
                <Nav.Link className="navbar-link active">Shop</Nav.Link>
              </LinkContainer>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <LinkContainer to="/cart">
                <Nav.Link className="nav-link position-relative">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <span className="cart-count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartTotalItems}
                  </span>
                </Nav.Link>
              </LinkContainer>
            </li>
            <li className="nav-item dropdown">
              {userInfo ? (
                <Nav.Link
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {userInfo.username}
                </Nav.Link>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="nav-link">
                    <i className="fa-solid fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
              <div className="dropdown-menu">
                {userInfo ? (
                  <Nav.Link className="dropdown-item" onClick={logoutHandler}>
                    Log Out
                  </Nav.Link>
                ) : (
                  <>
                    <LinkContainer to="/login">
                      <Nav.Link className="dropdown-item">
                        Login
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/signup">
                      <Nav.Link className="dropdown-item">
                        SignUp
                      </Nav.Link>
                    </LinkContainer>
                  </>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Navbar>
  );
}

export default Header;
