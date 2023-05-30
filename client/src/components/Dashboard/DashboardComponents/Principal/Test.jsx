import axios from "axios";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

//Inicio
export const TestComponent = ({ name, idUser }) => {
  //para guardar en el localstorage
  const [pregunta, setPregunta] = useState(
    window.localStorage.getItem("pregunta")
  );
  useEffect(() => {
    window.localStorage.setItem("pregunta", pregunta);
  }, [pregunta]);

  const [mostrarPreguntas, setMostrarPreguntas] = useState(false);
  const [preguntaId, setPreguntaId] = useState();
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
        setPreguntaId(res.data.id);
        console.log(res.data);
        console.log(typeof res.data, res.data);
        setMostrarPreguntas(true);
        SetBtnContinuar(true);

        console.log("Current index: ", currentIndex);
      })
      .catch((err) => console.log("error en capturar test:", err));
  };

  //salir del test, ocultando las preguntas
  const exitTest = () => {
    setMostrarPreguntas(false);
  };
  //limpiar los datos que trae axios
  const limpiarTest = () => {
    if (nameTestOnChange != "") {
      setRespuesta([]); //Quita todas las respuestas guardadas en localStorage

      setPregunta(); //borramos las preguntas, esto ver mas a detalle
      setCurrentIndex(0); //este si es para mostrar las preguntas desde la primera posion
      IniciarTest(); //incia de nuevo la petincion al backend los preguntas
      SetBtnContinuar(false);
      setNameTest(""); //Para borrar el nombre del test cuandos se inicia otro
      setNameTest(nameTestOnChange); //para capturar nombre del test cuando se hace click
      setNameTestOnChange("");
    }
  };

  // const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(
    window.localStorage.getItem("currentIndex")
  );
  useEffect(() => {
    window.localStorage.setItem("currentIndex", currentIndex);
  }, [currentIndex]);

  // const [respuesta, setRespuesta] = useState([]);
  //para guardar las preguntas en localStorage
  const [respuesta, setRespuesta] = useState(
    window.localStorage.getItem("respuesta")
      ? window.localStorage.getItem("respuesta").split(",")
      : []
  );
  // if (window.localStorage.getItem("respuesta")) {
  //   setRespuesta(window.localStorage.getItem("respuesta").split(","));
  // }
  useEffect(() => {
    window.localStorage.setItem("respuesta", respuesta);
  }, [respuesta]);

  const handleNext = () => {
    setSelectedCheckbox(null);
    if (selectedCheckbox != null) {
      setCurrentIndex((prevIndex) => parseInt(prevIndex) + 1); // parseInt: cuando se guarda en el localStorage lo convierte en string, para traerlo tengo que convertir en entero.
      console.log("Current index: ", currentIndex);
      //para borrar los checkeds
      guardarRespuesta(); //guarda respuesta en variable de estado cuando, presinas btnSiguiente
      console.log("guardar respuesta dentro de handlenext: ", respuesta);
    }
  };
  console.log("guardar respuesta fuera de handlenext: ", typeof respuesta);

  const handlePrev = () => {
    // setCurrentIndex((prevIndex) => parseInt(prevIndex) - 1);
  };

  //Para que los checkeds este selecionados, solo 1 por iteraccion
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const handleCheckboxChange = (event) => {
    setSelectedCheckbox(event.target.value);
    console.log("Valor del checked: ", selectedCheckbox);
  };

  //guardar respuesta
  const guardarRespuesta = () => {
    const newRespuesta = [...respuesta, selectedCheckbox];
    setRespuesta(newRespuesta);
  };

  //Para enviar las resputas al backend
  // const enviarRespuesta = () => {
  //   axios
  //     .post("http://localhost:3002/insertRespuesta", {
  //       UserId: idUser,
  //       PreguntaId: preguntaId,
  //       NameTest: nameTest,
  //       Respuesta: respuesta,
  //     })
  //     .then(() => {});
  // };

  const enviarRespuesta = () => {
    //cancelar el btn continuar
    SetBtnContinuar(false);
    setMostrarPreguntas(false);

    const jsonRespuesta2 = [...respuesta]; //respuesta llegaba en string
    // const jsonRespuesta2 = [...respuesta.split(",")]; //respuesta llegaba en string
    console.log(jsonRespuesta2);
    const newRespuesta = jsonRespuesta2.map((element, index) => {
      return {
        UserId: idUser,
        PreguntaId: index + 1,
        NameTest: nameTest,
        Respuesta: element,
      };
    });
    console.log("sonRespuesta2: ", newRespuesta);
    // console.log("La respueta a enviar será:", jsonRespuesta);
    axios
      .post("http://localhost:3002/insertRespuesta", {
        newRespuesta: newRespuesta,
      })
      .then(() => {
        console.log("Respuesta ingresado xon exito!!");
      });
  };

  const [nameTestOnChange, setNameTestOnChange] = useState("");
  const [nameTest, setNameTest] = useState(
    window.localStorage.getItem("nameTest")
  );
  useEffect(() => {
    window.localStorage.setItem("nameTest", nameTest);
  }, [nameTest]);

  const saveNameTest = (event) => {
    setNameTestOnChange(event.target.value);
    console.log("Saving name", nameTest); //delete this
  };

  return (
    <div className="principal tresCajas">
      {!mostrarPreguntas ? (
        <>
          <div className="btnTestDiv">
            <input
              type="text"
              placeholder="Ingrese un nombre"
              onChange={saveNameTest}
            ></input>
            <button onClick={limpiarTest}>
              <h1>Iniciar nuevo test</h1>
            </button>
            {btnContinuar && (
              <div>
                <h2>{nameTest}</h2>
                <h2>
                  nombre user: {name} id user: {idUser}
                </h2>

                <button onClick={IniciarTest}>
                  <h1>Continuar test</h1>
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {pregunta[currentIndex] && pregunta[currentIndex].texto_pregunta ? (
            <div className="testContainer">
              <div className="testCentrado">
                <div className="pregunta">
                  <h2>{nameTest}</h2>

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
                    disabled={currentIndex === pregunta.length}
                  >
                    Next
                  </button>
                </div>

                <div className="cancelarTest">
                  <button onClick={exitTest}>Cancelar test</button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1>Enviar test</h1>

              {/* Aqui es una funcion que si esta verdadera muestre el boton enviar en la ultima pregunta */}
              <h2>{nameTest}</h2>

              <div className="enviarTest">
                <button onClick={enviarRespuesta}>Enviar</button>
              </div>
              <div className="cancelarTest">
                <button onClick={exitTest}>Cancelar</button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

TestComponent.propTypes = {
  name: PropTypes.string,
  idUser: PropTypes.number,
};
