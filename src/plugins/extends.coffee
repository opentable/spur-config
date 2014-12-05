module.exports = (configName)->
  config =  @loadConfig(configName)
  @deepExtend @baseConfig, config

