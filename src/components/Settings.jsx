import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Dropdown from "react-bootstrap/Dropdown";

const Settings = function (props) {
  // INIZIO STATO E SETSTATO PER OFFCANVAS
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // FINE STATO E SETSTATO PER OFFCANVAS
  // --------
  //INIZIO SET RADIOBUTTON
  const radios = [
    { name: "Celsius", value: "metric" },
    { name: "Fahrenheit", value: "imperial" },
  ];
  const [radioValue, setRadioValue] = useState("metric");
  // FINE SET RADIOBUTTON

  const lingue = [
    { code: "it", name: "Italiano" },
    { code: "en", name: "English" },
  ];

  return (
    <>
      {props.lingua === "it" ? (
        <Button variant="outline-secondary" onClick={handleShow}>
          Impostazioni
        </Button>
      ) : (
        <Button variant="outline-secondary" onClick={handleShow}>
          Settings
        </Button>
      )}

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement={"end"}
        name={"end"}
      >
        <Offcanvas.Header closeButton>
          {props.lingua === "it" ? (
            <Offcanvas.Title>Impostazioni</Offcanvas.Title>
          ) : (
            <Offcanvas.Title>Settings</Offcanvas.Title>
          )}
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* INIZIO SET CHANGE UNIT */}
          <ButtonGroup className="mb-4">
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? "outline-dark" : "outline-dark"}
                name="radio"
                value={radio.value}
                checked={props.units === radio.value}
                onClick={() => {
                  props.cambiaUnitaGradi(radio.value);
                  handleClose();
                }}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
          {/* FINE SET CHANGE UNIT */}
          {/* INIZIO SET DROPDOWN LINGUAGE */}
          <Dropdown>
            {props.lingua === "it" ? (
              <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                Lingua
              </Dropdown.Toggle>
            ) : (
              <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                Language
              </Dropdown.Toggle>
            )}

            <Dropdown.Menu>
              {lingue.map((lingua, idx) => (
                <Dropdown.Item
                  key={idx}
                  onClick={() => {
                    props.cambiaLinguaggio(lingua.code);
                    handleClose();
                  }}
                >
                  {lingua.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {/* INIZIO SET DROPDOWN LINGUAGE */}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
export default Settings;
