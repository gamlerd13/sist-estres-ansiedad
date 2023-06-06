import PropTypes from "prop-types";
import Resultado from "./Resultados";
import { useState } from "react";

export const ResultadosFinales = ({ datos }) => {
  const [mensajeFinal, setMensajeFinal] = useState("Selecione");
  console.log(datos);

  // Esta funcion me devuelve los resultados finales guardados en un json, segun el tipo y promedio que sacaron
  const recomendacion = (name, valor) => {
    Resultado.map((e) => {
      if (name == e.tipo) {
        console.log(e.tipo);

        e.recomendacion.map((el) => {
          if (Math.round(valor / 10) == el.promedio) {
            console.log(
              "promedio redondeado: ",
              Math.round(valor / 10),
              "Promedio sin redondear: ",
              valor
            );
            // console.log(el.mensaje, el.critica);
            el.title = name;
            console.log(el);
            // retornamos el objeto con el que contiene la recomendacion y la critica
            setMensajeFinal(el);
            return el;
          }
        });
      }
    });
  };
  return (
    <>
      <div className="xl:flex">
        <div className="xl:w-full flex justify-center xl:justify-start">
          <table className="tw-full text-lg text-left text-gray-500 dark:text-gray-400 ">
            <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Tabla: Promedio de respuestas
              <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                Professional wrestlers and their signature moves.
              </p>
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:bg-yellow-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Tipo
                </th>
                <th scope="col" className="px-6 py-3">
                  valor
                </th>
                <th scope="col" className="px-6 py-3">
                  Promedio
                </th>
              </tr>
              {/* Este tr solo es de adorno */}
              <tr>
                <th>
                  <hr className="border-black" />
                </th>
                <th>
                  <hr className="border-black" />
                </th>
                <th>
                  <hr className="border-black" />
                </th>
              </tr>
            </thead>
            <tbody>
              {datos.map((e, i) => (
                <tr
                  onClick={() => recomendacion(e.name, e.valor)}
                  className="bg-white border-b dark:bg-gray-800 border-gray-700 cursor-pointer hover:bg-yellow-400 hover:text-black"
                  key={i}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-white"
                  >
                    {e.name}
                  </th>
                  <td className="px-6 py-4">{e.valor}</td>
                  <td className="px-6 py-4">{e.valor / 10}</td>
                </tr>
              ))}
              {console.log(datos)}

              {/* {datos.map((e, i) => {
                  return <td key={i}>{e.valor / 10}</td>;
                })}
                {console.log(datos)} */}
            </tbody>
          </table>
        </div>
        <div>
          <div className="flex flex-col p-8">
            <p className="text-xl font-semibold underline">
              {mensajeFinal.title}
            </p>
            <p className="text-xl">Recomendación: {mensajeFinal.mensaje}</p>
            <hr className="border-4 w-full border-yellow-300" />

            <p className="text-xl">
              Crítica contructiva: {mensajeFinal.critica}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

ResultadosFinales.propTypes = {
  datos: PropTypes.array,
};
