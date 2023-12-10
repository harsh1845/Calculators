from flask import render_template
from app import app

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/basic_calc')
def basic_calc():
    return render_template('basic_calc.html')

@app.route('/equation_solver')
def equation_solver():
    return render_template('equation_solver.html')
