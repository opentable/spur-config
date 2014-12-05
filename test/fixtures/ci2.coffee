module.exports = ->

  @extends "base-ci"

  @addLog4jsAppender
    type:"console"

  @properties
    Port:"8081"

