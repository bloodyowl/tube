var klass = require("bloody-class")
  , line = require("./lib/line")

module.exports = klass.extend({
  constructor : function(){
    this.lines = {}
  },
  line : function(name){
    return this.lines[name] || (this.lines[name] = line.create())
  },
  remove : function(name){
    var line = this.lines[name]
    if(!line) return
    line.destroy()
    this.lines[name] = null
  }
})
