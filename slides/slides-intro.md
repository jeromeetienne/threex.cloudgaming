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

<iframe width="560" height="315" src="//www.youtube.com/embed/fHVfy7WrPH0" frameborder="0" allowfullscreen></iframe>

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

## What it is for us ?

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

**Simple Enough...**

--

## Ok We Know the Target, What's Next ? 

--

# Early Study

## For Early Prototype

--

### Early Study - Rendering

* So we got to render our game in server
* it will be **rendered via a web browser**
* seems natural choise to render webgl

--

### Early Study - Architechture

3 parts 

* **a renderer :** the brower running our game
* **a controller :** used by players to access our game
* **a server :** ensures the communication between both

--

### Early Study - Networking

* networking done thru websocket
* no webrtc at the moment
* websocket is available a lot more than webrtc
* especially on mobile phone, our usecase.

--

### Early Study - Software

* server in node.js
* websocket are trivial with socket.io
* little js library in renderer, and another in controller
* only common technology here

**implementation is easy**

--

## Looks Good… 

## What Would it be in Action ?
--

# Theory Of Operations

--

### Theory Of Operations - Server


* a renderer browser web running the game
* take regular screenshots with [.toDataUrl()](https://developer.mozilla.org/en/docs/Web/API/HTMLCanvasElement#Methods)
* Send them to the player device via echo server 
  * mobile phone, tablette whatever.

--

### Theory Of Operations - Player

* player can see webgl rendering on any device
* player uses touch screen as inputs
* inputs are then sent to the server 
* server send them back to the renderer.

--

### Theory Of Operations - Output

* browser receives inputs from the player.
* player sees what is displayed in the browser.

**we got the whole loop**

--

### Theory Of Operations - Results

* This is actual cloud gaming! 
* Simple implementation
* Less than 24h to write!
* Performances? left as an exercice to the reader :)

--

## Nice Concepts! What About the Code ?

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

### Controller - VirtualJoystick

* use [virtualjoystick.js](http://github.com/jeromeetienne/virtualjoystick.js) to have joystick on touch screen
* more info in [this post](http://learningthreejs.com/blog/2011/12/26/let-s-make-a-3d-game-virtual-joystick/) froms [learning three.js blog](http://learningthreejs.com).
* Provide right/up/left/down

--

### Core - threex.cloudgaming

* connect to server
* provide echo service thru server

#### Code

* [threex.cloudrenderer.js](https://github.com/jeromeetienne/threex.cloudgaming/blob/master/threex.cloudrenderer.js) - 63 lines
* [threex.cloudcontroller.js](https://github.com/jeromeetienne/threex.cloudgaming/blob/master/threex.cloudcontroller.js) - 67 lines
* [server.js](https://github.com/jeromeetienne/threex.cloudgaming/blob/master/threex.server.js) - 14 lines

--

### Helpers - Screen Updater

* handle window resize in controller
  * notify the renderer when it happens
* handle screen update from server to controller

#### Code

* [threex.cloudrendererscreenupdater.js](https://github.com/jeromeetienne/threex.cloudgaming/blob/master/threex.cloudrendererscreenupdater.js) - 53 lines
* [threex.cloudcontrollerscreenupdater.js](https://github.com/jeromeetienne/threex.cloudgaming/blob/master/threex.cloudcontrollerscreenupdater.js) - 42 lines

--

### Helpers - Virtual Joystick

* read ```virtualjoystick.js``` inputs on player device
* send them to renderer via server
* renderer to pass that to the minigame

#### Code

* [threex.cloudrenderervirtualjoystick.js](https://github.com/jeromeetienne/threex.cloudgaming/blob/master/threex.cloudrenderervirutaljoystick.js) - 46 lines
* [threex.cloudcontrollervirtualjoystick.js](https://github.com/jeromeetienne/threex.cloudgaming/blob/master/threex.cloudcontrollervirtualjoystick.js) - 19 lines

--

# Questions ?
## [Jerome Etienne](http://twitter.com/jerome_etienne)



