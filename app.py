from flask import Flask, render_template, request
import random
app = Flask(__name__)

@app.route("/")
def hello():
  array = [1,2,3,4,5,6,7]
  return render_template('index.html', var=random.choice(array))

@app.route('/submit')
def submit():
  name =  request.args["name"]
  email =  request.args["email"]
  #open append txt file
  with open("users.txt","a") as myfile:
      myfile.write(name + " " + email + "\n")
  return 'Thank you for submitting your username and email.'


if __name__ == "__main__":
  app.run(debug=True)

