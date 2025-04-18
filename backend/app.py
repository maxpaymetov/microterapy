from flask import Flask, jsonify, request
import json
import os

app = Flask(__name__)

# Пути к файлам
LEADERBOARD_PATH = 'backend/leaderboard.json'
ENDINGS_PATH = 'data/endings.json'

# Загрузка данных leaderboard
def load_leaderboard():
    if not os.path.exists(LEADERBOARD_PATH):
        return []
    with open(LEADERBOARD_PATH, 'r') as f:
        return json.load(f)

# Сохранение leaderboard
def save_leaderboard(data):
    with open(LEADERBOARD_PATH, 'w') as f:
        json.dump(data, f, indent=4)

# Получить leaderboard
@app.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    return jsonify(load_leaderboard())

# Добавить результат игрока
@app.route('/leaderboard', methods=['POST'])
def add_result():
    data = request.json
    leaderboard = load_leaderboard()
    leaderboard.append({
        'name': data['name'],
        'ending': data['ending'],
        'kills': data['kills']
    })
    save_leaderboard(leaderboard)
    return jsonify({'message': 'Result saved'}), 201

# Получить концовки
@app.route('/endings', methods=['GET'])
def get_endings():
    with open(ENDINGS_PATH, 'r') as f:
        endings = json.load(f)
    return jsonify(endings)

if __name__ == '__main__':
    app.run(debug=True)
