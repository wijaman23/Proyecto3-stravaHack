import Carousel from "react-bootstrap/Carousel";


function Carrusel() {
  return (
    <Carousel>
      <Carousel.Item interval={4000} className="d-flex align-items-center">
        <img
          className="d-block w-100"
          src="https://i.ibb.co/BwVvhL3/bici-1.jpg"
          alt="First slide"
          style={{ height: "700px" }}
        />

        <Carousel.Caption
          className="rounded mb-5"
          style={{ backgroundColor: "rgba(108, 122, 137,0.4)" }}
        >
          <h3 style={{ opacity: "1.0" }}>SÉ EL CAMBIO.</h3>
          <p>
            Empieza un plan de entrenamiento, participa en retos y ve ganando
            fuerza. Corre, sal a pedalear, camina, entrena, baila... ¡toda
            actividad cuenta! No importa lo lejos que estés de alcanzar tus
            objetivos: descubre lo mejor de ti con la App StravaHack.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img
          className="d-block w-100"
          src="https://i.ibb.co/jhw3V8v/corredor-1.jpg"
          alt="Second slide"
          style={{ height: "700px" }}
        />
        <Carousel.Caption
          className="rounded mb-5"
          style={{ backgroundColor: "rgba108, 122, 137,0.4)" }}
        >
          <h3>EJERCICIO. FUERZA. SALUD.</h3>
          <p>
            Selecciona grupos musculares y crea tu propio entrenamiento
            personalizado. Participa en retos y compite amistosamente para
            motivarte más. Entrena en cualquier sitio y en cualquier lugar.
            Obtén los resultados que buscas gracias a planes de entrenamiento
            que se adaptan a tu nivel, diseñados por especialistas del fitness.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img
          className="d-block w-100"
          src="https://i.ibb.co/YBKxFxD/nadador-1.jpg"
          alt="Third slide"
          style={{ height: "700px" }}
        />
        <Carousel.Caption
          className="rounded mb-5"
          style={{ backgroundColor: "rgba(108, 122, 137,0.4)" }}
        >
          <h3>REGISTRA TUS ACTIVIDADES. PROGRESA. TRIUNFA.</h3>
          <p>
            Registra tus entrenamientos y analiza las estadísticas. Únete a
            retos para más motivación y desafía tus límites. Comparte tus éxitos
            con una comunidad global y alcanza tus metas paso a paso. ¿Te
            animas? Descarga las apps adidas Running y adidas Training y ponte
            en forma con éxito.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carrusel;