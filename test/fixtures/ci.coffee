module.exports = ->

  @extends "base-ci"

  @addLog4jsAppender
    type:"console"

  @properties
    prop1:"value1"

