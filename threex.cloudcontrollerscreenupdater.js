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
	var renderInImage	= true
	this.devicePixelRatio	= 1/10
	
	if( renderInImage === true ){
		// create domElement
		var domElement	= document.createElement('img')
		this.domElement	= domElement	
	}else{	
		var domElement	= document.createElement('canvas')
		var context	= domElement.getContext("2d")
		this.domElement	= domElement
		domElement.width	= window.innerWidth  * this.devicePixelRatio
		domElement.height	= window.innerHeight * this.devicePixelRatio
	}

	//////////////////////////////////////////////////////////////////////////////////
	//		update screenshot from renderer					//
	//////////////////////////////////////////////////////////////////////////////////
	

	cloudController.addEventListener('screenshot', function(dataUrl){
		console.log('update screenshot Length',dataUrl.length)
		// TODO maybe here draw to canvas
		// in ipad the img cant be updated when i touch the screen
		if( renderInImage === true ){
			domElement.src	= dataUrl	
		}else{	
			// Create a new image object.
			var image	= new Image();
			image.src	= dataUrl;
			image.onload	= function(){
				context.drawImage(image, 0,0, domElement.width, domElement.height)
			}
		}
	})


	//////////////////////////////////////////////////////////////////////////////////
	//		handle resolution						//
	//////////////////////////////////////////////////////////////////////////////////


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
		domElement.style.width	= window.innerWidth +'px';
		domElement.style.height	= window.innerHeight+'px';

		// console.log('resize', event)
		domElement.width	= window.innerWidth  / this.devicePixelRatio
		domElement.height	= window.innerHeight / this.devicePixelRatio

		this.sendResolution()

	}.bind(this))
}