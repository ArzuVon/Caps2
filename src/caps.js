// const { isDate } = require('util/types');
const socketIo = require('socket.io');
const io = socketIo(3000);


function start() {

    io.on('connection', (client) => {
        client.on('newOrder', (payload) => {
            io.emit('orderForPickup', payload);
        });
        client.on('driver-picked-up', (payload) => {
            eventLogger(payload, 'pickUp');
            io.emit('in-transit', payload);
        });

        client.on('package-in-transit', (payload) => {
            eventLogger(payload, 'in-transit');
            io.emit('order-delivered', payload);
        });

        client.on('package-delivered', (payload) => {
            eventLogger(payload, 'delivered');
            io.emit('delivered-confirmation', payload);
        });
    });

}



function eventLogger(payload, str) {
    const date = Date.now();
    const todayTime = new Date(date).toUTCString();
    console.log(`
      EVENT: {\n
          event: "${str}",\n
          time: "${todayTime}",\n
          payload: {\n
              store: "${payload.store}", \n
              orderID: "${payload.orderID}", \n
              customer: "${payload.customer}", \n
              address: "${payload.address}", \n
          },
      }`);
}


start();
