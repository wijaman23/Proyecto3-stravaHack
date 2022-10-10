import Carousel from "react-bootstrap/Carousel";

function Carrusel() {
  return (
    <Carousel>
      <Carousel.Item>
        <div className="d-flex justify-content-center">
          <img
            className="d-block "
            src="https://static.runnea.com/images/201609/nadar-te-hara-feliz-838x400x80xX.jpeg?1"
            style={{ height: 500 }}
            alt="First slide"
          />
        </div>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="d-flex justify-content-center">
          <img
            className="d-block "
            src="https://corriendovoy.com/wp-content/uploads/2022/06/PORTADA-YOUTUBE-13-5-1024x576.jpg"
            style={{ height: 500 }}
            alt="Second slide"
          />
        </div>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="d-flex justify-content-center">
          <img
            className="d-block "
            src="https://d2p6e6u75xmxt8.cloudfront.net/6/2019/12/cyclists-group-profimedia-0374728116-CVR-1024x450.jpg"
            style={{ height: 500 }}
            alt="Third slide"
          />
        </div>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carrusel;
