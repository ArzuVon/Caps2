// const { isDate } = require('util/types');
const socketIo = require('socket.io');
const io = socketIo(3000);

const vendors = io.of('./vendor');
const drivers = io.of('./driver');


io.on("connection", (client) => {

    vendor.on('connection', (client) => {
        client.on('newOrder', (payload) => {
            console.log('SockettttttId:', client.id);
            console.log('create a new room', payload.store);
            client.join(payload.store);
            eventLogger(payload, 'pickUp');
            driver.emit('orderForDriver', payload);
        });
    });
    
    driver.on('connection', (client) => {
        client.on('pickUp', (payload) => {
            client.emit('inTransit', payload);
        });
        // eventLogger(payload, 'pickUp');
    
        client.on('Driver-inTransit', (payload) => {
            eventLogger(payload, 'inTransit');
            client.emit('Driver-delivered', payload);
        });
    
        client.on('delivered', (payload) => {
            setTimeout(() => {
                eventLogger(payload, 'delivered');
            }, 3000);
            vendor.emit('delivered-confirmation', payload);
        });
    });
    

})

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
