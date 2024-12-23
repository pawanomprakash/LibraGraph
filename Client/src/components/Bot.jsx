import React, { useState } from "react";
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

const initializeChat = () => {
  try {
    const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;

    if (!groqApiKey) {
      throw new Error("GROQ API key not found in environment variables");
    }

    const model = new ChatGroq({
      apiKey: groqApiKey,
      model: "mixtral-8x7b-32768",
      temperature: 0,
    });

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "You are a friendly and helpful AI assistant."],
      ["human", "{input}"],
    ]);

    return RunnableSequence.from([prompt, model, new StringOutputParser()]);
  } catch (error) {
    console.error("Error initializing chat:", error);
    return null;
  }
};

const chain = initializeChat();

function Bot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!chain) {
      setError("Chat system not properly initialized. Please check API key configuration.");
      setIsLoading(false);
      return;
    }

    const userMessage = input.trim();
    if (!userMessage) {
      setError("Please enter a message.");
      setIsLoading(false);
      return;
    }

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");

    try {
      const result = await chain.invoke({ input: userMessage });
      setMessages((prev) => [...prev, { role: "assistant", content: result }]);
    } catch (error) {
      console.error("Error:", error);
      setError("Sorry, something went wrong. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        <header style={styles.header}>AI Assistant</header>
        <div style={styles.messagesContainer}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.messageBubble,
                ...(msg.role === "user" ? styles.userBubble : styles.assistantBubble),
              }}
            >
              {msg.content}
            </div>
          ))}
          {isLoading && <div style={styles.loading}>🤖 Typing...</div>}
        </div>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="Type your message here..."
          />
          <button type="submit" style={styles.button} disabled={isLoading}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      background: `url("https://media.giphy.com/media/ToMjGpPcTt3go0nrrFe/giphy.gif") no-repeat center center fixed`,
      backgroundSize: "cover",
      color: "#ffffff",
      fontFamily: "'Orbitron', sans-serif", // Sleek, futuristic font
      overflow: "hidden",
    },
    chatBox: {
      width: "80%",
      maxWidth: "800px",
      height: "90%",
      background: "rgba(0, 0, 0, 0.8)", // Dark, semi-transparent background
      borderRadius: "15px",
      boxShadow: "0 0 30px rgba(0, 255, 255, 0.7)", // Glowing effect
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      border: "1px solid rgba(0, 255, 255, 0.5)", // Subtle neon border
    },
    header: {
      background: "linear-gradient(90deg, rgba(0, 255, 255, 0.5), rgba(0, 153, 255, 0.7))",
      padding: "20px",
      fontSize: "1.8em",
      fontWeight: "bold",
      textAlign: "center",
      textTransform: "uppercase",
      color: "#00ffff",
      boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)", // Glow under the header
    },
    messagesContainer: {
      flex: 1,
      padding: "20px",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      scrollbarWidth: "thin",
      scrollbarColor: "rgba(0, 255, 255, 0.5) transparent", // Custom scrollbar for high-tech look
    },
    messageBubble: {
      padding: "15px",
      borderRadius: "12px",
      fontSize: "16px",
      lineHeight: "1.6",
      maxWidth: "75%",
      wordWrap: "break-word",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
      backdropFilter: "blur(5px)", // Adds a futuristic blur effect
    },
    userBubble: {
      alignSelf: "flex-end",
      background: "linear-gradient(90deg, #00ffff, #0099ff)",
      color: "#ffffff",
      boxShadow: "0 0 10px rgba(0, 255, 255, 0.6)", // Neon glow
    },
    assistantBubble: {
      alignSelf: "flex-start",
      background: "linear-gradient(90deg, #003366, #0066ff)",
      color: "#ffffff",
      boxShadow: "0 0 10px rgba(0, 102, 255, 0.6)", // Neon glow
    },
    loading: {
      alignSelf: "center",
      fontStyle: "italic",
      color: "#00ffff",
      fontSize: "14px",
      textShadow: "0 0 5px rgba(0, 255, 255, 0.7)", // Glowing effect for typing
    },
    form: {
      display: "flex",
      padding: "10px",
      background: "rgba(0, 0, 0, 0.8)",
      borderTop: "2px solid rgba(0, 255, 255, 0.5)", // Neon divider
    },
    input: {
      flex: 1,
      padding: "15px",
      borderRadius: "8px",
      border: "1px solid rgba(0, 255, 255, 0.5)",
      background: "rgba(0, 0, 0, 0.7)",
      color: "#00ffff",
      fontSize: "16px",
      outline: "none",
      marginRight: "10px",
      boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
      transition: "box-shadow 0.3s",
    },
    button: {
      padding: "10px 20px",
      background: "linear-gradient(90deg, #00ffff, #0099ff)",
      border: "none",
      borderRadius: "8px",
      color: "#ffffff",
      fontSize: "16px",
      cursor: "pointer",
      boxShadow: "0 0 15px rgba(0, 255, 255, 0.7)",
      transition: "background-color 0.3s, box-shadow 0.3s",
    },
    buttonHover: {
      boxShadow: "0 0 20px rgba(0, 255, 255, 0.9)",
    },
    error: {
      color: "#ff3333",
      textAlign: "center",
      fontSize: "14px",
      textShadow: "0 0 5px rgba(255, 51, 51, 0.7)",
    },
  };
  
  
  
  

export default Bot;
