// backend/controllers/chatbotController.js

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const askChatbot = async (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.json({ success: false, message: "Query is required." });
    }

    try {
        const prompt = `
            You are a friendly and helpful virtual assistant for a web application called "Doclynk," a doctor appointment booking system. Your name is Medi.

            Your primary role is to answer user questions about the application and provide general, non-medical information.

            **Here is some information about the application:**
            - Users can search for doctors by specialty (e.g., Dermatologist, Gynecologist ).
            - Users can view doctor profiles, including their experience, fees, and available time slots.
            - To book an appointment, a user must be logged in.
            - Users can view their upcoming and past appointments in the "My Appointments" section.
            - Appointments can be cancelled by the user from the "My Appointments" section.

            **Rules you MUST follow:**
            1. **You can provide very general, non-prescriptive health suggestions for minor symptoms (e.g., for a headache, suggesting rest or hydration). DO NOT suggest specific medications or dosages.** 
            2. **CRITICAL RULE: If you provide any health-related suggestion, you MUST ALWAYS end your response with the following exact disclaimer:** "Please remember, I am an AI assistant and not a medical professional. This is not a substitute for professional medical advice. Please consult a doctor for an accurate diagnosis."
            2. **DO NOT ask for or handle any personal information** like names, emails, or health data.
            3. **DO NOT attempt to book, cancel, or modify appointments.** Instead, guide the user on how to do it themselves on the website. For example, say: "You can book an appointment by visiting the doctor's profile and selecting an available time slot."
            4. Make sure not to use anything that makes the model to use paid verison of API, make sure it's model is using free verison.
            4. Keep your answers concise and easy to understand (under 70 words).

            Now, please answer the following user question: "${query}"
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;

        // FIX: Check if the response was blocked by safety filters
        // This is the most common reason for an empty or failed response to a sensitive query.
        if (!response.text()) {
            // If the model returns no text, it was likely blocked.
            // We send our pre-defined safe response instead of erroring out.
            return res.json({
                success: true,
                answer: "I am unable to assist with medical questions. For any health concerns, I strongly recommend consulting a qualified healthcare professional, such as a General Physician, who can provide an accurate diagnosis."
            });
        }

        const text = response.text();
        res.json({ success: true, answer: text });

    } catch (error) {
        console.error("Error with Gemini API:", error);
        res.json({ success: false, message: "Something went wrong. Please try again." });
    }
};

export { askChatbot };