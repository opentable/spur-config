module.exports = ->

  @extends "base-ci"

  @addLog4jsAppender
    type:"console"

  @properties
    environment: "ci2"
    Port:"8081"
