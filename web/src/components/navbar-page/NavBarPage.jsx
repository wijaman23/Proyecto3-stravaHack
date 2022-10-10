import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AuthContext } from "../../contexts/AuthContext";
import { NavLink, Link } from "react-router-dom";
import { logout } from "../../services/training-services";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useContext } from "react";

function NavBarPage() {
  const navigation = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
      .then(() => {
        navigation("/login");
      })
      .catch((error) => console.error(error));
  };

  const { handleSubmit } = useForm({ mode: "onTouched" });

  return (
    <div>
      <Navbar bg="light" expand="lg" fixed="top">
        <Container fluid>
          <NavLink to="/home">
            <Navbar.Brand style={{ marginLeft: 100, padding: 10 }}>
              <img
                src="https://i.ibb.co/YWM5v4W/strava-hacklogo-ok.png"
                alt="img"
                style={{ maxHeight: "40px" }}
              />
            </Navbar.Brand>
          </NavLink>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavLink
                to="/misrutas"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Mis rutas
              </NavLink>
              <NavLink
                to="/amigos"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Amigos
              </NavLink>
            </Nav>
            <Form className="d-flex mx-3">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-danger">Search</Button>
            </Form>
            <div style={{ marginRight: 100 }}>
              <NavDropdown
                title=<img
                  src={user.img}
                  alt="imagen"
                  style={{ width: 50, borderRadius: 50 }}
                />
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item>
                  <Link to="/aciton" className="nav-link">
                    Mi perfil
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/aciton2" className="nav-link">
                    Configuracion
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <div className="ms-2">
                  <form onSubmit={handleSubmit(handleLogout)}>
                    <button className="btn btn-light" type="submit">
                      Cerrar Sesion
                    </button>
                  </form>
                </div>
              </NavDropdown>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBarPage;
