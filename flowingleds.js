var Gpio = require('onoff').Gpio; // include onoff to interact with the GPIO
var LED20 = new Gpio(20, 'out'), //use declare variables for all the GPIO output pins
	LED17 = new Gpio(17, 'out'),
	LED27 = new Gpio(27, 'out'),
	LED22 = new Gpio(22, 'out'),
	LED18 = new Gpio(18, 'out'),
	LED23 = new Gpio(23, 'out'),
	LED24 = new Gpio(24, 'out'),
	LED25 = new Gpio(25, 'out');

//Put all the LED variables in an array
var leds = [LED20, LED17, LED27, LED22, LED18, LED23, LED24, LED25];
var indexCount = 0;
dir = "up"; // variable for flowing direction

var flowInterval = setInterval(flowingLeds, 100); //run the flowing leds function every 100ms

function flowingLeds() { //function for flowing Leds
	leds.forEach(function(currentValue) { //for each item in array
		currentValue.writeSync(0); // turn off LED
	});
	if (indexCount == 0) dir = "up"; //set flow direction to "up" if the count reaches zero
	if (indexCount >= leds.length) dir = "down"; //set flow direction to "down" if the count reaches 7
	if (dir == "down") indexCount--; // count downwards if direction is down
	leds[indexCount].writeSync(1); // turn on LED  that where array index matches count
	if (dir == "up") indexCount++ //count upwards if direction is up
};

function unexportOnClose() { //function to run when exiting program
	clearInterval(flowInterval); //stop flow interval
	leds.forEach(function(currentValue) { //for each LED
		currentValue.writeSync(0); // turn off LED
		currentValue.unexport(); //unexport GPIO
	});
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using controlC
