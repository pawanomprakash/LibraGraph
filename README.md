
# **LibraGraphAI**

**LibraGraphAI** is a next-generation library management system that harnesses the power of **knowledge graphs** and **generative AI** to deliver intelligent, personalized, and efficient user experiences. By combining advanced data relationships, dynamic search capabilities, and interactive AI, LibraGraphAI revolutionizes how libraries manage content and engage with users.

---

## **Features**

- 🚀 **Knowledge Graph Integration**  
   Leverage **Neo4j** to map and manage complex relationships between books, authors, genres, and user preferences. Unlock insights and recommendations through efficient graph queries.

- 🤖 **Generative AI-Powered Recommendations**  
   Utilize **LangChain** and generative AI to provide tailored book recommendations and dynamic, natural-language responses to user queries.

- 💡 **Interactive Librabot**  
   A conversational AI assistant capable of answering library-related queries, finding books, and assisting users with voice or text interactions.

- 📚 **Category-Based Organization**  
   Seamlessly browse books organized by genre, author, and popularity.

- 🔍 **Advanced Search Functionality**  
   Search for books instantly with intelligent search algorithms integrated into the system.

- 🌐 **User-Friendly Interface**  
   A sleek, responsive **React.js** frontend ensures an engaging and intuitive user experience across all devices.

- 🛠️ **API-First Architecture**  
   Powered by **FastAPI**, our backend delivers efficient, scalable, and developer-friendly API endpoints for managing library data.

---

## **Tech Stack**

- **Backend**: FastAPI (Python)  
- **Frontend**: React.js, Axios  
- **Database**: Neo4j (Graph Database)  
- **AI and Machine Learning**: LangChain, Generative AI Models  
- **Version Control**: Git  
- **Voice Integration**: Speech Recognition APIs  

---

## **Getting Started**

### **Prerequisites**
Before running the project, ensure the following dependencies are installed:

- **Python** >= 3.6  
- **Node.js** >= 14.0  
- **Neo4j** (Community or Enterprise Edition)  

### **Setup Instructions**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/BroadrangeAI/LibraGraphAI.git
   cd LibraGraphAI
   ```

2. **Backend Setup**:
   - Navigate to the `backend` directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Run the FastAPI server:
     ```bash
     uvicorn main:app --reload
     ```

3. **Frontend Setup**:
   - Navigate to the `frontend` directory:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm start
     ```

4. **Neo4j Setup**:
   - Install and start the Neo4j database.
   - Update the connection credentials in the backend configuration.

5. **Access the App**:
   Open your browser and go to:  
   `http://localhost:3000`

---

## **Project Architecture**

```
LibraGraphAI/
│
├── backend/            # FastAPI Backend
│   ├── main.py         # API entry point
│   ├── models/         # Data models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   └── requirements.txt
│
├── frontend/           # React.js Frontend
│   ├── public/         
│   ├── src/            # Component-based architecture
│   ├── package.json    # Frontend dependencies
│   └── README.md
│
└── README.md           # Project Documentation
```

---

## **Contributors**

We’re a collaborative team working to shape the future of AI-powered libraries:  

- [Jatin M Gulati](https://github.com/JatinMGulati)  
- [Vidhvath J Poojari](https://github.com/vidhvath28)  
- [Prabhas Varma](https://github.com/PRABHAS-VARMA)  
- [Pawan Omprakash](https://github.com/pawanomprakash)  
- [Raniya Poonthala](https://github.com/raniyaptla)  

---

## **License**

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## **Contact**

For inquiries, collaboration, or support, reach out to us at:  
📧 **contact@broadrangeai.com**

