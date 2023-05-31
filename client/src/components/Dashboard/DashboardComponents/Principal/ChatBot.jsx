import { useState } from "react";
export const ChatBotComponent = () => {
  const [iniciado, setIniciado] = useState(false);
  // const Iniciar = ()=>{
  //   set
  // }
  return (
    <div className="principal tresCajas">
      <h1>Here va el chatbot</h1>
      <div>
        <button onClick={!true}>Comenzar, {iniciado}</button>
      </div>
      {/* {iniciado && <div className="">aqui va el chat</div>} */}
    </div>
  );
};
