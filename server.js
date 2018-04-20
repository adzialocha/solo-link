const fs = require('fs');
const path = require('path');

const OSC = require('osc-js');
const chalk = require('chalk');
const commander = require('commander');
const express = require('express');
const ip = require('ip');

const pkg = require('./package.json');

const STATIC_FOLDER_NAME = 'dist';

const options = {
  host: '0.0.0.0',
  port: 3000,
  udpClientHost: '0.0.0.0',
  udpClientPort: 9012,
  udpServerHost: '0.0.0.0',
  udpServerPort: 9123,
  wsHost: '0.0.0.0',
  wsPort: 9789,
};

const ipAddress = ip.address();

// Parse arguments
commander
  .version(pkg.version)
  .option(
    '-h, --host <n>',
    `http server hostname, defaults to ${options.host}`
  )
  .option(
    '-p, --port <n>',
    `http server port, defaults to ${options.port}`
  )
  .option(
    '--client-host <0.0.0.0>',
    `udp client hostname, defaults to ${options.udpClientHost}`
  )
  .option(
    '--client-port <n>',
    `udp client port, defaults to ${options.udpClientPort}`
  )
  .option(
    '--server-host <0.0.0.0>',
    `udp server hostname, defaults to ${options.udpServerHost}`
  )
  .option(
    '--server-port <n>',
    `udp server port, defaults to ${options.udpServerPort}`
  )
  .option(
    '--ws-host <0.0.0.0>',
    `websocket server hostname, defaults to ${options.wsHost}`
  )
  .option(
    '--ws-port <n>',
    `websocket server port, defaults to ${options.wsPort}`
  )
  .parse(process.argv);

Object.keys(options).forEach(key => {
  if (commander[key]) {
    options[key] = commander[key];
  }
});

// Clear terminal
process.stdout.write('\x1Bc');

// Say hello!
console.log(chalk.bold.blue(pkg.name));
console.log('- - - - - - - - - - - - - - - - - - - - -');
console.log(`version: ${chalk.green(pkg.version)}`);
console.log(`ip: ${chalk.green(ipAddress)}`);
console.log('- - - - - - - - - - - - - - - - - - - - -');
console.log(chalk.bold('http'));
console.log('  server');
console.log(`    host: ${chalk.green(options.host)}`);
console.log(`    port: ${chalk.green(options.port)}`);
console.log(chalk.bold('udp'));
console.log('  client');
console.log(`    host: ${chalk.green(options.udpClientHost)}`);
console.log(`    port: ${chalk.green(options.udpClientPort)}`);
console.log('  server');
console.log(`    host: ${chalk.green(options.udpServerHost)}`);
console.log(`    port: ${chalk.green(options.udpServerPort)}`);
console.log(chalk.bold('websocket'));
console.log('  server');
console.log(`    host: ${chalk.green(options.wsHost)}`);
console.log(`    port: ${chalk.green(options.wsPort)}`);
console.log('- - - - - - - - - - - - - - - - - - - - -');

// Express http server
const app = express();

const staticPath = path.resolve(__dirname, STATIC_FOLDER_NAME);

fs.exists(staticPath, exists => {
  if (exists) {
    console.log(`${chalk.green('✔')} static folder found`);
  } else {
    console.log(`${chalk.red('✘')} static folder not found`);
  }
});

app.use(express.static(staticPath));

app.listen(options.port, options.host, () => {
  console.log(`${chalk.green('✔')} http server ready`);
});

// OSC bridge
const oscConfig = {
  udpServer: {
    host: options.udpServerHost,
    port: options.udpServerPort,
  },
  udpClient: {
    host: options.udpClientHost,
    port: options.udpClientPort,
  },
  wsServer: {
    host: options.wsHost,
    port: options.wsPort,
  },
};

const osc = new OSC({
  plugin: new OSC.BridgePlugin(oscConfig),
});

osc.on('error', error => {
  console.error(`${chalk.red('✘')} osc error: ${error.message}`);
});

osc.on('open', () => {
  console.log(`${chalk.green('✔')} osc bridge ready`);
});

osc.open();
