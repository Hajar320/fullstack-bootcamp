class Phone:
    
    def __init__(self, phone_number):
        self.phone_number = phone_number
        self.call_history = []
        self.messages = []  
    
    def call(self, other_phone):
        call_string = f"{self.phone_number} called {other_phone.phone_number}"
        print(call_string)
        self.call_history.append(call_string)

    def show_call_history(self):
        print(f"Call history for {self.phone_number}:")
        for call in self.call_history:
            print(f"- {call}")
    
    def send_message(self, other_phone, message_text):
        message = {
            "to": other_phone.phone_number,
            "from": self.phone_number,
            "content": message_text
        }
        self.messages.append(message)
        print(f"Message sent to {other_phone.phone_number}")
    
    def show_outgoing_messages(self):
        print("Outgoing messages:")
        for msg in self.messages:
            if msg["from"] == self.phone_number:
                print(f"To: {msg['to']} - '{msg['content']}'")
    
    def show_incoming_messages(self):
        print("Incoming messages:")
        for msg in self.messages:
            if msg["to"] == self.phone_number:
                print(f"From: {msg['from']} - '{msg['content']}'")
    
    def show_messages_from(self, from_number):
        print(f"Messages from {from_number}:")
        for msg in self.messages:
            if msg["from"] == from_number and msg["to"] == self.phone_number:
                print(f"- '{msg['content']}'")


phone1 = Phone("123-456-7890")
phone2 = Phone("987-654-3210")

phone2.call(phone1)

phone2.show_call_history()

phone1.send_message(phone2, "Hello! How are you?")
phone1.send_message(phone2, "Let's meet tomorrow")

print("\n--- Showing messages ---")
phone1.show_outgoing_messages()
print()
phone1.show_incoming_messages()
print()
phone1.show_messages_from("987-654-3210")

print("\n--- Phone2's messages ---")
phone2.show_outgoing_messages()
print()
phone2.show_incoming_messages()
print()
phone2.show_messages_from("123-456-7890")