module.exports = ()->

  @log4js("prod", "myprodlogging.com")

  @properties
    environment: "base-ci"
    Port:8080
