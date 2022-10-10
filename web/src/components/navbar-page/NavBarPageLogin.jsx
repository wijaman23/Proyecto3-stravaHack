import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function NavBarPageLogin() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <NavLink
            to="/"
          >
            <div style={{ marginLeft: 100, padding: 10 }}>
              <Navbar.Brand>
                <img
                  src="https://i.ibb.co/YWM5v4W/strava-hacklogo-ok.png"
                  alt="img"
                  style={{ maxHeight: "80px" }}
                />
              </Navbar.Brand>
            </div>
          </NavLink>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavLink> </NavLink>
            </Nav>
            <div className="d-flex" style={{ marginRight: 100 }}>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                style={{
                  color: "grey",
                  paddingLeft: 15,
                  paddingRight: 15,
                  paddingTop: 5,
                  paddingBottom: 5,
                  fontSize: "14px",
                }}
              >
                Iniciar sesion
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                style={{
                  color: "white",
                  backgroundColor: "orangered",
                  paddingLeft: 15,
                  paddingRight: 15,
                  paddingTop: 5,
                  paddingBottom: 5,
                  fontSize: "14px",
                }}
              >
                Registrate
              </NavLink>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBarPageLogin;
