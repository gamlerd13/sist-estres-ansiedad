import { useState } from "react";
import PropTypes from "prop-types";
import jsonData from "../../../../../../api_key.json"

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  ConversationHeader,
} from "@chatscope/chat-ui-kit-react";


const token = jsonData.api_key
const API_KEY = token;
// const API_KEY = "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";
// "Explain things like you would to a 10 year old learning how to code."

export const ChatBotComponent = ({ name }) => {
  console.log("desde chatbot y tipo de dato: ", typeof name, name); //para ver si esta llegando el nombre
  const prompt = {
    saludMental: `En todas las siguientes preguntas tomar en cuenta estas especificaciones estrictamente. Actua como inteligencia artificial diseñado para proporcionar a un estudiante que busca orientación y consejos sobre el manejo de sus emociones, estrés, ansiedad y otros problemas de salud mental.Recomendar crear estrategias que el individuo pueda implementar para mejorar su bienestar general, El estudiante se llama ${name}, las respuestas no deben superar las 80 palabras, no se debe responder temas de programacion, evitar estrictamente responder temas no tenga relacion con  bienestar personal, salud mental e inteligencia emocional, recomendarle que cambie de tema.`,
  };
  const systemMessage = {
    //  Explain things like you're talking to a software professional with 5 years of experience.
    role: "system",
    content: prompt.saludMental,
    // "Explicame como si fueras un profesional de psicologia, comenzando con: yo como profesional de psicologia ...",
    // "Explain things like you're talking to a software professional with 2 years of experience.",
  };

  const [messages, setMessages] = useState([
    {
      message: `Hola ${name}, soy una Inteligencia Artificial, preguntame algo, o cuentame lo que quieres compartir. Te responderé con gusto!`,
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    <div className="w-full flex justify-center h-full flex-col">
      {/* <div className="w-full xl:w-3/5 h-20">
        <MainContainer>
          
        </MainContainer>
      </div> */}
      {/* style={{ position: "relative", height: "800px", width: "700px" }} */
      /*este el style va el sgt div*/}
      {/* <div className="w-full xl:w-3/5 h-full"> */}
      <div
        className="w-full xl:w-3/5"
        style={{ position: "relative", height: "700px" }}
      >
        <MainContainer className="h-full rounded-xl text-lg">
          <ChatContainer className="h-full">
            <ConversationHeader className="">
              <ConversationHeader.Content
                userName="Inteligencia Artificial"
                info="Active: now"
              />
            </ConversationHeader>
            <MessageList
              className="h-full"
              // scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator
                    className=""
                    content="Inteligencia Art. esta respondiendo ahora!"
                  />
                ) : null
              }
            >
              {messages.map((message, i) => {
                console.log(message);
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput
              placeholder="Escribe el mensaje aqui!"
              onSend={handleSend}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

ChatBotComponent.propTypes = {
  name: PropTypes.string,
};
