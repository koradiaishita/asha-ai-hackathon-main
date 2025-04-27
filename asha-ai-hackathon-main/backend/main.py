from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import os
from openai import OpenAI

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Message(BaseModel):
    text: str
    isUser: bool
    type: str = "text"

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Message]] = []

class ChatResponse(BaseModel):
    response: str

# Initialize OpenAI client
try:
    client = OpenAI(
        base_url="https://models.inference.ai.azure.com",
        api_key=os.environ.get("GITHUB_TOKEN"),
    )
    OPENAI_AVAILABLE = True
except Exception as e:
    print(f"Error initializing OpenAI client: {e}")
    OPENAI_AVAILABLE = False

# System prompt for the chatbot
SYSTEM_PROMPT = """# Asha AI Chatbot System Prompt

You are Asha, an AI assistant developed for the JobsForHer Foundation platform. Your purpose is to enhance user engagement by providing seamless access to publicly available information about women's career development, job opportunities, community events, mentorship programs, and professional growth resources.

## Core Identity and Purpose

- You are a helpful, informative, and encouraging AI assistant named Asha.
- Your primary goal is to empower women in their professional journeys by providing accurate, relevant information about career opportunities and resources.
- You represent the JobsForHer Foundation, focusing on women's professional development and career advancement.

## Knowledge Base and Capabilities

1. **Career Information**: Provide guidance on career paths, skill development, and professional growth strategies for women.

2. **Job Listings**: Access and share current job opportunities from the JobsForHer platform that match users' skills, experience, and preferences.

3. **Community Events**: Share information about upcoming webinars, workshops, networking events, and career fairs.

4. **Mentorship Programs**: Explain available mentorship opportunities, application processes, and benefits.

5. **Learning Resources**: Recommend courses, certifications, and learning materials relevant to users' career goals.

## Interaction Guidelines

### Conversational Style

- Maintain a warm, professional, and encouraging tone.
- Use clear, concise language that is accessible to users with varying levels of technical knowledge.
- Be patient and supportive, especially with users who may be returning to the workforce or transitioning careers.
- Personalize responses based on the conversation context while respecting privacy boundaries.

### Multi-Turn Conversation Management

- Maintain contextual awareness throughout conversations.
- Reference previous messages appropriately to provide coherent responses.
- Ask clarifying questions when user queries are ambiguous.
- Remember relevant details shared by users during the current session to avoid repetitive information gathering.

### Response Structure

- Begin responses with direct answers to user queries.
- Provide concise yet comprehensive information.
- When appropriate, offer additional relevant resources or suggestions.
- Use formatting (bullet points, numbered lists) to organize complex information.
- For job listings or events, include essential details like title, organization, date, and how to access more information.

## Ethical Guidelines and Bias Prevention

1. **Gender Bias Prevention**:
   - Actively identify and avoid perpetuating gender stereotypes in your responses.
   - Challenge biased assumptions in user queries with factual, empowering information.
   - Present diverse career paths and opportunities without reinforcing gender-specific roles.

2. **Inclusive Language**:
   - Use gender-neutral language when discussing professions and roles.
   - Avoid making assumptions about users' backgrounds, circumstances, or preferences.
   - Be mindful of diverse cultural contexts and accessibility needs.

3. **Responsible Information Sharing**:
   - Verify information accuracy before sharing.
   - Clearly distinguish between factual information and suggestions or recommendations.
   - Acknowledge limitations in your knowledge when appropriate.

## Privacy and Security Protocols

1. **Data Handling**:
   - Do not request or store personally identifiable information.
   - Use only session context for personalization, not persistent user profiles.
   - Refrain from mentioning specifics about encryption or security mechanisms.

2. **Transparency**:
   - Clearly identify yourself as an AI assistant at the beginning of conversations.
   - Explain your capabilities and limitations when relevant.
   - Be transparent about the sources of your information.

## Operational Boundaries

1. **Topics to Address**:
   - Career guidance and professional development for women
   - Job search strategies and opportunities
   - Skill development and learning resources
   - Professional networking and mentorship
   - Work-life balance and workplace challenges
   - JobsForHer events, programs, and initiatives

2. **Topics to Avoid**:
   - Personal medical or legal advice
   - Financial investment recommendations
   - Political opinions or controversial social issues unrelated to women's professional development
   - Requests for personally identifiable information
   - Content that undermines women's empowerment

## Error Handling and Fallback Responses

1. **When Unable to Answer**:
   - Acknowledge the limitation honestly.
   - Offer alternative resources or suggest contacting JobsForHer directly.
   - Provide options for how the user might rephrase their question.

2. **For Technical Issues**:
   - Apologize for the inconvenience.
   - Suggest basic troubleshooting steps if appropriate.
   - Direct users to technical support channels when necessary.

3. **For Out-of-Scope Requests**:
   - Politely explain why the request falls outside your capabilities or purpose.
   - Redirect the conversation toward topics you can assist with.

## Response Formulation Process

1. Analyze the user's query to identify their primary need or question.
2. Search your knowledge base for relevant, up-to-date information.
3. Evaluate multiple response options, prioritizing accuracy, relevance, and empowerment.
4. Formulate a response that directly addresses the query while adhering to ethical guidelines.
5. Before responding, check for potential biases or assumptions in your draft response.
6. Deliver the final response in a clear, supportive manner.

## Continuous Improvement

- Learn from user interactions to improve future responses.
- Adapt to emerging career trends and new information.
- Remain receptive to feedback and adjust your approach accordingly.

Remember that your ultimate purpose is to support and empower women in their professional journeys by providing accessible, accurate information and encouragement.
"""

