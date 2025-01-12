from flask import Flask, request, jsonify, send_from_directory
import openai



app = Flask(__name__)


@app.route('/ask', methods=['POST'])
def ask():
    user_query = request.json.get('query')
    response = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        messages=[{'role': 'user', 'content': user_query}]
    )
    answer = response['choices'][0]['message']['content']
    return answer

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    app.run(debug=True)
