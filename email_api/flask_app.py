
# A very simple Flask Hello World app for you to get started with...

from flask import Flask, render_template
from flask_mail import Mail, Message
from flask import request
import json
from json2table import convert
from flask_cors import CORS

app = Flask(__name__, template_folder='/home/driversed/mysite/')
CORS(app, resources={r"/*": {"origins": "*"}})
mail = Mail(app)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
#MAIL_USERNAME and MAIL_PASSWORD are fake
app.config['MAIL_USERNAME'] = 'notanemail@gmail.com'
app.config['MAIL_PASSWORD'] = 'notapassword'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail = Mail(app)


@app.route('/')
def hello_world():
    return 'Hello from Flask!'

@app.route('/api_1', methods=['POST', 'GET'])
def send_email():
    data = request.get_json()

    recipient = data['r']
    hours_day = data['hd']
    hours_night = data['hn']
    data_table = data['table']
    msg = Message('Driving Log', sender='notanemail@gmail.com', recipients=[recipient])
    msg.html = render_template('email.html', hours_day=hours_day, hours_night=hours_night, data_table=data_table)
    mail.send(msg)

    return "Sent"

@app.route('/api_2', methods=['POST', 'GET'])
def get_data():
    data = request.get_json()
    build_direction = "LEFT_TO_RIGHT"
    table_attributes = {"style" : "width:100%"}
    global data_table
    data_table = convert(data, build_direction=build_direction, table_attributes=table_attributes)


