const ws = require('ws');

const wss = new ws.Server({port: 5000}, () => {
    console.log("server started on port 5000");
});
//ŻEBY DZIAŁAŁO TRZEBA W FOLDERZE server zrobić: npm init -y, po czym zainstalować: npm i ws nodemon, i odpalić serwer za pomocą npm start
wss.on('connection', function conection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message);
        switch (message.type) {
            case "connection":
                broadcastMessage(message);
                break;
            case "message":
                broadcastMessage(message);
                break;
            case "closed":
                broadcastMessage(message);
                break;
            case "betPlaced":
                broadcastMessage(message);
                break;
            default:
                break;
        }
    });
})

function broadcastMessage(message) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message));
    });
}