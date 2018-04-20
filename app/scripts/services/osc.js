// import OSC from 'osc-js';

// const osc = new OSC();

// osc.on('open', () => {
//   console.log('open');

//   setInterval(() => {
//     osc.send(new OSC.Message('/status'));
//   }, 1000);
// });

// osc.on('error', error => {
//   console.log(error);
// });

// osc.on('/status', message => {
//   console.log(message.args);
// });

// osc.open({
//   host: 'localhost',
//   port: 9789,
// });

// window.onbeforeunload = () => {
//   osc.close();
// };
