module.exports = (configNames...)->

  for configName in configNames
    config =  @loadConfig(configName)
    @deepExtend config
