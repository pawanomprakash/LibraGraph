import React, { useState } from "react";

function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Manage chatbot visibility

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const userMessage = input.trim();
    if (!userMessage) {
      setError("Please enter a message.");
      setIsLoading(false);
      return;
    }

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");

    // Simulate chatbot response
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: "This is a simulated response." }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Icon */}
      <div
        style={styles.chatIcon}
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </div>

      {/* Chatbot Window */}
      {isOpen && (
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
                placeholder="Ask me something..."
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
  chatIcon: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    backgroundColor: "#007BFF",
    color: "#fff",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
    fontSize: "30px",
    zIndex: 1000,
  },
  chatContainer: {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    width: "300px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
  },
  chatBox: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    maxHeight: "400px",
    overflow: "hidden",
  },
  messagesContainer: {
    flexGrow: 1,
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
