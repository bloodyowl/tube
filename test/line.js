var tape = require("tape")
  , line = require("../lib/line")

tape("line", function(test){
  var chan = line.create()
  test.equal(typeof chan, "object", "returns a line instance")
  test.equal(typeof chan.callbacks, "object", "creates an object for messages")
  test.end()
})

tape("line.destroy", function(test){
  test.plan(2)
  var chan = line.create()
  chan.receive("foo", function(){test.fail()})
  test.equal(typeof chan.callbacks.foo, "object")
  chan.destroy()
  test.equal(typeof chan.callbacks.foo, "undefined", "deletes callbacks")
})

tape("line._run", function(test){
  test.plan(3)
  var z = ""
  line._run.call([{foo:"bar"},{bar:"baz"}], function(a,b){
    test.equal(a.foo, "bar")
    test.equal(b.bar, "baz")
    test.equal(z, "1", "is asynchronous")
  })
  z += "1"
})

tape("line.send/line.receive", function(test){
  test.plan(2)
  var chan = line.create()
  chan.receive("foo", function(a,b){
    test.equal(a, "foo")
    test.equal(b, "bar")
    chan.stopReceiving("foo")
    chan.send("foo", 1, 1)
  })
  chan.send("foo", "foo", "bar")
})

tape("line.sendSync/line.receive", function(test){
  var chan = line.create()
  chan.receive("foo", function(a,b){
    test.equal(a, "foo")
    test.equal(b, "bar")
    chan.stopReceiving("foo")
    chan.sendSync("foo", 1, 1)
  })
  chan.sendSync("foo", "foo", "bar")
  test.end()
})


tape("line.stopReceiving", function(test){
  test.plan(2)
  var chan = line.create()
    , id = chan.receive("bar", function(){
        test.fail()
      })
  chan.receive("bar", function(){
    test.pass()
  })
  chan.stopReceiving("bar", id)
  test.doesNotThrow(function(){
    chan.stopReceiving("baz")
  })
  chan.send("bar", "foo", "bar")
})
