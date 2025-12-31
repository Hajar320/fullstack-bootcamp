// Get the button element
const button = document.getElementById("greetBtn") as HTMLButtonElement;

// Get the input element
const input = document.getElementById("nameInput") as HTMLInputElement;

// Get the message element
const messageDiv = document.getElementById("message") as HTMLDivElement;

// Add click event to button
button.addEventListener("click", () => {
  // Get the value from input
  const name = input.value;

  // Update the message
  if (name.trim() !== "") {
    messageDiv.textContent = `Hello, ${name}!`;
  } else {
    messageDiv.textContent = "Please enter a name!";
  }
});
