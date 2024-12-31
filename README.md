# *LibraGraphAI*

*LibraGraphAI* is an innovative library management system that leverages the power of AI and modern web technologies to provide a seamless and intelligent user experience. The system integrates advanced data management, interactive AI features, and a user-friendly interface to enhance library operations and user engagement.

---

## *Features*

- *AI-Powered Recommendations*  
  Utilize *LangChain* and *GROQ* for personalized book recommendations and dynamic interactions.

- *Interactive Voice and Chat Bots*  
  Engage with users through voice commands and chat interfaces powered by *AssemblyAI* and *ElevenLabs*.

- *Modern Frontend with React and Vite*  
  A responsive and dynamic user interface built with *React.js* and *Vite* for fast and efficient performance.

- *Comprehensive Book Catalog*  
  Explore a wide range of books categorized by genre, including Fiction, Science, Biography, and more.

- *Secure Authentication*  
  User authentication and management using *Clerk* for a secure and personalized experience.

- *Environment Configuration*  
  Easily configurable environment settings for both client and server using .env files.

---

## *Tech Stack*

- *Frontend*: React.js, Vite, Tailwind CSS
- *Backend*: Express.js, Mongoose
- *Database*: MongoDB
- *AI and Machine Learning*: LangChain, GROQ
- *Voice and Chat Integration*: AssemblyAI, ElevenLabs
- *Authentication*: Clerk

---

## *Getting Started*

### *Prerequisites*
Ensure you have the following installed:

- *Node.js* >= 14.0
- *MongoDB* 

### *Setup Instructions*

1. *Clone the Repository*:
   bash
   git clone https://github.com/BroadrangeAI/LibraGraphAI.git
   cd LibraGraphAI
   

2. *Server Setup*:
   - Navigate to the Server directory:
     bash
     cd Server
     
   - Install dependencies:
     bash
     npm install
     
   - Set up environment variables:
     - Create a .env file in the Server directory with the following keys:
       env
       MONGO_DB_URI=your_mongodb_uri
       PORT=3000
       ELEVENLABS_API_KEY=your_elevenlabs_api_key
       ASSEMBLYAI_API_KEY=your_assemblyai_api_key
       VITE_GROQ_API_KEY=your_groq_api_key
       
   - Start the server:
     bash
     npm run dev
     

3. *Client Setup*:
   - Navigate to the Client directory:
     bash
     cd ../Client
     
   - Install dependencies:
     bash
     npm install
     
   - Set up environment variables:
     - Create a .env file in the Client directory with the following keys:
       env
       VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
       VITE_GOOGLE_API_KEY=your_google_api_key
       
   - Start the development server:
     bash
     npm run dev
     

4. *Access the App*:
   Open your browser and go to:  
   http://localhost:3000

---

## *Project Structure*


LibraGraphAI/
│
├── Server/             # Express.js Backend
│   ├── Config/         # Configuration files
│   ├── Model/          # Mongoose models
│   ├── Routes/         # API routes
│   ├── controllers/    # Controller logic
│   └── Server.js       # Server entry point
│
├── Client/             # React.js Frontend
│   ├── public/         
│   ├── src/            # Component-based architecture
│   ├── package.json    # Frontend dependencies
│   └── README.md
│
└── README.md           # Project Documentation


---

## *Contributors*

We’re a collaborative team working to shape the future of AI-powered libraries:  

- [Jatin M Gulati](https://github.com/JatinMGulati)  
- [Vidhvath J Poojari](https://github.com/vidhvath28)  
- [Prabhas Varma](https://github.com/PRABHAS-VARMA)  
- [Pawan Omprakash](https://github.com/pawanomprakash)  
- [Raniya Poonthala](https://github.com/raniyaptla)  

---

## *License*

This project is licensed under the *MIT License*. See the [LICENSE](LICENSE) file for details.

---

## *Contact*

For inquiries, collaboration, or support, reach out to us at:  
📧 *contact@broadrangeai.com*