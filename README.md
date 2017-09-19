# secondDeal
by [Austin Liu](https://github.com/aliu139)

![Screenshot](./otherImg/ex.png)

## Introduction
> "Create art together! Throw all of your photos onto a single canvas, and watch as the memories pile!"

This project was an attempt to create a virtual collage table, where users around the world can throw their pictures and memories onto the same surface for viewing! With a single app running, you can have many tables running, each with multiple clients all sharing photos at the same time thanks to Socket.io! 

For Developers, this was also an attempt to explore what Socket.io and CSS transforms could do. It was really cool to transfer images via WebSockets!

## How to Use
* Run ```npm install```
* On a computer (preferably the one with the largest display)
    * Start this app up using ```npm start```
    * Click Server
* From other devices (preferably mobile), navigate to the same site
    * Type in the Room Number
    * Click Client
* From the clients, you can choose to 
    * Fling cards at random (influenced by flick speed and direction)
    * Fling pictures by hitting the upload picture button!
* From the server, you can move around the latest image, zoom in, etc.

## Technologies Used
* [VueJS](https://vuejs.org/)
* [Socket.io](https://socket.io/)
* [NodeJS](https://nodejs.org/en/)
* [Bootstrap](http://getbootstrap.com/)
* [QRCodeDecoder](https://cirocosta.github.io/qcode-decoder/)
* [qrcode.js](https://davidshimjs.github.io/qrcodejs/)
* [TouchTrack](https://www.outsystems.com/forge/component/1385/silk-ui-mobile/)
* [HammerJS](http://hammerjs.github.io/)
* [Deck Of Cards](https://github.com/pakastin/deck-of-cards/blob/master/example/example.css)

## Inspired By
This project was heavily inspired by Hélio Dolores' [amazing article on Medium](https://medium.com/outsystems-engineering/making-magic-with-websockets-and-css3-ec22c1dcc8a8)! His code can be found on [Github here](https://github.com/heliodolores/magic-tricks-example)!