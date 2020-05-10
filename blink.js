var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output
var blinkInterval = setInterval(blinkLED, 250);

function blinkLED() { //Function to start blinking
	if (LED.readSync() == 0) { //Check the pin state, if the state is 0 (or off)
		LED.writeSync(1); //Set pin state 1 (turn LED on)
	} else {
		LED.writeSync(0); //Set pin state to 0 (turn LED off)
	}
}

function endBlink(){ //function to stop blinking
	clearInterval(blinkInterval); // Stop blinking intervals
	LED.writeSync(0); // Turn LED off
	LED.unexport(); // Unexport GPIO to free resourses
}

setTimeout(endBlink, 5000); //Stop blinking after 5 seconds
