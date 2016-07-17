module.exports = ()->

  @extends "test"
  @extends "sub/urls"

  @properties
    environment: "nested"
    Port:8080
