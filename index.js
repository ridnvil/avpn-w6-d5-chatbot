import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import express, { text } from "express";
import multer from "multer";
import cors from "cors";

const app = express();
const upload = multer();
const ai = new GoogleGenAI({});

const geminiModel = {
    text: "gemini-2.5-flash-lite",
    chat: "gemini-2.5-pro",
    image: "gemini-2.5-flash",
    audio: "gemini-2.5-flash",
    document: "gemini-2.5-flash-lite",
}

app.use(cors());
app.use(express.json());
app.use(express.static('static'));

app.post("/generate-text", async (req, res) => {
    const { message } = req.body || {};

    if (!message || typeof message !== "string") {
        return res.status(400).send("No message provided");
    }

    const response = await ai.models.generateContent({
        model: geminiModel.text,
        contents: message,
    })

    return res.status(200).json({
        replay: response.text
    });
})

app.post("/chat", async (req, res) => {
    const { conversation } = req.body;

    if (!conversation || !Array.isArray(conversation)) {
        return res.status(400).json({
            success: false,
            data: null,
            message: "No conversation provided"
        });
    }

    let dataIsInvalid = false;
    conversation.forEach(msg => {
        if (!msg) {
            dataIsInvalid = true;
        } else if (typeof msg !== "object") {
            dataIsInvalid = true;
        } else if (!msg.role || !msg.content) {
            dataIsInvalid = true;
        }
    });

    const contents = conversation.map(item => {
        return {
            role: item.role,
            parts: [
                { text: item.message }
            ]
        }
    });

    try {
        const aiResponse = await ai.models.generateContent({
            model: geminiModel.chat,
            contents
        })

        return res.status(200).json({
            success: true,
            data: aiResponse.text,
            message: "AI response generated"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: error.message
        });
    }
    
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is running on port 3000");
})

