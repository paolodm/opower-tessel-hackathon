// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This infrared module example transmits the
power signal sequence of an Insignia brand
television every three seconds, while also
listening for (and logging) any incoming
infrared data.
*********************************************/

var tessel = require('tessel');
var infraredlib = require('ir-attx4');
var infrared = infraredlib.use(tessel.port['A']);  

// When we're connected
infrared.on('ready', function() {
  if (!err) {
    console.log("Connected to IR!");
    // Start sending a signal every three seconds
    setInterval(function() {
      // Make a buffer of on/off durations (each duration is 16 bits)
      var powerBuffer = new Buffer('2328eed0028af9c00258f98e0258fe0c028afe0c0258f98e0258f9c0028afe0c028afe0c0258fe0c028afe0c0258fdda0258fe0c028afe0c0258fdda0258fe0c028afe0c0258fdda0258fe0c028afe0c0258fdda0258f98e0258fe0c0258fdda0258fe0c028af9c0028af9c00258f98e0258f9c00258fdda0258f9c0028af9c0028af9c00258', 'hex'); 
      // Send the signal at 38 kHz
      infrared.sendRawSignal(38, powerBuffer, function(err) {
        if (err) {
          console.log("Unable to send signal: ", err);
        } else {
          console.log("Signal sent!");
        }
      });
    }, 3000); // Every 3 seconds
  } else {
    console.log(err);
  }
});

// If we get data, print it out
infrared.on('data', function(data) {
    console.log("Received RX Data: ", data.toString('hex'));
});