threex.cloudgaming
===================

It is a 
[threex](http://jeromeetienne.github.io/threex/) module 
for 
[three.js](http://threejs.org)
which provide an 2-cents cloudgaming solution for webgl games.
The implementation is simple. 
It is easy to use too. 
You can include it in your game in a snap.
The whole thing is a little more 300lines at the moment.

I did a minigame to test it. 
It worked ok at 20fps over wifi. 
Performances may fit your use case or not.
Bench it and see.
You can see slides [here](http://jeromeetienne.github.io/threex.cloudgaming/slides/)

Show Don't Tell
===============
There are no online version of this plugin. Cloud Gaming got server costs beyond the reach of this opensource project :)
You just have to clone this repository, and do ```node server.js```, then goto [bothsinglepage](http://127.0.0.1:8000/examples/bothsinglepage.html) examples.

* [examples/remotecontroller.html](http://jeromeetienne.github.io/threex.cloudgaming/examples/remotecontroller.html)
\[[view source](https://github.com/jeromeetienne/threex.cloudgaming/blob/master/examples/remotecontroller.html)\] :
It shows an example of remote controller
* [examples/remoterenderer.html](http://jeromeetienne.github.io/threex.cloudgaming/examples/remoterenderer.html)
\[[view source](https://github.com/jeromeetienne/threex.cloudgaming/blob/master/examples/remoterenderer.html)\] :
It shows an example of remote renderer
* [examples/bothsinglepage.html](http://jeromeetienne.github.io/threex.cloudgaming/examples/bothsinglepage.html)
\[[view source](https://github.com/jeromeetienne/threex.cloudgaming/blob/master/examples/bothsinglepage.html)\] :
It shows an example of remote renderer and a remote controller on the same page.
This is is usefull to debug


How To Install It
=================

You can install it via script tag

```
 <script src='threex.cloudgamingrenderer.js'></script>
 <script src='threex.cloudgamingcontroller.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```
bower install threex.cloudgaming
```

# How To Use It

```threex.cloudgaming``` got 3 parts:

* **renderer :** the brower doing the webgl rendering server-side, the one actually running the game
* **controller :** the player device which controls the game.
* **server :** in node.js for renderer and controller to communicate
there is no real use as it is only a boilerplate for your own extension.

## Launch Server

To run the server, just do the following

```
node app.js
```

It wait on [http://127.0.0.1:8000](http://127.0.0.1:8000)
It is a simple echo server. 
It lets *renderer* and *controller* communicate together.

## Use threex.cloudgaming Core

It ensures the communication between renderer and controller via the server.

**On Renderer**, first, include the source [threex.cloudrenderer.js](https://github.com/jeromeetienne/threex.cloudgaming/blob/master/threex.cloudrenderer.js) in your page. Then create one.

```
var cloudRenderer	= new THREEx.CloudRenderer()
```

**On Controller**, first, include the source [threex.cloudcontroller.js](https://github.com/jeromeetienne/threex.cloudgaming/blob/master/threex.cloudcontroller.js) in your page. Then create one.

```
var cloudController	= new THREEx.CloudController()
```

## Use Screen Updaters

It handles the screen refreshing. When the renderer got a new
screen to share, it sends it to the remote controller via the server. Additionnaly the controller notifies the renderer when its screen resolution changes.

**On Renderer**, first, include the source [threex.cloudrendererscreenupdater.js](https://github.com/jeromeetienne/threex.cloudgaming/blob/master/threex.cloudrendererscreenupdater.js) in your page. Then create one.

```
var screenUpdater	= new THREEx.CloudRendererScreenUpdater(cloudRenderer, renderer, camera)
```

Then start sending screenshots to the remote controller when you think it is necessary.

```
screenUpdater.sendScreenshotIfChanged()
```

**On Controller**, first, include the source [threex.cloudcontrollerscreenupdater.js](https://github.com/jeromeetienne/threex.cloudgaming/blob/master/threex.cloudcontrollerscreenupdater.js) in your page. Then create one.

```
var screenUpdater	= new THREEx.CloudControllerScreenUpdater(cloudController)
// append the domElement from the renderer to this page
document.body.appendChild(screenUpdater.domElement)
```


## Use Virtual Joystick
It is necessary to read inputs on the player devices, e.g. does the player want to go up or down etc… 
For that we use [virtualjoystick.js](https://github.com/jeromeetienne/virtualjoystick.js), a virtual joystick library to emulate a joystick on touch screen in javascript.
You can read more about this library in ["Let’s Make a 3D Game: Virtual Joystick"](http://learningthreejs.com/blog/2011/12/26/let-s-make-a-3d-game-virtual-joystick/) post on [learning three.js blog](http://learningthreejs.com).

**On Controller**, first, include the source [threex.cloudcontrollerrvirtualjoystick.js](https://github.com/jeromeetienne/threex.cloudgaming/blob/master/threex.cloudcontrollervirtualjoystick.js) in your page. Then create one.

```
var cloudVirtualJoystick	= new THREEx.CloudControllerVirtualJoystick(cloudController)
```

And then send results when you feel it is necessary. Say in a ```setInterval```.

```
setInterval(function(){
   cloudVirtualJoystick.sendIfChanged()
}, 1000*1/20)
```

**On Renderer**, first, include the source [threex.cloudrenderervirtualjoystick.js](https://github.com/jeromeetienne/threex.cloudgaming/blob/master/threex.cloudrenderervirtualjoystick.js) in your page. Then create one.

```
var cloudJoystick	= new THREEx.CloudRendererVirtualJoystick(cloudRenderer)
```

It will keep ```cloudJoystick.inputs``` updated with remote controllers values.

```
if( cloudJoystick.inputs.left === true )  console.log('go left')
if( cloudJoystick.inputs.right === true ) console.log('go right')
if( cloudJoystick.inputs.up === true )    console.log('go up')
if( cloudJoystick.inputs.down === true )  console.log('go down')
```



