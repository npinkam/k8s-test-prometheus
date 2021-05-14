'use strict';

const express = require('express');
const server = express();
const os = require('os')
const register = require('prom-client').register;

var occupancy = false;

const Gauge = require('prom-client').Gauge;
const g = new Gauge({
	name: 'occupied',
	help: 'occupancy status of the pod'
});

/* setInterval(() => {
	g.set((Math.random() > 0.7) ? 1 : 0);
}, 60000); */

// Setup server to Prometheus scrapes:
server.get('/', async (req, res) => {
	try {
		occupancy = !occupancy
		g.set(occupancy ? 1 : 0);
		res.end('hostname: ' + os.hostname() + '\n' + (await register.metrics()))
	} catch (ex) {
		res.status(500).end(ex)
	}
})
server.get('/metrics', async (req, res) => {
	try {
		res.set('Content-Type', register.contentType);
		res.end(await register.metrics());
	} catch (ex) {
		res.status(500).end(ex);
	}
});

const port = process.env.PORT || 3000;
console.log(
	`Server listening to ${port}, metrics exposed on /metrics endpoint`,
);
server.listen(port);