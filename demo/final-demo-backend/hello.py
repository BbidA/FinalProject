from flask import Flask, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/gd', methods=['POST'])
@cross_origin()
def hello_word():
    # Get request parameters
    code = request.form['code']
    start_x, start_y = float(request.form['x']), float(request.form['y'])
    target_func = request.form['targetFunc']

    # Get target function
    if target_func == 'quadraticFunc1':
        func = QuadraticFunction1
    else:
        func = QuadraticFunction1

    # Add context for the code
    local_envs, global_envs = {}, {}
    compiled_code = compile(code, 'gd_code', 'exec')
    exec(compiled_code, global_envs, local_envs)

    # noinspection PyUnboundLocalVariable
    result = local_envs['gradient_descent'](start_x, start_y, func)
    print(result)

    return {"result": result}


class QuadraticFunction1:
    @staticmethod
    def func(x):
        return x ** 2

    @staticmethod
    def df_func(x):
        return x * 2


'''
def gradient_descent(start_x, start_y, target_func, step_size=0.001, stop_condition=0.001):
    curr_x, curr_y = start_x, start_y
    last_step = float('inf')
    points = []
    while last_step > stop_condition:
        # Calculate current step and do a descent
        delta = -target_func.df_func(curr_x) * step_size
        curr_x += delta
        curr_y = target_func.func(curr_x)
        points.append([curr_x, curr_y])

        last_step = abs(delta)

    return points
'''
