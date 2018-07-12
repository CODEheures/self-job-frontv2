if (process.client) {
  window.io = require('socket.io-client')
} else {
  global['io'] = require('socket.io-client')
}
