from flask import Flask

app = Flask(__name__)
app.config.from_object('mainapp.config')

import mainapp.views