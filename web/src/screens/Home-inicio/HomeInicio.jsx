import React from "react";
import Carrusel from "../../components/carrusel/carrusel";
import Footer from "../../components/footer/Footer";
import NavBarPageLogin from "../../components/navbar-page/NavBarPageLogin";

function HomeInicio() {
  return (
    <>
      <NavBarPageLogin />
      <Carrusel />
      <div className="bg-warning" style={{height: 80}}>
        <h3 style={{color: "white"}}> Ya somos</h3>
      </div>
    </>
  );
}

export default HomeInicio;
