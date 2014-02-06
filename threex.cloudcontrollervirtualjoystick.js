/**
 * declare THREEx namespace
 * @type {[type]}
 */
var THREEx	= THREEx	|| {};

/**
 * THREEx extension
 * 
 * @constructor
 */
THREEx.CloudControllerVirtualJoystick	= function(cloudController){

	//////////////////////////////////////////////////////////////////////////////////
	//		handle joystick input						//
	//////////////////////////////////////////////////////////////////////////////////
	
	var joystick	= new VirtualJoystick({
		container	: document.querySelector('body'),
		mouseSupport	: true,
	});

	var lastInputs	= {}
	this.sendIfChanged	= function(){
		// get current inputs
		var inputs	= {}
		inputs.right	= joystick.right()
		inputs.up	= joystick.up()
		inputs.left	= joystick.left()
		inputs.down	= joystick.down()
		
		// see if a change occured
		var hasChanged	= lastInputs.right !== inputs.right 
			|| lastInputs.up	!== inputs.up
			|| lastInputs.left	!== inputs.left
			|| lastInputs.down	!== inputs.down
		lastInputs	= inputs
		// if no change occured, return now
		if( hasChanged === false )	return
			
		// send change to other
		cloudController.sendMessage({
			type	: 'joystick',
			data	: inputs
		})		
	}
}