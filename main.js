const readline = require("readline");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const apiKey = "YOUR_API_KEY";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};
const getUserInput = (promptText) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(promptText, (input) => {
      rl.close();
      resolve(input);
    });
  });
};
async function run() {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });
  console.log("Type your questions below. Type 'exit' to quit.");
  while (true) {
    const userInput = await getUserInput("> ");
    if (userInput.toLowerCase() === "exit") {
      console.log("Exiting chat. Goodbye!");
      break;
    }
    try {
      console.log("Processing input:", userInput);
      const result = await chatSession.sendMessage(userInput);
      console.log("Response:", result.response.text());
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }
}
run();
