let faqData = [];

// Load FAQ data from Flask API when page loads
async function loadFAQ() {
  try {
    const response = await fetch("/faq");
    faqData = await response.json();
  } catch (error) {
    console.error("Error loading FAQ:", error);
  }
}
window.onload = loadFAQ;

function toggleChat() {
  const chat = document.getElementById("chatPopup");
  chat.style.display = chat.style.display === "flex" ? "none" : "flex";
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (message) {
    const chatBody = document.getElementById("chatBody");

    // Add user message
    chatBody.innerHTML += `<p><b>You:</b> ${message}</p>`;

    // Find best matching answer from faqData
    const answer = getAnswer(message);

    // Add bot reply
    chatBody.innerHTML += `<p><b>Bot:</b> ${answer}</p>`;

    chatBody.scrollTop = chatBody.scrollHeight;
    input.value = "";
  }
}

// Simple FAQ matching function
function getAnswer(userInput) {
  userInput = userInput.toLowerCase();

  for (const item of faqData) {
    for (const q of item.questions) {
      if (userInput.includes(q.toLowerCase())) {
        return item.answer;
      }
    }
  }

  return "Sorry, I don’t know the answer to that yet. Try asking something else!";
}
