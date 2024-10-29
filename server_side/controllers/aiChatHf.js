// Import required libraries
const { HfInference } = require('@huggingface/inference');
require('dotenv').config(); // Load environment variables from .env file

// Initialize Hugging Face inference with your API key
const hf = new HfInference("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");

console.log("Hugging Face API Key:", process.env.HUGGING_FACE_API_KEY);

// Function to interact with the GPT-2 model
const chatWithGPT2 = async (userMessage) => {
    try {
        // Define the GPT-2 model you want to use
        const model = "gpt2"; // You can also specify versions like "gpt2-medium" or "gpt2-large"

        // Send a request to the model with the user's message
        const response = await hf.textGeneration({
            model: model,
            inputs: userMessage,
            parameters: {
                max_length: 50,  // Set the maximum length of the response
                num_return_sequences: 1, // Return only one response
                temperature: 0.5, // Adjust temperature for varied responses
            }
        });

        // Extract the generated text from the response
        const botResponse = response.generated_text; // Adjust this based on the response structure

        // Return the assistant's response
        return botResponse;

    } catch (error) {
        console.error("Error generating response:", error.message);
        throw new Error("Unable to process the request");
    }
};

// Example usage
const userMessage = "Could you motivate me please, I feel down?";  // Example user input
chatWithGPT2(userMessage)
    .then(response => {
        console.log("Assistant Response:", response);
    })
    .catch(err => {
        console.error("Chat Error:", err.message);
    });
