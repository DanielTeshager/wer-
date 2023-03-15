# Chatbot Interface

This is a simple web-based chatbot interface built using Python, Flask, and OpenAI's GPT-3.5-turbo model. The chatbot can have conversations and answer various questions.

## Features

- Flask-based backend for handling chatbot requests
- Stores chat history for each session
- Responsive and interactive frontend interface
- Automatic scroll up and down functionality

## Installation

1. Clone the repository:
   `git clone https://github.com/yourusername/chatbot-interface.gitcd chatbot-interface`
2. Install the required dependencies:
   `pip install -r requirements.txt`
3. Set the OpenAI API key as an environment variable:
   `export OPENAI_API_KEY=YOUR_API_KEY`

## Running the App

1. Run the Flask app:

`python app.py`

2. Open your browser and navigate to `http://localhost:50002`.

3. Start interacting with the chatbot by typing a message into the text input and clicking "Send."

## Files and Folders

- `app.py`: Main Python script that initializes the Flask app and sets up the required routes.
- `templates/`: Contains the HTML file `index.html` that renders the chatbot interface.
- `static/`: Contains the JavaScript file `app.js` responsible for managing chat interactions on the frontend.

## Customization

You can customize the chatbot by modifying the `get_response` function in `app.py`. This function is responsible for sending the user input to the GPT-3.5-turbo model and receiving the generated response.
