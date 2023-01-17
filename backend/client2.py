import poshpy
import json
#import requests
import socketio
sio = socketio.Client()

"""s=""

def json_printer(data):
    s = json.dumps(data, indent=4, sort_keys=True)
    print(s)
    return
completed_cmd = poshpy.execute_command("get-service|convertto-json")
if completed_cmd.return_code == 0:
    data=completed_cmd.standard_out.decode('utf8').replace("'", '"')
    data = json.loads(data)
    e = json.dumps(data, indent=4, sort_keys=True)
    print(e)
else:
    print(completed_cmd.standard_error)"""


@sio.event
def connect():
    print("I'm connected!")
    sio.emit('hostname','mercury102')
    """while True:
        print("I'm connected!")
        sio.emit('data', {"clientdata":"can you see me?"})
        sio.sleep(3)"""

@sio.event
def message(arg):
    print(arg["command"])
    completed_cmd = poshpy.execute_command(arg["command"])
    if completed_cmd.return_code == 0:
        data=completed_cmd.standard_out.decode('utf8').replace("'", '"')
        #data = json.loads(data)
        #json_data = json.dumps(data, indent=4, sort_keys=True)
        print(sio.get_sid())
        print(data)
        return_object={"data":data}
        return_object["user"]="prasannan"
        sio.emit('output', return_object)
    else:
        print(completed_cmd.standard_error)


#todo = {"field":"hostname", "pattern":"moc%", "output":data}
#api_url = "http://localhost:3001/api/sql"
#response = requests.post(api_url,json=todo)
#print_data=response.json()
#json_printer(print_data)
sio.connect('http://localhost:3002',{"query":"hostname:mercury102"})