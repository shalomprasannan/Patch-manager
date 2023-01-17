import poshpy # runs powershell conmmands
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
    sio.emit('hostname','mocxen100')

@sio.event
def message(arg):
    print(arg["command"])
    completed_cmd = poshpy.execute_command(arg["command"])  #run the command
    if completed_cmd.return_code == 0:  #check if it ran successfully
        data=completed_cmd.standard_out.decode('utf8').replace("'", '"')    #used to change /r/n/t to normal
        #data = json.loads(data)    #used to convert into JSON, works well only if the command had | convertto-JSON
        #json_data = json.dumps(data, indent=4, sort_keys=True) #to make it printable as JSON
        print(sio.get_sid())    #sio.sid won't give the real SID
        print(data)
        return_object={"data":data}
        return_object["user"]="shalom"
        sio.emit('output', return_object)
    else:
        print(completed_cmd.standard_error)

#connect statement should be at last
sio.connect('http://localhost:3002',{"query":"hostname:mocxen100"}) #sending query as connect arguments
#todo = {"field":"hostname", "pattern":"moc%", "output":data}
#api_url = "http://localhost:3001/api/sql"
#response = requests.post(api_url,json=todo)
#print_data=response.json()
#json_printer(print_data)