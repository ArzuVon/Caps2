const { io } = require('socket.io-client');
const socket = io('ws://localhost:3000');


function pickUp() {

  socket.on('orderForPickup', (payload) => {
    setTimeout(() => {
      console.log(`DRIVER picked up: ${payload.orderID}`);
      socket.emit('driver-picked-up', payload);
    }, 1000);
  });
}

function inTransit() {
  socket.on('in-transit', (payload) => {
    setTimeout(() => {
      console.log(`DRIVER in Transit: ${payload.orderID}`);
      socket.emit('package-in-transit', payload);

    }, 2000);
  });
}


function delivered() {
  socket.on('order-delivered', (payload) => {
    setTimeout(() => {
      console.log(`DRIVER delivered package: ${payload.orderID}`);
      socket.emit('package-delivered', payload);

    }, 3000);
  });
}

pickUp();
inTransit();
delivered();
