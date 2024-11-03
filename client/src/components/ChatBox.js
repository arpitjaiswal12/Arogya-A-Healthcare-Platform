import React, { useEffect } from 'react';

const ChatBox = () => {
  useEffect(() => {
    // Embed Chatbase chatbot script
    const script = document.createElement('script');
    script.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "s_NSIAHloWKzRjNuqu9kY",
        domain: "www.chatbase.co"
      };
    `;
    document.body.appendChild(script);

    // Load Chatbase chatbot script
    const chatScript = document.createElement('script');
    chatScript.src = 'https://www.chatbase.co/embed.min.js';
    chatScript.chatbotId = 's_NSIAHloWKzRjNuqu9kY';
    chatScript.domain = 'www.chatbase.co';
    chatScript.defer = true;
    document.body.appendChild(chatScript);
  }, []);

  return (
    <div className="flex justify-center items-center w-full p-4">
      <iframe
        src="https://www.chatbase.co/chatbot-iframe/s_NSIAHloWKzRjNuqu9kY"
        title="Chatbot"
        className="w-full lg:w-1/2"
        style={{ minHeight: '700px', border: '2px solid black' }}
      />
    </div>
  );
};

export default ChatBox;
