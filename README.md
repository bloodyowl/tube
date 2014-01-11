## tube

[![browser support](https://ci.testling.com/bloodyowl/tube.png)](https://ci.testling.com/bloodyowl/tube)

### Install 

```
$ npm install bloody-tube
```

### Require

```javascript
var tube = require("bloody-tube")
```

### Definition 

Tube is a communication manager.  
It helps you to publish and subsribe to messages, and separated communication lines. 
It can help you managing communication between modules in medium to big applications. 

### Methods

#### `tube.create()` -> `tube network`

Creates a channel to centralise all the messages within your app. 

#### `tube.line(name) -> line` 

Gets or creates the `name` communication tunnel. 

#### `line.receive(message, callback) -> id`

Executes callback each item `message` is sent. 

#### `line.stopReceiving(message[, id])`

Stops receiving `id` callback, or all messages if no `id` is precised. 

#### `line.send(message[, args…])`

Sends a message with arguments in the line. 

### Usage

```javascript
// tube.js
var tube = require("bloody-tube")
module.exports = tube.create()
```

```javascript
// loginView.js
var loginLine = require("../tube").line("login")

// some code
nameInput.on("blur", function(){
  if(!this.value) return
  loginLine.send("name", this.value)
})

loginLine.receive("name:check", function(name){
  nameElement.html(name)
})
```

```javascript
// login.js
var loginLine = require("../tube").line("login")

// some code
loginLine.receive("name", function(name){
  if(login.verify("name", name)) {
    login.set("name", name)
  }
  loginLine.send("name:check", name)
})
```
