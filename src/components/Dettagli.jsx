import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";

import moment from "moment";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Dettagli = (props) => {
  const [weathers, setWeathers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getWeather();
  }, [props.citta, props.units, props.lingua]);

  const getWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${props.citta}&appid=a63802e946b9f5a182cb26e719489298&units=${props.units}&lang=${props.lingua}`
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
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("ERROR!", error);
        setIsLoading(false);
      });
  };

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
            <Spinner animation="border" role="status"></Spinner>
          ) : (
            <div className="text-center mb-5 p-5 border bg-light rounded-5">
              {props.lingua === "it" ? (
                <p className="fw-bold fs-3 text-start">Previsioni future</p>
              ) : (
                <p className="fw-bold fs-3 text-start">Future forecasts</p>
              )}

              {weathers.list.slice(0, 5).map((forecast, index) => (
                <div key={index} className="d-flex justify-content-between">
                  <p className="me-3 fw-bold text-start">
                    {moment(forecast.dt_txt).format("D MMM, YYYY HH:mm")}
                  </p>
                  <p className="me-3">{forecast.weather[0].description}</p>
                  {props.units === "metric" ? (
                    <p className="">{forecast.main.temp}°C</p>
                  ) : (
                    <p className=" ">{forecast.main.temp}°F</p>
                  )}
                </div>
              ))}
              <Link to={"/"}>
                {props.lingua === "it" ? (
                  <Button variant="outline-secondary">Torna indietro</Button>
                ) : (
                  <Button variant="outline-secondary">Go back</Button>
                )}
              </Link>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Dettagli;
