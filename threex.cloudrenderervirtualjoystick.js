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
THREEx.CloudRendererVirtualJoystick	= function(cloudRenderer){

	this.inputs	= {}

	cloudRenderer.addEventListener('joystick', function(inputs){
		this.inputs	= inputs
	}.bind(this))

}