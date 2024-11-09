import React, { useEffect } from "react";

const ChatBox = () => {
  useEffect(() => {
    // Embed Chatbase chatbot script
    const script = document.createElement("script");
    script.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "s_NSIAHloWKzRjNuqu9kY",
        domain: "www.chatbase.co"
      };
    `;
    document.body.appendChild(script);

    // Load Chatbase chatbot script
    const chatScript = document.createElement("script");
    chatScript.src = "https://www.chatbase.co/embed.min.js";
    chatScript.chatbotId = "s_NSIAHloWKzRjNuqu9kY";
    chatScript.domain = "www.chatbase.co";
    chatScript.defer = true;
    document.body.appendChild(chatScript);
  }, []);

  return (
    <div className="flex justify-center items-center w-full p-6 ">
      <iframe
        src="https://www.chatbase.co/chatbot-iframe/s_NSIAHloWKzRjNuqu9kY"
        title="Chatbot"
        className="w-full max-w-4xl h-[700px] border-2 border-gray-300 rounded-lg shadow-lg"
        style={{ minHeight: "700px" }}
      />
    </div>
  );
};

export default ChatBox;
