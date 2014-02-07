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
THREEx.CloudController 	= function(){
	// add microevent
	THREEx.CloudController.MicroeventMixin(this)
	// basic connection
	var socket = io.connect()
	this.socket= socket


	socket.on('echoMessage', function(data){
		if( data.type === 'screenshot' ){
			// console.dir(data)
			var dataUrl	= data.data.url
			this.dispatchEvent('screenshot', dataUrl)
		}
	}.bind(this))

	this.sendMessage	= function(message){
		socket.emit('echoMessage', message)
	}
}


THREEx.CloudController.MicroeventMixin	= function(destObj){
	destObj.addEventListener	= function(event, fct){
		if(this._events === undefined) 	this._events	= {};
		this._events[event] = this._events[event]	|| [];
		this._events[event].push(fct);
		return fct;
	};
	destObj.removeEventListener	= function(event, fct){
		if(this._events === undefined) 	this._events	= {};
		if( event in this._events === false  )	return;
		this._events[event].splice(this._events[event].indexOf(fct), 1);
	};
	destObj.dispatchEvent		= function(event /* , args... */){
		if(this._events === undefined) 	this._events	= {};
		if( this._events[event] === undefined )	return;
		var tmpArray	= this._events[event].slice(); 
		for(var i = 0; i < tmpArray.length; i++){
			var result	= tmpArray[i].apply(this, Array.prototype.slice.call(arguments, 1))
			if( result !== undefined )	return result;
		}
		return undefined;
	};
	return destObj;
};
