# Morocco Flight Assistant AI Agent 🤖✈️

An intelligent AI-powered flight assistant specialized in helping users find flight information from Morocco to international destinations, featuring memory persistence and web search capabilities.

## 🌟 Features

### Core Capabilities
- **Natural Language Processing** - Understands flight queries in conversational language
- **Flight Information Search** - Finds flights using web search and simulated data
- **Persistent Memory** - Remembers conversation history across sessions
- **Smart Response Generation** - Uses AI for travel advice and flight details

### Technical Features
- **Web Search Integration** - DuckDuckGo API for real-time flight information
- **Memory Management** - JSON-based conversation storage with auto-trimming
- **Multi-Airport Support** - Covers all major Moroccan airports
- **Fallback System** - Simulated flight data when web search fails

## 🛠️ Technology Stack

- **Python 3.x** - Core programming language
- **OpenAI API** (via OpenRouter) - AI conversation processing
- **Flask** - Web framework (for web interface)
- **DuckDuckGo API** - Web search for flight data
- **JSON File Storage** - Conversation memory persistence

## 📁 Project Structure

```
morocco-flight-assistant/
├── app.py                 # Flask web server (if using web interface)
├── assistant.py           # Core AI agent class
├── requirements.txt       # Python dependencies
├── .env                  # Environment variables
├── chat_memory.json      # Conversation history
├── templates/            # Web interface templates
│   └── index.html
└── static/              # Web assets
    ├── styles.css
    └── script.js
```

## 🚀 Quick Start

### Installation
```bash
# Install dependencies
pip install flask python-dotenv requests openai

# Set up environment variables
echo "OPENROUTER_API_KEY=your_key_here" > .env
```

### Usage
```python
from assistant import MoroccoFlightAssistant

# Initialize the assistant
assistant = MoroccoFlightAssistant()

# Start interactive session
assistant.run()
```

### Web Interface (Optional)
```python
# Run with Flask web server
python app.py
# Access at http://127.0.0.1:5000
```

## 💬 Usage Examples

### Flight Queries
```
"flights from casablanca to paris"
"show me flights to london"
"airlines from marrakech to new york"
```

### Travel Advice
```
"travel tips for international flights"
"documents needed for US travel"
"best time to book flights"
```

## ⚙️ Configuration

### Environment Variables
```env
OPENROUTER_API_KEY=your_openrouter_api_key
```

### Memory Settings
- **Max History**: 10 messages (configurable)
- **Storage File**: `chat_memory.json`
- **Auto-save**: After each interaction

### Supported Airports
- Casablanca (CMN)
- Marrakech (RAK)
- Rabat (RBA)
- Agadir (AGA)
- Tangier (TNG)
- Fes (FEZ)
- Oujda (OUD)

## 🔧 Core Components

### AI Agent Class
- `MoroccoFlightAssistant()` - Main class initialization
- `process_user_input()` - Handles user queries
- `extract_flight_info()` - Parses flight details from text
- `search_web_for_flights()` - Web search integration
- `generate_simulated_flight_data()` - Fallback flight information

### Memory System
- **Persistent Storage** - JSON file-based memory
- **Context Management** - Maintains conversation flow
- **Auto-trimming** - Prevents memory overflow
- **Session Persistence** - Survives server restarts

### Web Search Tool
- **DuckDuckGo Integration** - Real-time flight data
- **Smart Querying** - Automatic search parameter extraction
- **Result Processing** - Formats and summarizes information
- **Fallback Mechanism** - Simulated data when search fails

## 🎯 Key Methods

### `extract_flight_info(user_input)`
Extracts departure and destination cities from natural language queries using regex patterns.

### `search_web_for_flights(departure, destination)`
Searches DuckDuckGo for flight information and returns formatted results.

### `generate_simulated_flight_data(departure, destination)`
Creates realistic flight options with airlines, prices, and schedules.

### `process_user_input(user_input)`
Main processing function that routes queries to appropriate handlers (web search or AI).

## 🛡️ Error Handling

- **API Failures** - Graceful fallback to simulated data
- **Memory Issues** - Automatic recovery from corrupted files
- **Network Problems** - Timeout handling and error messages
- **Invalid Queries** - Helpful guidance for users

## 📈 Sample Output

```
✈️ Flights from Casablanca to Paris:

1. Royal Air Maroc AT1000
   📍 CMN (Mohammed V International Airport) → Paris
   🕒 8:00 AM - 10:00 PM
   ⏱️ Duration: 2h 0m
   💰 Price: $150 - $250
   🔄 Direct

💡 For real-time prices and booking, visit:
• Royal Air Maroc (ram.ma)
• Skyscanner
• Google Flights
```

## 🔄 API Integration

### OpenRouter Configuration
```python
self.client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=self.api_key
)
```

### Model Used
- **deepseek/deepseek-chat-v3.1:free** - Primary language model

## 🚨 Troubleshooting

### Common Issues
1. **"OPENROUTER_API_KEY is not set"**
   - Check `.env` file exists with correct API key

2. **Web search failures**
   - System automatically uses simulated flight data

3. **Memory file issues**
   - System creates new memory file if corrupted

4. **Network timeouts**
   - Requests have 10-second timeout with fallback

## 📝 License

This project is for educational purposes. Please check API terms of service for commercial use.

## 🙏 Acknowledgments

- **OpenRouter** for AI API access
- **DuckDuckGo** for search capabilities
- **OpenAI** for language models

---

**Happy Travel Planning! ✈️🌍**

*Start using: `python assistant.py`*