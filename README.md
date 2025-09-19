# Gemini AI Chatbot

This is a simple chatbot web application powered by Node.js, Express, and the Google Gemini API.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or higher recommended)
- An API key for the Google Gemini API.

## Setup and Installation

1.  **Clone the repository (or download the files):**
    ```bash
    git clone <your-repository-url>
    cd avpn-w6-d5-chatbot

    ```

2.  **Create a `.env` file:**
    Copy the `.env.example` file to a new file named `.env`.
    ```bash
    cp .env.example .env
    ```
    Then, open the `.env` file and add your Google Gemini API key:
    ```
    API_KEY=YOUR_GEMINI_API_KEY
    ```

3.  **Install dependencies:**
    Open your terminal and run the following command to install all the necessary packages from `package.json`.
    ```bash
    npm install
    ```

## Running the Application

To run the server, you can use `node` directly. However, for development, it's recommended to use `nodemon`, which automatically restarts the server whenever you make changes to the code.

1.  **Running with `nodemon`:**
    Execute the following command in your terminal. `npx` will download and run `nodemon` without you having to install it globally.
    ```bash
    npx nodemon index.js
    ```

2.  **Access the application:**
    Once the server is running, you will see a message like "Server is running on port 3000". You can then open your web browser and go to:
    [http://localhost:3000](http://localhost:3000)

The chatbot interface will be ready to use.
