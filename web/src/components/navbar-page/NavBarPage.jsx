import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AuthContext } from "../../contexts/AuthContext";
import { NavLink, Link } from "react-router-dom";
import { logout } from "../../services/training-services";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { TbCirclePlus } from "react-icons/tb";

function NavBarPage({ icon }) {
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
    <div >
      <Navbar expand="lg" fixed="top" className="bg-white mx-5">
        <Container fluid className="mx-5">
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
            ></Nav>
            <div>
              <NavDropdown
                title=<img
                  src={user.img}
                  alt="imagen"
                  style={{ width: 50, borderRadius: 50 }}
                />
              >
                <NavDropdown.Item>
                  <Link to={`/user/${user.id}/training`} className="nav-link">
                    Mi perfil
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/edit" className="nav-link">
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
            <div style={{ marginRight: 100 }}>
              {icon && (
                <Link to="/createtraining">
                  <button
                    className="rounded-circle bg-white"
                    style={{
                      color: "rgb(252, 82, 0)",
                      borderColor: "white",
                      borderStyle: "solid",
                    }}
                  >
                    <TbCirclePlus style={{ fontSize: 40 }} />
                  </button>
                </Link>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

NavBarPage.defaultProps = {
  icon: (
    <Link to="/createtraining">
      <button
        className="rounded-circle bg-white"
        style={{
          color: "rgb(252, 82, 0)",
          borderColor: "white",
          borderStyle: "solid",
        }}
      >
        <TbCirclePlus style={{ fontSize: 40 }} />
      </button>
    </Link>
  ),
};

export default NavBarPage;
