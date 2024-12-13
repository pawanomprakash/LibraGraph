import React, { useState } from "react";
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { FaComments } from "react-icons/fa"; // Importing the chat bubble icon

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
      ["system", "You are a friendly and helpful library assistant..."],
      ["human", "{input}"]
    ]);

    return RunnableSequence.from([prompt, model, new StringOutputParser()]);
  } catch (error) {
    console.error("Error initializing chat:", error);
    return null;
  }
};

const chain = initializeChat();

function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isChatVisible, setIsChatVisible] = useState(false); // State to control visibility of the chat

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setError(""); // Clear any previous errors
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

  const toggleChatVisibility = () => {
    setIsChatVisible((prev) => !prev); // Toggle the visibility of the chat
  };

  return (
    <>
      {/* Chat Icon Button */}
      <button
        style={styles.chatIconButton}
        onClick={toggleChatVisibility}
        aria-label="Open Chat"
      >
        <FaComments style={styles.chatIcon} />
      </button>

      {/* Chat Window */}
      {isChatVisible && (
        <div style={styles.chatContainer}>
          <div style={styles.chatBox}>
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
                placeholder="Ask me about the library..."
              />
              <button type="submit" style={styles.button} disabled={isLoading}>
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  chatIconButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "50%",
    padding: "15px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    zIndex: 1000,
  },
  chatIcon: {
    color: "#fff",
    fontSize: "24px",
  },
  chatContainer: {
    position: "fixed",
    bottom: "80px", // Adjusted to prevent overlap with icon
    right: "20px",
    width: "300px",
    zIndex: 1000,
  },
  chatBox: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  messagesContainer: {
    maxHeight: "300px",
    overflowY: "auto",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  messageBubble: {
    maxWidth: "80%",
    padding: "10px",
    borderRadius: "15px",
    fontSize: "14px",
    wordWrap: "break-word",
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#e0f7fa",
    color: "#00695c",
  },
  assistantBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#f1f8e9",
    color: "#33691e",
  },
  loading: {
    alignSelf: "flex-start",
    fontStyle: "italic",
    color: "#777",
  },
  form: {
    display: "flex",
    marginTop: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginRight: "5px",
    fontSize: "14px",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  error: {
    color: "#d32f2f",
    backgroundColor: "#fdecea",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "10px",
    fontSize: "12px",
  },
};

export default Chatbot;
