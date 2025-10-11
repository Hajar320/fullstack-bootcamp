import re
import os
import json
import requests
from dotenv import load_dotenv
from openai import OpenAI
from urllib.parse import quote

load_dotenv()

class MoroccoFlightAssistant:
    def __init__(self):
        self.api_key = os.getenv("OPENROUTER_API_KEY")
        self.filename = "chat_memory.json"
        self.max_history = 10
        
        if not self.api_key:
            raise ValueError("OPENROUTER_API_KEY is not set")
        
        self.client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=self.api_key
        )
        
        self.messages = self.trim_memory(self.load_memory())
    
    def load_memory(self):
        if os.path.exists(self.filename):
            with open(self.filename, "r", encoding="utf-8") as f:
                return json.load(f)
        return [{
            "role": "system", 
            "content": "You are a helpful travel assistant specializing in flights from Morocco. Be concise and helpful."
        }]
    
    def save_memory(self, messages=None):
        if messages is None:
            messages = self.messages
        with open(self.filename, "w", encoding="utf-8") as f:
            json.dump(messages, f, ensure_ascii=False, indent=2)
    
    def trim_memory(self, messages):
        if len(messages) <= self.max_history + 1:
            return messages
        return [messages[0]] + messages[-self.max_history:]
    
    def extract_flight_info(self, user_input):
        """Extract flight information including departure city and destination"""
        patterns = [
            r"flights?\s+(?:from|departing)\s+([a-zA-Z\s]+?)\s+to\s+([a-zA-Z\s]+)",
            r"flights?\s+to\s+([a-zA-Z\s]+)\s+(?:from|departing)\s+([a-zA-Z\s]+)",
            r"fly\s+(?:from|departing)\s+([a-zA-Z\s]+?)\s+to\s+([a-zA-Z\s]+)",
            r"travel\s+(?:from|departing)\s+([a-zA-Z\s]+?)\s+to\s+([a-zA-Z\s]+)",
            r"from\s+([a-zA-Z\s]+?)\s+to\s+([a-zA-Z\s]+)",
        ]
        
        for pattern in patterns:
            match = re.search(pattern, user_input, re.IGNORECASE)
            if match:
                departure = match.group(1).strip()
                destination = match.group(2).strip()
                return departure, destination
        
        # Fallback: if only destination is mentioned, assume Morocco departure
        destination_patterns = [
            r"flights?\s+to\s+([a-zA-Z\s]+)",
            r"fly\s+to\s+([a-zA-Z\s]+)",
            r"travel\s+to\s+([a-zA-Z\s]+)"
        ]
        
        for pattern in destination_patterns:
            match = re.search(pattern, user_input, re.IGNORECASE)
            if match:
                return "Morocco", match.group(1).strip()
        
        return None, None

    def search_web_for_flights(self, departure, destination):
        """Search the web for flight information using DuckDuckGo API"""
        try:
            # Create search query
            query = f"flights from {departure} to {destination} prices schedules airlines"
            encoded_query = quote(query)
            
            # Use DuckDuckGo Instant Answer API
            ddg_url = f"https://api.duckduckgo.com/?q={encoded_query}&format=json&no_html=1"
            
            response = requests.get(ddg_url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Extract relevant information from DuckDuckGo response
                if data.get('Abstract'):
                    abstract = data['Abstract']
                    source = data.get('AbstractSource', 'DuckDuckGo')
                    return f"🌍 Flight Information from {departure.title()} to {destination.title()}:\n\n{abstract}\n\nSource: {source}"
                
                elif data.get('RelatedTopics'):
                    # Get the first relevant topic
                    for topic in data['RelatedTopics']:
                        if 'Text' in topic:
                            text = topic['Text'][:500]  # Limit length
                            return f"🌍 Flight Information from {departure.title()} to {destination.title()}:\n\n{text}..."
            
            # If web search doesn't return good results, use simulated data
            return self.generate_simulated_flight_data(departure, destination)
            
        except Exception as e:
            print(f"Web search error: {e}")
            # Fallback to simulated data if web search fails
            return self.generate_simulated_flight_data(departure, destination)

    def generate_simulated_flight_data(self, departure, destination):
        """Generate realistic flight data when web search is unavailable"""
        
        # Common Moroccan airports and their codes
        morocco_airports = {
            "casablanca": {"code": "CMN", "name": "Mohammed V International Airport"},
            "rabat": {"code": "RBA", "name": "Rabat-Salé Airport"}, 
            "marrakech": {"code": "RAK", "name": "Marrakesh Menara Airport"},
            "agadir": {"code": "AGA", "name": "Agadir-Al Massira Airport"},
            "tangier": {"code": "TNG", "name": "Tangier Ibn Battouta Airport"},
            "fes": {"code": "FEZ", "name": "Fès-Saïss Airport"},
            "oujda": {"code": "OUD", "name": "Angads Airport"}
        }
        
        # Common airlines flying from Morocco
        airlines = [
            {"name": "Royal Air Maroc", "code": "AT"},
            {"name": "Air France", "code": "AF"},
            {"name": "Ryanair", "code": "FR"},
            {"name": "EasyJet", "code": "U2"},
            {"name": "Turkish Airlines", "code": "TK"},
            {"name": "Emirates", "code": "EK"}
        ]
        
        # Get departure airport info
        departure_lower = departure.lower()
        if departure_lower in morocco_airports:
            departure_info = morocco_airports[departure_lower]
        else:
            # Default to Casablanca if departure not found
            departure_info = morocco_airports["casablanca"]
        
        # Generate realistic flight options
        flights = []
        for i in range(4):  # Generate 4 sample flights
            airline = airlines[i % len(airlines)]
            flight_number = f"{airline['code']}{1000 + i}"
            
            # Vary prices and durations
            base_price = 150 + (i * 75)
            duration_hours = 2 + (i // 2)
            
            flights.append({
                "airline": airline["name"],
                "flight": flight_number,
                "from": f"{departure_info['code']} ({departure_info['name']})",
                "to": destination.title(),
                "duration": f"{duration_hours}h {15 * i}m",
                "price": f"${base_price} - ${base_price + 100}",
                "stops": "Direct" if i == 0 else f"{i} stop(s)",
                "time": f"{8 + i}:00 AM - {8 + i + duration_hours}:{15 * i} PM"
            })
        
        # Format the response
        result = f"✈️ Flights from {departure.title()} to {destination.title()}:\n\n"
        
        for i, flight in enumerate(flights, 1):
            result += f"{i}. {flight['airline']} {flight['flight']}\n"
            result += f"   📍 {flight['from']} → {flight['to']}\n"
            result += f"   🕒 {flight['time']}\n"
            result += f"   ⏱️  Duration: {flight['duration']}\n"
            result += f"   💰 Price: {flight['price']}\n"
            result += f"   🔄 {flight['stops']}\n\n"
        
        result += "💡 For real-time prices and booking, visit:\n"
        result += "• Royal Air Maroc (ram.ma)\n• Skyscanner\n• Google Flights\n• Expedia\n• Booking.com"
        return result

    def process_user_input(self, user_input):
        departure, destination = self.extract_flight_info(user_input)

        # Keywords that trigger flight search
        flight_keywords = ['flight', 'fly', 'flying', 'airline', 'airport', 'travel to', 'ticket']
        if any(keyword in user_input.lower() for keyword in flight_keywords):
            if departure and destination:
                tool_response = self.search_web_for_flights(departure, destination)
            elif destination:
                tool_response = self.search_web_for_flights("Morocco", destination)
            else:
                tool_response = "Please specify both the departure and destination cities."

            # Save user and tool response to memory
            self.messages.append({"role": "user", "content": user_input})
            self.messages.append({"role": "assistant", "content": tool_response})
            self.messages = self.trim_memory(self.messages)
            self.save_memory()
            return tool_response

        # Otherwise fallback to LLM
        self.messages.append({"role": "user", "content": user_input})

        try:
            response = self.client.chat.completions.create(
                model="deepseek/deepseek-chat-v3.1:free",
                messages=self.messages
            )
            if response and response.choices:
                reply = response.choices[0].message.content
            else:
                reply = "Sorry, I couldn't get a response."

        except Exception as e:
            reply = f"OpenRouter API error: {e}"

        self.messages.append({"role": "assistant", "content": reply})
        self.messages = self.trim_memory(self.messages)
        self.save_memory()
        # Remove special tokens from LLM output
        reply = reply.replace("<|begin▁of▁sentence|>", "").strip()
        return reply

    def run(self):
        print("🛫 Morocco Flight Assistant activated! Type 'exit' to quit.\n")
        
        while True:
            try:
                user_input = input("You: ")
                if user_input.lower() in ["exit", "quit", "bye"]:
                    self.save_memory()
                    print("Assistant: Chat memory saved. Safe travels!")
                    break
                
                response = self.process_user_input(user_input)
                print(f"Assistant: {response}\n")

            except KeyboardInterrupt:
                print("\n\nAssistant: Session interrupted. Goodbye!")
                self.save_memory()
                break
            except Exception as e:
                print(f"Assistant: An error occurred: {e}")

if __name__ == "__main__":
    assistant = MoroccoFlightAssistant()
    assistant.run()