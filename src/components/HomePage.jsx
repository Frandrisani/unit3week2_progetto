import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import moment from "moment";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Homepage = function (props) {
  const [weathers, setWeathers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getWeather();
  }, [props.citta, props.units, props.lingua]);

  const getWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${props.citta}&appid=a63802e946b9f5a182cb26e719489298&units=${props.units}&lang=${props.lingua}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel recupero del meteo.");
        }
      })
      .then((data) => {
        console.log("fetch completata, DATI RECUPERATI", data);
        setWeathers(data);
        setIsLoading(false); // Imposta isLoading a false quando i dati sono stati caricati
      })
      .catch((error) => {
        console.log("ERROR!", error);
        setIsLoading(false); // In caso di errore, imposta isLoading a false
      });
  };

  // CREO QUI LE IMPOSTAZIONI DI STILE PER NON ANDARE A TOCCARE IL CSS (questione di tempo)
  const backgroundImageStyle = {
    backgroundImage: `url('/img/alba.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
  };

  return (
    <Container
      fluid
      style={backgroundImageStyle}
      className="d-flex justify-content-center align-items-center"
    >
      <Row>
        <Col>
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <div className="text-center d-flex">
              <div className="mb-5 p-5 border bg-light rounded-5 me-5">
                <p className="fs-4 fw-semibold mb-2 p-0">{weathers.name}</p>
                {props.units === "metric" ? (
                  <p className="display-2 fw-semibold my-3 p-0">
                    {weathers.main.temp}°C
                  </p>
                ) : (
                  <p className="display-2 fw-semibold my-3 p-0">
                    {weathers.main.temp}°F
                  </p>
                )}

                <p className="fs-5 fw-semibold m-0 p-0">
                  {moment().format("D MMM, YYYY")}
                </p>
              </div>

              <div className="mb-5 p-5 border bg-light rounded-5 text-start ">
                {props.lingua === "it" ? (
                  <p className="fs-2 fw-semibold">
                    In questo momento a {props.citta}
                  </p>
                ) : (
                  <p className="fs-2 fw-semibold">Right now in {props.citta}</p>
                )}

                <div className="mb-0 mt-3 d-flex ">
                  <p className="fs-3">{weathers.weather[0].description}</p>
                  <img
                    src={`http://openweathermap.org/img/w/${weathers.weather[0].icon}.png`}
                    alt=""
                    className="ms-3 "
                    width={70}
                  />
                </div>
                <div className="d-flex mt-0">
                  {props.lingua === "it" ? (
                    <p className="me-3">
                      Umidità:{" "}
                      <span className="fw-bold">{weathers.main.humidity}%</span>
                    </p>
                  ) : (
                    <p className="me-3">
                      Humidity:{" "}
                      <span className="fw-bold">{weathers.main.humidity}%</span>
                    </p>
                  )}
                  {props.lingua === "it" ? (
                    <p className="me-3">
                      Pressione:{" "}
                      <span className="fw-bold">
                        {weathers.main.pressure}bar
                      </span>
                    </p>
                  ) : (
                    <p className="me-3">
                      Pressure:{" "}
                      <span className="fw-bold">
                        {weathers.main.pressure}bar
                      </span>
                    </p>
                  )}

                  {props.units === "metric" ? (
                    <p className="me-3">
                      Max:{" "}
                      <span className="fw-bold me-2">
                        {weathers.main.temp_max}°C
                      </span>{" "}
                      Min:{" "}
                      <span className="fw-bold">
                        {weathers.main.temp_min}°C
                      </span>
                    </p>
                  ) : (
                    <p className="me-3">
                      Max:{" "}
                      <span className="fw-bold me-2">
                        {weathers.main.temp_max}°F
                      </span>{" "}
                      Min:{" "}
                      <span className="fw-bold">
                        {weathers.main.temp_min}°F
                      </span>
                    </p>
                  )}
                </div>
                <div>
                  <Link to={"/dettagli"}>
                    <Button variant="outline-secondary">
                      Il meteo di domani
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Homepage;
