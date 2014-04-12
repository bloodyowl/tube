var klass = require("bloody-class")
  , immediate = require("bloody-immediate")
  , id = -1
  , _hasOwnProperty = {}.hasOwnProperty
  , nativeSlice = [].slice

module.exports = klass.extend({
  constructor : function(){
    this.callbacks = {}
  },
  destructor : function(){
    this.callbacks = {}
  },
  _run : function(fn){
    immediate.call(function(args){
      fn.apply(null, args)
    }, this)
  },
  send : function(name){
    var callbacks = this.callbacks[name]
      , index, args
    if(!callbacks) return
    args = nativeSlice.call(arguments, 1)
    for(index in callbacks) {
      if(!_hasOwnProperty.call(callbacks, index)) continue
      this._run.call(args, callbacks[index])
    }
  },
  sendSync : function(name){
    var callbacks = this.callbacks[name]
      , index, args
    if(!callbacks) return
    args = nativeSlice.call(arguments, 1)
    for(index in callbacks) {
      if(!_hasOwnProperty.call(callbacks, index)) continue
      callbacks[index].apply(null, args)
    }
  },
  receive : function(name, callback){
    var callbacks = this.callbacks[name] || (this.callbacks[name] = {})
    callbacks[++id] = callback
    return id
  },
  stopReceiving: function(name, id){
    var callbacks = this.callbacks[name]
    if(!callbacks) return
    if(arguments.length < 2 || !callbacks) {
      delete this.callbacks[name]
      return
    }
    if(_hasOwnProperty.call(callbacks, id)) {
      delete callbacks[id]
    }
  }
})
