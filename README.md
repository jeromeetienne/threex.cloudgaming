threex.cloudgaming
===================

It is a 
[threex](http://jeromeetienne.github.io/threex/) module 
for 
[three.js](http://threejs.org)
which provide an cloudgaming for other developpers.
Thus they can copy it and start their own extension.

You can see slides [here](http://jeromeetienne.github.io/threex.cloudgaming/slides/)

Principles
==========
Idea cheap cloud gaming for webgl: from [here](https://plus.google.com/u/0/+JeromeEtienne/posts/9EvYkc7YBgm)

* On server side you got a browser web running the game
* On this server you take regular screenshot .toDataUrl
* You send them to the player device... mobile phone, tablette whatever.
* Thus the player can see webgl rendering on any device.
* The player use touch screen as inputs
* They are then sent to the server which send them back to the browser.
* So we got the whole loop. The browser receives inputs from the player.
* And the player sees what is displayed in the browser.

This is actual cloud gaming! All that with a simple node.js server to write and some js code.
Performances are left as an exercice to the reader :)

Show Don't Tell
===============
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

```html
<script src='threex.cloudgaming.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.cloudgaming
```

How To Use It
=============

there is no real use as it is only a boilerplate for your own extension.

```javascript
var instance	= new THREEx.Sample()
```
