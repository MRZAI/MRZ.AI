// Language configuration
const language = {
  english: {
    greeting: "How can I help you today?",
    placeholder: "Ask me anything...",
    suggestions: [
      "Ask me anything you want, I will answer",
      "How can I level up my web development expertise in 2025?",
      "Suggest some useful tools for debugging JavaScript code",
      "Create a React JS component for the simple todo list app"
    ],
    responses: {
      loading: "Just a sec...",
      stopped: "Response generation stopped.",
      error: "An error occurred. Please try again."
    }
  },
  sinhala: {
    greeting: "ආයුබෝවන්! අද මට ඔබට උදව් කළ හැක්කේ කෙසේද?",
    placeholder: "මට ඕනෑම දෙයක් අහන්න...",
    suggestions: [
      "මට ඔබ කැමති ඕනෑම දෙයක් ඇසිය හැකිය, මම පිළිතුරු දෙන්නම්",
      "2025 දී වෙබ් සංවර්ධන කුසලතා වැඩිදියුණු කරගන්නේ කෙසේද?",
      "JavaScript කේතය debug කිරීම සඳහා ප්‍රයෝජනවත් මෙවලම් යෝජනා කරන්න",
      "සරල කරන ලැයිස්තු යෙදුමක් සඳහා React JS සංරචකයක් සාදන්න"
    ],
    responses: {
      loading: "පැය ටිකක් ඉන්න...",
      stopped: "ප්‍රතිචාර ජනනය නවතා ඇත",
      error: "දෝෂයක් ඇතිවිය. කරුණාකර නැවත උත්සාහ කරන්න."
    }
  }
};

let currentLang = 'sinhala';

// DOM Elements
const container = document.querySelector(".container");
const chatsContainer = document.querySelector(".chats-container");
const promptForm = document.querySelector(".prompt-form");
const promptInput = document.querySelector("#prompt-input");
const fileInput = document.querySelector("#file-input");
const fileUploadWrapper = document.querySelector(".file-upload-wrapper");
const themeToggleBtn = document.querySelector("#theme-toggle-btn");
const sinhalaBtn = document.querySelector("#sinhala-btn");
const englishBtn = document.querySelector("#english-btn");
const greetingElement = document.querySelector("#greeting");

// API Setup
const API_KEY = "AIzaSyC94xv7N1QH1lt4ebsgdxXV5PCYOXEyNYo";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
let controller, typingInterval;
const chatHistory = [];
const userData = { message: "", file: {} };

// Initialize language
function initLanguage() {
  updateLanguageUI();
  sinhalaBtn.addEventListener('click', () => switchLanguage('sinhala'));
  englishBtn.addEventListener('click', () => switchLanguage('english'));
}

function switchLanguage(lang) {
  currentLang = lang;
  updateLanguageUI();
}

function updateLanguageUI() {
  // Update buttons
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`#${currentLang}-btn`).classList.add('active');
  
  // Update UI texts
  greetingElement.textContent = language[currentLang].greeting;
  promptInput.placeholder = language[currentLang].placeholder;
  
  // Update suggestions
  const suggestionItems = document.querySelectorAll('.suggestions-item .text');
  language[currentLang].suggestions.forEach((text, i) => {
    suggestionItems[i].textContent = text;
  });
}

// Initialize theme
function initTheme() {
  const isLightTheme = localStorage.getItem("themeColor") === "light_mode";
  document.body.classList.toggle("light-theme", isLightTheme);
  themeToggleBtn.textContent = isLightTheme ? "dark_mode" : "light_mode";
  
  themeToggleBtn.addEventListener("click", () => {
    const isLightTheme = document.body.classList.toggle("light-theme");
    localStorage.setItem("themeColor", isLightTheme ? "light_mode" : "dark_mode");
    themeToggleBtn.textContent = isLightTheme ? "dark_mode" : "light_mode";
  });
}

// Create message element with language support
const createMessageElement = (content, isBot = true) => {
  const div = document.createElement("div");
  div.classList.add("message", isBot ? "bot-message" : "user-message");
  
  if (isBot) {
    div.innerHTML = `
      <img class="avatar" src="gemini.svg" />
      <p class="message-text ${currentLang === 'sinhala' ? 'sinhala-text' : ''}">${content}</p>
    `;
  } else {
    div.innerHTML = `
      <p class="message-text">${content}</p>
      ${userData.file.data ? 
        (userData.file.isImage ? 
          `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="img-attachment" />` : 
          `<p class="file-attachment"><span class="material-symbols-rounded">description</span>${userData.file.fileName}</p>`) : 
        ""}
    `;
  }
  
  return div;
};

// Rest of your existing JavaScript code (typingEffect, generateResponse, handleFormSubmit, etc.)
// with modifications to use language.responses[currentLang].loading, etc.

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  
  // Rest of your event listeners
  promptForm.addEventListener("submit", handleFormSubmit);
  // ... other event listeners ...
});

// Note: You'll need to modify your existing functions to use the language configuration
// For example, replace hardcoded strings with language[currentLang].responses.loading etc.
