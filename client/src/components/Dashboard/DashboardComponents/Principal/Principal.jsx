import { Test } from "./Test";
import Inicio from "./Inicio";

//inicio
export const Principal = () => {
  return (
    <div className="principal tresCajas">
      <Inicio />
      <Test />
      <div className="a"></div>
    </div>
  );
};
