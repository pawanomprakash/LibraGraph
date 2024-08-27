import google.generativeai as genai
import os
GOOGLE_API_KEY=os.getenv('GOOGLE_API_KEY')
genai.configure(api_key="AIzaSyDRwKXsXB-uGbu9R7PCDBuc8spHC6fTT8Q")
model=genai.GenerativeModel('gemini-1.5-pro')
chat = model.start_chat(history=[])

while True:
    prompt = input("Ask me anything: ")
    if prompt.lower() == "exit":
        break
    
    try:
        response = chat.send_message(prompt, stream=True)
        for chunk in response:
            if hasattr(chunk, 'text'):
                print(chunk.text, end='', flush=True)
            else:
                print("\nNo text in this chunk. Checking safety ratings...")
                for candidate in response.candidates:
                    for rating in candidate.safety_ratings:
                        print(f"Category: {rating.category}, Probability: {rating.probability}")
        print()  # New line after response
    except Exception as e:
        print(f"An error occurred: {e}")

print("Chat ended. Goodbye!")