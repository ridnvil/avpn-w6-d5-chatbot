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
    image: "gemini-2.5-flash",
    audio: "gemini-2.5-flash",
    document: "gemini-2.5-flash-lite",
}

app.use(cors());
app.use(express.json());

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

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is running on port 3000");
})

