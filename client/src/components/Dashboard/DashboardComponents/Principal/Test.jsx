import axios from "axios";
import { useState, useEffect } from "react";

export const TestComponent = () => {
  // const [respuesta, setRespuesta] = useState([]);
  // const [pregunta, setPregunta] = useState([]);

  //para guardar en el localstorage
  const [pregunta, setPregunta] = useState(
    window.localStorage.getItem("pregunta")
  );
  useEffect(() => {
    window.localStorage.setItem("pregunta", pregunta);
  }, [pregunta]);

  const [mostrarPreguntas, setMostrarPreguntas] = useState(false);

  const [btnContinuar, SetBtnContinuar] = useState(
    window.localStorage.getItem("btnContinuar")
  );
  useEffect(() => {
    window.localStorage.setItem("btnContinuar", btnContinuar);
  }, [btnContinuar]);

  const IniciarTest = () => {
    axios
      .get("http://localhost:3002/test")
      .then((res) => {
        setPregunta(res.data);
        // console.log(typeof res.data);
        setMostrarPreguntas(true);
        SetBtnContinuar(true);

        console.log("Current index: ", currentIndex);
      })
      .catch((err) => console.log("error en capturar test:", err));
  };
  //borrar este console log
  // console.log(
  //   "Respuesta de datos del test:",
  //   pregunta,
  //   "tipo de dato: ",
  //   typeof pregunta
  // );

  //salir del test, ocultando las preguntas
  const exitTest = () => {
    setMostrarPreguntas(false);
  };
  //limpiar los datos que trae axios
  const limpiarTest = () => {
    setPregunta(); //borramos las preguntas, esto ver mas a detalle
    setCurrentIndex(0); //este si es para mostrar las preguntas desde la primera posion
    IniciarTest(); //incia de nuevo la petincion al backend los preguntas
    SetBtnContinuar(false);
  };

  // const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(
    window.localStorage.getItem("currentIndex")
  );
  useEffect(() => {
    window.localStorage.setItem("currentIndex", currentIndex);
  }, [currentIndex]);

  const [respuesta, setRespuesta] = useState([]);

  const handleNext = () => {
    setSelectedCheckbox(null);
    if (selectedCheckbox != null) {
      setCurrentIndex((prevIndex) => parseInt(prevIndex) + 1); // parseInt: cuando se guarda en el localStorage lo convierte en string, para traerlo tengo que convertir en entero.
      console.log("Current index: ", currentIndex);
      //para borrar los checkeds
      guardarRespuesta();
      console.log("guardar respuesta dentro de handlenext: ", respuesta);
    }
  };
  console.log("guardar respuesta fuera de handlenext: ", respuesta);

  const handlePrev = () => {
    // setCurrentIndex((prevIndex) => parseInt(prevIndex) - 1);
  };

  //Para que los checkeds este selecionados, solo 1 por iteraccion
  const [selectedCheckbox, setSelectedCheckbox] = useState("");

  const handleCheckboxChange = (event) => {
    setSelectedCheckbox(event.target.value);
    console.log("Valor del checked: ", selectedCheckbox);
  };

  //guardar respuesta
  const guardarRespuesta = () => {
    const newRespuesta = [...respuesta, selectedCheckbox];
    setRespuesta(newRespuesta);
  };

  return (
    <div className="principal tresCajas">
      {!mostrarPreguntas ? (
        <>
          <div className="btnTestDiv">
            <button onClick={limpiarTest}>
              <h1>Iniciar nuevo test</h1>
            </button>
            {btnContinuar && (
              <button onClick={IniciarTest}>
                <h1>Continuar test</h1>
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          {pregunta[currentIndex].texto_pregunta && (
            <div className="testContainer">
              <div className="testCentrado">
                <div className="pregunta">
                  <h2>{currentIndex}</h2>
                  <span>{pregunta[currentIndex].texto_pregunta}</span>
                </div>
                <hr />
                <div className="opciones">
                  <label htmlFor="btn1">
                    <input
                      type="checkbox"
                      name="btn1"
                      id="btn1"
                      value="1"
                      checked={selectedCheckbox === "1"}
                      onChange={handleCheckboxChange}
                    />
                    Nunca
                  </label>

                  <label htmlFor="btn2">
                    <input
                      type="checkbox"
                      name="btn2"
                      id="btn2"
                      value="2"
                      checked={selectedCheckbox === "2"}
                      onChange={handleCheckboxChange}
                    />
                    Casi nunca
                  </label>

                  <label htmlFor="btn3">
                    <input
                      type="checkbox"
                      name="btn3"
                      id="btn3"
                      value="3"
                      checked={selectedCheckbox === "3"}
                      onChange={handleCheckboxChange}
                    />
                    A veces
                  </label>

                  <label htmlFor="btn4">
                    <input
                      type="checkbox"
                      name="btn4"
                      id="btn4"
                      value="4"
                      checked={selectedCheckbox === "4"}
                      onChange={handleCheckboxChange}
                    />
                    A menudo
                  </label>

                  <label htmlFor="btn5">
                    <input
                      type="checkbox"
                      name="btn5"
                      id="btn5"
                      value="5"
                      checked={selectedCheckbox === "5"}
                      onChange={handleCheckboxChange}
                    />
                    Siempre
                  </label>
                </div>

                <hr />
                <div className="navPreguntas">
                  <button
                    className="btnBack"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                  >
                    Back
                  </button>
                  <button
                    className="btnNext"
                    onClick={handleNext}
                    disabled={currentIndex === pregunta.length - 1}
                  >
                    Next
                  </button>
                </div>
                {/* Aqui es una funcion que si esta verdadera muestre el boton enviar en la ultima pregunta */}
                {currentIndex == 1 && (
                  <div className="enviarTest">
                    <button>Enviar</button>
                  </div>
                )}

                <div className="cancelarTest">
                  <button onClick={exitTest}>Cancelar test</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
