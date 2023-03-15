#!/usr/bin/env python
import os
import openai
from flask import Flask, render_template, request, session
from flask_session import Session
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = 'session_files'

Session(app)

openai.api_key = os.getenv("OPENAI_API_KEY")

sessions = {}  # store messages list for each session

def get_response(prompt, session_id):
    if session_id not in sessions:
        sessions[session_id] = []

    messages = sessions[session_id]

    messages.append({"role": "user", "content": prompt})
    
    completion = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=messages
    )

    chat_response = completion.choices[0].message.content

    messages.append({"role": "assistant", "content": chat_response})
    if len(messages) > 50:
        messages = messages[-25:]
    
    sessions[session_id] = messages  # update messages list for this session in the dictionary

    return chat_response

@app.route("/")
def home():
    if 'tab_id' not in session:
        session['tab_id'] = os.urandom(16).hex()
    return render_template("index.html")

@app.route("/get-response", methods=["POST"])
def response():
    # get the user input that's sent under the key 'msg'
    user_input = request.json['message']
    print(user_input)

    # get the tab_id from the session
    tab_id = session['tab_id']

    prompt = user_input

    response = get_response(prompt, tab_id)

    # response in json format
    return {"response": response}

