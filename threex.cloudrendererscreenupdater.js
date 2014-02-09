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
THREEx.CloudRendererScreenUpdater	= function(cloudRenderer, renderer, camera){
	cloudRenderer.addEventListener('controllerResolution', function(size){
		console.log('sendControllerResolution', size)

		renderer.setSize( size.width, size.height )

		camera.aspect	= size.width/size.height
		camera.updateProjectionMatrix()
	})

	//////////////////////////////////////////////////////////////////////////////////
	//		send Screenshot if changed					//
	//////////////////////////////////////////////////////////////////////////////////
	
	var lastDataUrl	= ''
	var maxFps	= 20
	var lastDate	= null
	this.sendScreenshotIfChanged	= function(){
		var present	= Date.now()/1000
		if( lastDate !== null && present - lastDate < 1/maxFps )	return;
		lastDate	= present

		var dataUrl	= renderer.domElement.toDataURL("image/webp");
		
		
		// see if the screenshot changed
		var hasChanged	= dataUrl !== lastDataUrl ? true : false
		lastDataUrl	= dataUrl
		// if no change, return now
		if( hasChanged === false )	return

		cloudRenderer.sendMessage({
			type	: 'screenshot',
			data	: {
				url	: dataUrl
			}
		})
	}	
}