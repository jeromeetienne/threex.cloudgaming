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

### Principles Of Operations


* on server side you got a browser web running the game
* On this server you take regular screenshot .toDataUrl
* You send them to the player device... mobile phone, tablette whatever.

--

### Principles Of Operations

* Thus the player can see webgl rendering on any device.
* The player use touch screen as inputs
* They are then sent to the server which send them back to the browser.

--

### Principles Of Operations

* So we got the whole loop. The browser receives inputs from the player.
* And the player sees what is displayed in the browser.

--

### Principles Of Operations

* this is actual cloud gaming! All that with a simple node.js server to write and some js code. Maybe a few days. Surely less than a week.
* Performances are left as an exercice to the reader :)


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

* big network requirement outside our controls
  * mobile network capabilities

=> games needs to be adapated to controller capabilities


--

### Where to get threex.cloudgaming.js

* Repo - [github](https://github.com/jeromeetienne/threex.cloudgaming) 
* License - [MIT](http://jetienne.mit-license.org/)

--

# Questions ?
## [Jerome Etienne](http://twitter.com/jerome_etienne)



