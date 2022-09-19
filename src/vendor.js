const { io } = require('socket.io-client');
const socket = io('ws://localhost:3000');
const Chance = require('chance');
const chance = Chance();



function CustPackage() {
  setInterval(() => {
    const company = chance.company();
    const orders = chance.integer({ min: 0, max: 1000000 });
    const name = chance.name();
    const city = chance.city();
    const state = chance.state();

    const order = {
      store: company,
      orderID: orders,
      customer: name,
      address: city + ', ' + state,

    }
    socket.emit('newOrder', order);

  }, 10000);

}

function DeliveredPackage() {
  socket.on('delivered-confirmation', payload => {
    setTimeout(() => {

      console.log(`Thank You, ${payload.customer}`);
    }, 1000);
  });


}

CustPackage();
DeliveredPackage();
