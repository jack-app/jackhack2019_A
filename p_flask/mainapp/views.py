# ライブラリのインポート
from flask import Flask, render_template, request, redirect, url_for

from mainapp import app

# app = Flask(__name__)

# ルーティング
@app.route('/')
def input():
    return render_template('input.html')

@app.route('/result', methods=['GET', 'POST'])
def result():
    if request.method == 'POST':
        message = request.form['msg']
        return render_template('result.html', msg = message)
    else:
        return render_template('input.html')

@app.route('/trush', methods=['GET', 'POST'])
def trush():
    if request.method == 'POST':
        return render_template('trush.html')
    else:
        return render_template('input.html')

# if __name__ == '__main__':
#    app.run()