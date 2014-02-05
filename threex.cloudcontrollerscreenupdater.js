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
THREEx.CloudControllerScreenUpdater	= function(cloudController){
	// create domElement
	var domElement	= document.createElement('img')
	this.domElement	= domElement
	domElement.id	= 'remoteImage'
	
	//////////////////////////////////////////////////////////////////////////////////
	//		update screenshot from renderer					//
	//////////////////////////////////////////////////////////////////////////////////
	

	cloudController.addEventListener('screenshot', function(dataUrl){
		console.log('update screenshot')
		// TODO maybe here draw to canvas
		// in ipad the img cant be updated when i touch the screen
		domElement.src	= dataUrl
	})


	//////////////////////////////////////////////////////////////////////////////////
	//		handle resolution						//
	//////////////////////////////////////////////////////////////////////////////////

	this.devicePixelRatio	= 1/4
	domElement.style.width	= window.innerWidth +'px';
	domElement.style.height	= window.innerHeight+'px';

	this.sendResolution	= function(){
		var data	= {
			width	: window.innerWidth * this.devicePixelRatio,
			height	: window.innerHeight* this.devicePixelRatio,
		}
		// console.log('sendControllerResolution', data)
		cloudController.sendMessage({
			type	: 'controllerResolution',
			data	: data
		})
	}
	window.addEventListener('resize', function(event){
		// console.log('resize', event)
		this.sendResolution()
	}.bind(this))
}