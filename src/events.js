'use strict';

const socketIo = require('socket.io');
const io = socketIo(3500);

module.exports = io;