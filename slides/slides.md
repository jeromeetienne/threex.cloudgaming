title: Cheap Cloud Gaming for THREE.js
author:
  name: "Jerome Etienne"
  twitter: "@jerome_etienne"
  url: "http://jetienne.com"
output: index.html
--

<base target='_blank'/>
<style>pre { background: lightgrey; font-size: 100%;}</style>

# Cloud Gaming for THREE.js

## [Jerome Etienne](http://twitter.com/jerome_etienne)

--

### What are we gonna talk about ?

* Possible solution for cloud gaming
* apply to any webgl games
  * not only three.js ones
* cheap idea for cloud gaming for webgl

  
**status** : experimental, naive but working surprisingly well!

--

### Demo Time

Youtube video [here](http://www.youtube.com/watch?v=yTSXLyg1uu8)

  iframe width="560" height="315" src="//www.youtube.com/embed/yTSXLyg1uu8" frameborder="0" allowfullscreen></iframe>

--

### What is Cloud Gaming ?

* [wikipedia](http://en.wikipedia.org/wiki/Cloud_gaming) definition
* It is new. no widely accepted definition
* usually implies **render on server** feature

Rougly…

```
Trying to run a game written for device A
on a device B, typically dumber than A.
```

--

### What is Our Use Case

Let's clear the dust a bit...

* we run a webgl game in browser
* player device is a non-webgl mobile phone

**Goal** : to make that game playable on your player device

--

### Our Goal

* To display a webgl game 
* on a non-webgl player device

**Simple Enougth...**

--

# Early Data

--

### Early data - rendering

* So we got to render our game in server
* it will be **rendered via a web browser**
* seems natural choise to render webgl

--

### Early data - architechture

3 parts 

* **a renderer :** the brower running our game
* **a controller :** used by players to access our game
* **a server :** ensures the communication between both

--

### Early data - networking

* networking done thru websocket
* no webrtc at the moment
* websocket is available a lot more than webrtc
* especially on mobile phone, our usecase.

--

### Early data - Software

* server in node.js
* websocket are trivial with socket.io
* little js library in renderer, and another in controller
* only common technology here

**implementation is easy**

--

# Principles Of Operations

--

### Principles Of Operations / Server


* a renderer browser web running the game
* take regular screenshots with [.toDataUrl()](https://developer.mozilla.org/en/docs/Web/API/HTMLCanvasElement#Methods)
* Send them to the player device via echo server 
  * mobile phone, tablette whatever.

--

### Principles Of Operations / Player

* player can see webgl rendering on any device
* player uses touch screen as inputs
* inputs are then sent to the server 
* server send them back to the renderer.

--

### Principles Of Operations / Output

* browser receives inputs from the player.
* player sees what is displayed in the browser.

**we got the whole loop**

--

### Principles Of Operations / Results

* this is actual cloud gaming! 
* Simple implementation
* Less than 24h to write!
* Performances? left as an exercice to the reader :)
  * ok we talk about it at the end

--

# Separator

--

### Network Performance

3 areas affect network performances

* how long if the network path
* how much data you send thru this path
* what is the latency of this path

--

### Possible Improvements

send data directly from the renderer to the controller

* avoid one hop in the network path
* may improve latency

--

### Possible Improvements

Using WebRTC ?

* webrtc allows p2p communication on spec.
  * is it on the remote controller of your usecase?
* Quite young feature tho
  * its availability and reliability should be tested
* webrtc allows to screen share
  * maybe it could stream our rendering efficiently
  * with a nice compressed video format

--

### Possible Improvements

send smaller data

* send image thru a more compressed format
  * tried png/jpg/webp
  * webp is smaller
* send image thru a movie format

--

# Separator

--

### Could that be the same game ?

difference of inputs

* desktop inputs
  * large screen, keyboard and mouse
* mobile phone inputs
  * small screen and touch screen
  * no keyboard, no mouse

--

### Could that be the same game ?

Difference of network capabilities

* mobile network slower than desktop network
* mobile controller requires more from network
  * to send player inputs to game renderer
  * to receive rendering display from server

--

### Could that be the same game ?

Difference of network latency

* on desktop, no noticable latency
* on mobile, it has more latency by design

--

### Could that be the same game ?

**Nope**

* big network requirement out of our controls
  * mobile network capabilities
* issues in our controls are far from simple either

=> games needs to be adapated to controller capabilities


--

# Separator

--

### Initial Thoughts

* as game must be adapted
* as fps are very costly on remote controller
* how can you adapt your game

--

* reduce the need for fps
* it is all between how dumb is the remote controller
* depending on its capability you can run part of the game there
* it doesnt have to be fully dumb
* part of the game run on the server, part run on the controller
* give examples

--

### A Remarquable Sweat Spot 

* if rendered image doesnt change, it can be cached
  * on server and/or controller
  * if cache on player device, it enabled offline playing!
* for navigation, prefer fixed point
  * the player go from one point to another
  * make caching more easy
* Combine both and you can navigate your 3d world like that
  * very similar to [google street view](https://www.google.com/maps/views/streetview)

--

# Separator

--

# Implementation

--

### Status

Working and Available

* published on [github](https://github.com/jeromeetienne/threex.cloudgaming) 
* as a [threex](http://jeromeetienne.github.io/threex/) extension for [three.js](http://threejs.org)
* under [MIT](http://jetienne.mit-license.org/)

--

### What ?

* a **minigame** using three.js which run **on renderer**
* a **controller** for this game to run **on player device**
* a **server** to communicate **between both**

--

### Definitly Simple

for [threex.cloudgaming](http://jeromeetienne.github.io/threex/#threex.cloudgaming)

```
$ wc -l *.js
311
```

Full implementation 311 lines

--

### Renderer - Minigame 

* all from [threex](http://jeromeetienne.github.io/threex/) extension for [three.js](http://threejs.org)
* [threex.minecraft](https://github.com/jeromeetienne/threex.minecraft) for the minecraft character
* [threex.montainarena](https://github.com/jeromeetienne/threex.montainarena) for montains
* [threex.grassground](https://github.com/jeromeetienne/threex.grassground) for the ground
* [threex.skymap](https://github.com/jeromeetienne/threex.skymap) for the sky

--

### Controller - Minigame

* use [virtualjoystick.js](http://github.com/jeromeetienne/virtualjoystick.js) to have joystick on touch screen
* Provide right/up/left/down

**TODO** screenshot fro this lib. take it from the post

--

### threex.cloudgaming - The Base

* connect to server
* provide echo service thru server

#### Code

* [threex.cloudrenderer.js](https://github.com/jeromeetienne/threex.cloudgaming/blob/master/threex.cloudrenderer.js) - 63 lines
* [threex.cloudcontroller.js](https://github.com/jeromeetienne/threex.cloudgaming/blob/master/threex.cloudcontroller.js) - 67 lines
* [server.js](https://github.com/jeromeetienne/threex.cloudgaming/blob/master/threex.server.js) - 14 lines

--

### Screen Updater

* handle window resize in controller
  * notify the renderer when it happens
* handle screen update from server to controller

#### Code

* [threex.cloudrendererscreenupdater.js](https://github.com/jeromeetienne/threex.cloudgaming/blob/master/threex.cloudrendererscreenupdater.js) - 53 lines
* [threex.cloudcontrollerscreenupdater.js](https://github.com/jeromeetienne/threex.cloudgaming/blob/master/threex.cloudcontrollerscreenupdater.js) - 42 lines

--

### Virtual Joystick

* read ```virtualjoystick.js``` inputs on player device
* send them to renderer via server
* renderer to pass that to the minigame

#### Code

* [threex.cloudrenderervirtualjoystick.js](https://github.com/jeromeetienne/threex.cloudgaming/blob/master/threex.cloudrenderervirutaljoystick.js) - 46 lines
* [threex.cloudcontrollervirtualjoystick.js](https://github.com/jeromeetienne/threex.cloudgaming/blob/master/threex.cloudcontrollervirtualjoystick.js) - 19 lines

--

# Separator

--

# Questions ?
## [Jerome Etienne](http://twitter.com/jerome_etienne)



