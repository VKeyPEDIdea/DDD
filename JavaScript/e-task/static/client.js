'use strict';

const transport = 'http';
const host = '127.0.0.1';
const apiPort = '8001';
const path = `${transport}://${host}:${apiPort}`;

let socket = null;

const scaffold = (transport, path, structure) => {
  const api = {};
  const services = Object.keys(structure);
  for (const serviceName of services) {
    api[serviceName] = {};
    const service = structure[serviceName];
    const methods = Object.keys(service);
    for (const methodName of methods) {
      if (transport === 'ws') {
        socket = new WebSocket(path);
        api[serviceName][methodName] = (...args) => new Promise((resolve) => {
          const packet = { name: serviceName, method: methodName, args };
          socket.send(JSON.stringify(packet));
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            resolve(data);
          };
        });
      } else if (transport === 'http') {
        api[serviceName][methodName] = (...args) => new Promise((resolve, reject) => {
          const url = `${path}/${serviceName}/${methodName}/${args}`;
          fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(args),
          }).then(res => {
            const { status } = res;
            if (status !== 200) {
              reject(new Error(`Status code: ${status}`));
              return;
            }
            resolve(res.json());
          });
        })
      }
    }
  }
  return api;
};

const api = scaffold(transport, path, {
  user: {
    create: ['record'],
    read: ['id'],
    update: ['id', 'record'],
    delete: ['id'],
    find: ['mask'],
  },
  country: {
    read: ['id'],
    delete: ['id'],
    find: ['mask'],
  },
});

if (socket) {
  socket.addEventListener('open', async () => {
    const data = await api.user.read(3);
    console.dir(...data);
  });
} else {
  api.user.read(3).then(data => {
    console.dir(...data);
  });
}
