import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import {
  FaFacebook,
  FaTwitter,
  FaGooglePlusSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaGithub,
  FaStrava,
  FaHome,
} from "react-icons/fa";
import {
  FiMail,
  FiPhoneCall
} from "react-icons/fi"

function Footer() {
  return (
    <div>
      <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="d-flex border-bottom justify-content-center py-4">
        <div className="d-none d-lg-block">
          <span className="me-2">Conéctate con nosotros en las redes sociales:</span>
        </div>
        <div>
          <a
            className="me-3"
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook style={{ color: "grey", fontSize: "20px" }} />
          </a>
          <a
            className="me-3"
            href="https://www.twiter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter style={{ color: "grey", fontSize: "20px" }} />
          </a>
          <a
            className="me-3"
            href="https://www.google.es"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGooglePlusSquare style={{ color: "grey", fontSize: "20px" }} />
          </a>
          <a
            className="me-3"
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagramSquare style={{ color: "grey", fontSize: "20px" }} />
          </a>
          <a
            className="me-3"
            href="https://www.linkelind.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin style={{ color: "grey", fontSize: "20px" }} />
          </a>
          <a
            className="me-3"
            href="https://www.github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub style={{ color: "grey", fontSize: "20px" }} />
          </a>
          <a
            className="me-5s"
            href="https://www.strava.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaStrava style={{ color: "grey", fontSize: "20px" }} />
          </a>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                Ironhackers
              </h6>
              <p>
                Somos dos alumnos de Ironhack (Pablo Alcon y Luis Javier Muñoz) que hemos creado esta web para
                ayudar a los deportistas registrar sus actividades
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Productos</h6>
              <p>
                <a href="#!" className="text-reset">
                  Angular
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  React
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Vue
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Laravel
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Enlaces</h6>
              <p>
                <a href="#!" className="text-reset">
                  Precios
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Configuracion
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Ordenes
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Ayuda
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <div className="">
                <FaHome className="me-2" style={{ color: "grey", fontSize: "25px" }}/>
                
                Mallorca / Madrid
              </div>
              <p className="mt-2">
                <FiMail className="me-2" style={{ color: "grey", fontSize: "25px" }}/>
                mayorca&madrid@info.es
              </p>
              <p>
                <FiPhoneCall className="me-2" style={{ color: "grey", fontSize: "25px" }}/>
                 + 01 234 567 88
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2022 Copyright:
        <a className="text-reset fw-bold" href="https://www.strava.com">
          StravaHack
        </a>
      </div>
    </MDBFooter>
    </div>
  );
}

export default Footer;
