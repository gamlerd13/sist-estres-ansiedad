import axios from "axios";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TestChart } from "./TestChart";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";

//Inicio
export const TestComponent = ({ name, idUser }) => {
  //el nombre ya no es necesario, teniendo el id
  //para guardar en el localstorage
  const [pregunta, setPregunta] = useState(
    window.localStorage.getItem("pregunta")
  );
  useEffect(() => {
    window.localStorage.setItem("pregunta", pregunta);
  }, [pregunta]);

  const [mostrarPreguntas, setMostrarPreguntas] = useState(false);
  const [preguntaId, setPreguntaId] = useState(); //el id de la pregunta lo estoy poniendo, de acuerdo a las preguntas
  const [btnContinuar, SetBtnContinuar] = useState(
    Boolean(window.localStorage.getItem("btnContinuar"))
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
    SetBtnContinuar(true);
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

  // este es el BTN en la ultima parte deonde enviar al backend
  const enviarRespuesta = () => {
    localStorage.removeItem("btnContinuar");

    limpiarTest();
    //cancelar el btn continuar
    SetBtnContinuar(false);
    console.log("SetBtnContinuar(false)");
    setMostrarPreguntas(false);
    setNameTest(""); //Para borrar el nombre del test cuandos se inicia otro

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
    <div className="basis-11/12 principal tresCajas bg-slate-200 w-full">
      {!mostrarPreguntas ? (
        <>
          <div className="btnTestDiv">
            <div className="my-1">
              <button
                className="bg-cyan-500 hover:bg-cyan-600 rounded-lg p-1 mr-2 text-white w-60"
                onClick={limpiarTest}
              >
                Iniciar nuevo test
              </button>
              <input
                className="rounded-lg px-2"
                type="text"
                placeholder="Ingrese un nombre"
                onChange={saveNameTest}
              ></input>
            </div>

            {btnContinuar && (
              <div className="my-1 flex">
                <button
                  className="bg-cyan-500 hover:bg-cyan-600 rounded-lg p-1 mr-2 text-white w-60"
                  onClick={IniciarTest}
                >
                  Continuar Test
                </button>
                <span className="w-60 text-center">
                  {console.log(
                    "btnContinuar:",
                    typeof btnContinuar,
                    btnContinuar,
                    Boolean(btnContinuar)
                  )}
                  {nameTest},{Boolean(btnContinuar)},{btnContinuar}
                </span>
                {/* <h2>
                  nombre user: {name} id user: {idUser}
                </h2> */}
              </div>
            )}
          </div>
          <div className="w-full h-fit">
            <TestChart idUser={idUser} />
          </div>
        </>
      ) : (
        <>
          {pregunta[currentIndex] && pregunta[currentIndex].texto_pregunta ? (
            <div className="flex w-full h-full justify-center">
              <div className="h-max  w-full flex flex-col justify-evenly md:w-6/12 px-5">
                <div className="w-full flex flex-col">
                  <span className="font-semibold text-2xl">
                    Test de Inteligencia Emocional: {nameTest}
                  </span>

                  <hr className="border-2 border-rose-600 w-full" />

                  <h2>{parseInt(currentIndex) + 1}</h2>
                  <span className=" text-2xl">
                    {pregunta[currentIndex].texto_pregunta}
                  </span>
                </div>
                <hr />
                <div className="w-full font-semibold text-xl flex justify-center">
                  <div className="w-52 grid flex-col justify-start gap-1 py-8">
                    <label htmlFor="btn1" className="">
                      <input
                        className="w-6 h-6 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        type="checkbox"
                        name="btn1"
                        id="btn1"
                        value="1"
                        checked={selectedCheckbox === "1"}
                        onChange={handleCheckboxChange}
                      />
                      Nunca
                    </label>

                    <label htmlFor="btn2" className="">
                      <input
                        className="w-6 h-6 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
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
                        className="w-6 h-6 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
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
                        className="w-6 h-6 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
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
                        className="w-6 h-6 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
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
                </div>

                <hr />
                <div className="flex w-full justify-evenly mb-5">
                  <button
                    className="bg-slate-900 text-gray-200 rounded-lg py-4 px-16 hover:bg-emerald-300"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                  >
                    <AiOutlineArrowLeft />
                  </button>
                  <button
                    className="bg-slate-900 text-gray-200 rounded-lg py-4 px-16 hover:bg-emerald-300"
                    onClick={handleNext}
                    disabled={currentIndex === pregunta.length}
                  >
                    <AiOutlineArrowRight />
                  </button>
                </div>

                <div className="flex justify-center">
                  <button
                    className="bg-slate-900 text-gray-200 rounded-lg py-1 px-8 hover:bg-rose-800"
                    onClick={exitTest}
                  >
                    Cancelar test
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1>Enviar test</h1>

              {/* Aqui es una funcion que si esta verdadera muestre el boton enviar en la ultima pregunta */}
              <h2>{nameTest}</h2>

              <div className="enviarTest">
                <button
                  className="bg-cyan-400 rounded-lg"
                  onClick={enviarRespuesta}
                >
                  Enviar
                </button>
              </div>
              <div>
                <button className="bg-rose-500" onClick={exitTest}>
                  Cancelar
                </button>
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
