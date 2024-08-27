from langchain_core.messages import AIMessage, HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
import os

load_dotenv()

google_api_key = os.getenv("GOOGLE_API_KEY")

if not google_api_key:
    print("GOOGLE_API_KEY not found. Please set it in your .env file.")
    exit()

def get_response(user_query, chat_history):
    template = """
    You are a helpful assistant. Answer the following questions considering the history of the conversation:

    Chat history: {chat_history}

    User question: {user_question}
    """

    prompt = ChatPromptTemplate.from_template(template)
    llm = ChatGoogleGenerativeAI(model="gemini-pro", google_api_key=google_api_key)
    chain = prompt | llm | StrOutputParser()

    return chain.invoke({
        "chat_history": chat_history,
        "user_question": user_query,
    })

chat_history = [
    AIMessage(content="Hello, I am a bot. How can I help you?")
]

print(chat_history[0].content)

while True:
    user_query = input("You: ") 
    if user_query.lower() in ["exit", "quit"]:
        print("Goodbye!")
        break
    
    chat_history.append(HumanMessage(content=user_query))

    response = get_response(user_query, chat_history)
    print(f"AI: {response}")

    chat_history.append(AIMessage(content=response))
