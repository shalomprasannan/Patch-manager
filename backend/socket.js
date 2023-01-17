const array=[{
    "socketID": "13223821242",
    "socket": "Hi there"
}, {
    "socketID": "Bill",
    "socket": "Hello!"
},{
    "socketID": "kide",
    "socket": "there!"
},{
    "socketID": "loefy",
    "socket": "right!"
}]

for (var key in array){

    obj = array[key]
    console.log(key)
    console.log(obj)
    for( var nam in obj){
        console.log(nam)
        console.log(obj[nam])
    }
}