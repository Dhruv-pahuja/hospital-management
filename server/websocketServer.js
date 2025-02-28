
const WebSocket = require('ws');
const jwt = require('jsonwebtoken');

const wss = new WebSocket.Server({ noServer: true });

let clients = [];
let queue = [];

wss.on('connection', (ws, user) => {
    clients.push({ ws, user });

    ws.send(JSON.stringify({ type: 'queue', queue }));

    ws.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.type === 'joinQueue') {
            // Add user to the queue
            queue.push(user);
            broadcastQueue();
        } else if (data.type === 'leaveQueue') {
            // Remove user from the queue
            queue = queue.filter(u => u.id !== user.id);
            broadcastQueue();
        }
    });

    ws.on('close', () => {
        clients = clients.filter(client => client.ws !== ws);
        queue = queue.filter(u => u.id !== user.id);
        broadcastQueue();
    });
});

function broadcastQueue() {
    const queueData = JSON.stringify({ type: 'queue', queue });
    clients.forEach(client => client.ws.send(queueData));
}

module.exports = { wss };
