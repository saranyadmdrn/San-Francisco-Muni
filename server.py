from flask import Flask,send_file
app = Flask(__name__)

@app.route("/")
def index():
	return send_file("static/templates/index.html")

if __name__ == "__main__":
	app.run(host='0.0.0.0',port='8082')