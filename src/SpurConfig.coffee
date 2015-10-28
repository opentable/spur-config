fs         = require "fs"
path       = require "path"
_          = require "lodash"
requireAll = require "require-all"

class SpurConfig

  constructor:(@folderPath, @configName=@getEnv())->
    @baseObject = {}
    @defaultPluginsPath = path.join(__dirname, "./plugins")
    @customPluginsPath = path.join(@folderPath, "/plugins")
    @plugins = {}

  @load:(folderPath, configName)->
    spurConfig = new SpurConfig(folderPath, configName)
    spurConfig.load()
    spurConfig

  getEnv:()->
    process.env.NODE_ENV or "development"

  @loadEnv:(folderPath)->
    @load(folderPath, @getEnv())

  load:()->
    try
      @loadPlugins(@defaultPluginsPath)
      @loadPlugins(@customPluginsPath)
      @configFile = require(path.join(@folderPath, @configName))
      @configFile.apply(@plugins)
      @baseObject
    catch e
      console.error "Couldn't load config #{@folderPath}/#{@configName}"
      console.error e.stack
      throw e

  loadPlugins:(folderPath)->
    if fs.existsSync(folderPath)
      pluginsObject = requireAll({
        dirname:folderPath
        filter:  /(.+)\.(js|coffee)$/
      })

      @loadPluginsByObject(pluginsObject)

  loadPluginsByObject:(pluginsObject)->
    for pluginName, plugin of pluginsObject
      do(pluginName, plugin) =>
        if _.isFunction plugin
          @plugins[pluginName] = plugin.bind(@)
        else
          @loadPluginsByObject(plugin)

  deepExtend:(ob1={}, ob2={})->
    @baseObject = _.merge({}, @baseObject, ob1, ob2)

  getConfig:()->
    @baseObject

  loadConfig:(configName)->
    SpurConfig.load(@folderPath, configName).getConfig()

  toJSONString:()->
    JSON.stringify(@baseObject, null, 2)

module.exports = SpurConfig
