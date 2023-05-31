import axios from "axios";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

// import React, { PureComponent } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

// const [lastRespuesta, setLastRespuesta] = useState([]);

// const [last50, setLast50] = useState([]);

export const TestChart = ({ idUser }) => {
  const [chart, setChart] = useState([]); //Este es todos las espuestas del usuario
  const [jsonChart, setJsonChart] = useState(null);
  const [showGraficos, setShowGraficos] = useState(true);

  const valorTipoPregunta = [
    { id: 1, name: "Autoconciencia" },
    { id: 2, name: "Autocontrol" },
    { id: 3, name: "Automotivación" },
    { id: 4, name: "Empatía" },
    { id: 5, name: "Habilidades sociales" },
  ];

  useEffect(() => {
    axios
      .post("http://localhost:3002/testChart", {
        idUser: idUser,
      })
      .then((res) => {
        if (res.data.length > 0) {
          console.log("sacado del useEfecct automaticamen: ", res.data);
          setChart(res.data);
          let index = res.data.length;
          console.log(index);
          let pos = res.data[index - 1].name_intento;
          console.log(pos);
          const ultimas50 = res.data.filter((e) => e.name_intento == pos);
          // setLast50(ultimas50);
          console.log(pos);
          console.log(ultimas50);
          let sumA = [];
          let suma = 0;
          for (let j = 0; j < 5; j++) {
            suma = 0;

            for (let i = 0; i < ultimas50.length; i++) {
              if (i < (j + 1) * 10 && i > j * 10) {
                suma += ultimas50[i].valor_respuesta;
              }
            }
            sumA.push(suma);
            suma = 0;

            // console.log("suma: ", sumA[j]);
          }
          console.log("suma: ", sumA);
          const conjunto = valorTipoPregunta.map((e, i) => {
            return { valor: sumA[i], name: e.name, fullMark: 40 };
          });
          setJsonChart(conjunto);
        } else {
          setChart(null);
        }

        // setLastRespuesta(res.data.);
      })
      .catch((err) => {
        console.log("Error", err);
      });

    console.log("chart.length: ", chart.length, chart);
  }, []);

  const mostrarChart = () => {
    setShowGraficos(!showGraficos);
  };

  return (
    <>
      {chart.length > 0 ? (
        <div className="rounded-xl">
          {chart && showGraficos ? (
            <>
              <hr />
              <div className="flex flex-col my-3 ">
                <button
                  className="bg-cyan-500 hover:bg-cyan-600 rounded-lg p-1 text-white w-60"
                  onClick={mostrarChart}
                >
                  Mostrar tabla
                </button>
              </div>

              {/* <h3>daots: {chart[0]}</h3> */}
              <div className="bg-sky-100 rounded-lg">
                <div className="font-semibold py-2 px-4">
                  Resultado del último test:{" "}
                  {chart[chart.length - 1].name_intento}
                </div>
                <RadarChart
                  cx={350}
                  cy={250}
                  outerRadius={150}
                  width={700}
                  height={500}
                  data={jsonChart}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis angle={50} domain={[0, 40]} />
                  <Radar
                    name="Inteligencia Emocional"
                    dataKey="valor"
                    stroke="#8884d8"
                    fill="#0891B2"
                    fillOpacity={0.6}
                  />

                  <Legend />
                </RadarChart>
              </div>
            </>
          ) : (
            <>
              <hr />
              <div className="flex flex-col my-3">
                <button
                  className="bg-cyan-500 hover:bg-cyan-600 rounded-lg p-1 text-white w-60"
                  onClick={mostrarChart}
                >
                  Mostrar Gráfico
                </button>
              </div>
              <div className="h-full color">aqui irá las tablas</div>
            </>
          )}
        </div>
      ) : (
        <div className="">hola crea un nuevo test para mostrar resutlado</div>
      )}
    </>
  );
};
TestChart.propTypes = {
  idUser: PropTypes.number,
};
