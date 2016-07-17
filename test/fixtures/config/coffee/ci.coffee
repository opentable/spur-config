module.exports = ->

  @extends "base-ci"

  @addLog4jsAppender
    type:"console"

  @properties
    environment: "ci"
    prop1:"value1"
