import React from "react";
import Carrusel from "../../components/carrusel/carrusel";
import Footer from "../../components/footer/Footer";
import NavBarPageLogin from "../../components/navbar-page/NavBarPageLogin";

function HomeInicio() {
  return (
    <>
      <NavBarPageLogin />
      <Carrusel />
      <Footer />
    </>
  );
}

export default HomeInicio;
