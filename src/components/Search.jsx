import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function Search(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [city, setCity] = useState("");

  return (
    <>
      {props.lingua === "it" ? (
        <Button variant="outline-secondary" onClick={handleShow}>
          Cerca Città
        </Button>
      ) : (
        <Button variant="outline-secondary" onClick={handleShow}>
          Search city
        </Button>
      )}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="light-subtle"
      >
        <Modal.Header closeButton>
          {props.lingua === "it" ? (
            <Modal.Title>Inserisci una città Italiana</Modal.Title>
          ) : (
            <Modal.Title>Enter an Italian city</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {props.lingua === "it" ? (
                <Form.Label>Città</Form.Label>
              ) : (
                <Form.Label>City</Form.Label>
              )}

              <Form.Control
                type="text"
                placeholder="Es. Roma"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {props.lingua === "it" ? (
            <Button
              variant="outline-secondary"
              onClick={() => props.cambiaCitta(city)}
            >
              Scopri il meteo
            </Button>
          ) : (
            <Button
              variant="outline-secondary"
              onClick={() => props.cambiaCitta(city)}
            >
              Discover the weather
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Search;
