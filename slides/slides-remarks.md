title: Remarks on Cloud Gaming Experiments
author:
  name: "Jerome Etienne"
  twitter: "@jerome_etienne"
  url: "http://jetienne.com"
output: remarks.html
--

<base target='_blank'/>
<style>pre { background: lightgrey; font-size: 100%;}</style>

# Remarks on Cloud Gaming Experiment

## [Jerome Etienne](http://twitter.com/jerome_etienne)

--

# Separator

--

### Experiments Status

* ok we got the basic tech running
* Many questions raised

#### Questions
* now what about it ?
* is it actually usable in the wild ?
* what about Performance

--

# Separator

--

# Performances

--

### Current Performances

* not so bad result on wifi
* many rooms of optimisations

--

### Network Performance - Key Area

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
* send binary data, no more base64

--

### Possible Improvements

* all seems easily rechable
* no hard software problem to solve

--

## All is cool then ? 

--

# Could That be the Same Game ?

--

## Hue ? Why this Question ?

--

### Well What is Cloud Gaming About ?

The core of it may be summarized as 
```
"Running Same Game On Multiple Devices"
```

--

### Hidden Implication :)

```
"Thus i dont rewrite it for those devices" :)
```

So the industry loves the idea.

--

## So... ?

--

### How Much To Modify ?

Who want to write the same game 10 times ?

* **Ideal Case:** no modification at all
* **Worst Case:** total rewrite


* no "one size fit all" unfortunatly
* it depends on your case

--

## Some Rules of Thumbs

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

# Questions ?
## [Jerome Etienne](http://twitter.com/jerome_etienne)


