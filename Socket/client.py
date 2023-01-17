import socketio
sio = socketio.Client()



@sio.event
def connect():
    print('Connected!')
    sio.emit('HandShake', {"clientdata":"can you see me?"})

sio.connect('http://localhost:3005')

"""@sio.event
def message(data):
    print('HandShake', data)
"""