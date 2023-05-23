import testJson from "./testJson";
import { useState, useEffect } from "react";

export const Test = () => {
  // const [respuesta, setRespuesta] = useState([]);

  return (
    <div className="testContainer">
      <div className="testCentrado">
        <div className="pregunta">
          {/* {testJson.forEach((element, index) => {})} */}
          <span>¿aqui va las preguntas?</span>
        </div>
        <hr />
        <div className="opciones">
          <label htmlFor="btn1">Nunca</label>
          <input type="checkbox" name="btn1" id="btn1" />
          <label htmlFor="btn2">Casi nunca</label>
          <input type="checkbox" name="btn2" id="btn2" />
          <label htmlFor="btn3">A veces</label>
          <input type="checkbox" name="btn3" id="btn3" />
          <label htmlFor="btn4">A menudo</label>
          <input type="checkbox" name="btn4" id="btn4" />
          <label htmlFor="btn5">Siempre</label>
          <input type="checkbox" name="btn5" id="btn5" />
        </div>
        <hr />
        <div className="navPreguntas">
          {/* <button className="btnBack" onClick={btnBack}>
            Back
          </button>
          <button className="btnNext" onClick={btnNext}>
            Next
          </button> */}
        </div>
      </div>
    </div>
  );
};
