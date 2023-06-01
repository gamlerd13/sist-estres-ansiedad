import chatbot from "../../../../LoginAssets/chatBot.png";
import test from "../../../../LoginAssets/test.png";
import resultado from "../../../../LoginAssets/resultado2.png";
export const InicioComponent = () => {
  return (
    <div className="w-full flex flex-col justify-center">
      <span>Inicio</span>
      <div className="w-3/4 flex-col">
        {/* <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 w-96 h-12 bg-cyan-500 shadow-lg shadow-cyan-500/50 ">
          d
        </button> */}
        <div className="w-full">
          <p className="text-6xl font-bold tracking-tight text-center">
            <hr className="h-2 bg-black " />
            Inteligencia Emocional en los estudiantes
            <hr className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500" />
          </p>
          <p className="text-center">
            Sistema Inteligente de apoyo en las IE que combina la inteligencia
            artificial con el campo de psicología. Este sistema utiliza
            evaluaciones, tests para medir el nivel de inteligencia emocional de
            cada estudiante y proporcionar un plan de acción específico para su
            desarrollo. El objetivo es ayudar a los estudiantes a fortalecer sus
            habilidades sociales, la empatía, la autoconciencia y la regulación
            emocional.
          </p>
        </div>
      </div>
      <div className="scroll-pl-6 snap-x grid w-10/12 mt-6 lg:flex lg:flex ">
        <div className="w-full justify-center flex lg:hover:scale-125">
          <img
            src={chatbot}
            alt="logo chat bot"
            className="h-auto  w-auto  filter grayscale rounded-3xl hover:border-b-8 border-indigo-500 "
          />
        </div>

        <div className=" w-full justify-center flex lg:hover:scale-150">
          <img
            src={test}
            alt=""
            className="rounded-3xl hover:border-b-8 border-indigo-500"
          />
        </div>
        <div className="w-full justify-center flex lg:hover:scale-150">
          <img
            src={resultado}
            alt=""
            className="rounded-3xl hover:scale-100 hover:brightness-50 hover:border-b-8 border-indigo-500"
          />
          <button className="absolute h-8 w-16 bg-indigo-400">ddd</button>
        </div>
      </div>
      {/* Aqui va el slide */}
    </div>
  );
};
