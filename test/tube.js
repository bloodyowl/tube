var tape = require("tape")
  , tube = require("../")

tape("index", function(test){

  test.plan(1)

  var t = tube.create()
    , foo = t.line("foo")
    , bar = t.line("bar")

  foo.send("update", "bar")

  foo.receive("update", function(a){
    test.equal(a, "foo")
  })

  bar.receive("update", function(a){
    foo.send("update", a)
  })

  bar.send("update", "foo")

})

tape("index.remove", function(test){

  test.plan(2)

  var t = tube.create()
    , foo = t.line("foo")

  test.doesNotThrow(function(){
    t.remove("bar")
  })
  foo.receive("update", function(){
    test.fail()
  })

  t.remove("foo")
  test.equal(foo.callbacks.foo, void 0)
  foo.send("update")

})