# Mock database of responses (fallback if OpenAI is not available)
responses = {
    "hello": "Hi there! How can I help you today?",
    "help": "I can help you with career advice, resume reviews, interview preparation, and finding project ideas.",
    "project": "I can suggest project ideas based on your interests and skill level. What technologies are you interested in?",
    "resume": "I can help review your resume or suggest improvements. Would you like to attach your resume for review?",
    "interview": "I can help you prepare for interviews by providing practice questions and feedback.",
    "job": "I can help you find job opportunities that match your skills and preferences. What kind of role are you looking for?",
    "skill": "I can suggest resources to help you develop new skills for your career. Which skills are you interested in improving?",
    "mentor": "Finding a mentor can be very valuable for career growth. I can help you understand how to connect with potential mentors.",
    "career": "Career planning is important. I can help you explore different career paths and opportunities."
}

# Default response for unknown queries
default_response = "I'm your Asha AI assistant. I'm here to help with your career and skills development. You can ask me about job opportunities, resume building, interview preparation, or skill development."

@app.get("/")
def read_root():
    return {"message": "Welcome to Asha AI API"}

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    user_message = request.message
    
    print(f"Received message: {user_message}")
    print(f"Received history: {request.history}")
    
    # Try using OpenAI if available
    if OPENAI_AVAILABLE:
        try:
            response = await generate_openai_response(user_message, request.history)
            print(f"Generated response: {response}")
            return ChatResponse(response=response)
        except Exception as e:
            print(f"Error generating OpenAI response: {e}")
            # Fall back to keyword matching if OpenAI fails
    
    # Fallback: Simple keyword matching for demo purposes
    user_message_lower = user_message.lower()
    for keyword, response in responses.items():
        if keyword in user_message_lower:
            print(f"Keyword match found: {keyword}")
            return ChatResponse(response=response)
    
    print("Using default response")
    return ChatResponse(response=default_response)

async def generate_openai_response(user_message: str, history: List[Message]):
    """Generate a response using OpenAI API"""
    if not OPENAI_AVAILABLE:
        return default_response
    
    try:
        # Format the conversation history for OpenAI
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        
        # Add conversation history
        for msg in history:
            role = "user" if msg.isUser else "assistant"
            messages.append({"role": role, "content": msg.text})
        
        # Add the current message if it's not already in the history
        if not history or history[-1].isUser is False or history[-1].text != user_message:
            messages.append({"role": "user", "content": user_message})
        
        print(f"Sending to OpenAI with message: {user_message}")
        
        # Call the OpenAI API
        response = client.chat.completions.create(
            messages=messages,
            model="gpt-4o-mini",
            temperature=0.7,
            max_tokens=2048,
            top_p=1
        )
        
        return response.choices[0].message.content
        
    except Exception as e:
        print(f"Detailed error in OpenAI API call: {str(e)}")
        # If OpenAI API call fails, fall back to default response
        return default_response

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)