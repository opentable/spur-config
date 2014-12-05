fs = require "fs"

module.exports = (_, nodeProcess, path, requireAll)->

  class SpurConfig

    constructor:(@folderPath, @configName)->
      @baseObject = {}
      @defaultPluginsPath = path.join(__dirname, "../plugins")
      @customPluginsPath = path.join(@folderPath, "/plugins")
      @plugins = {}

    @load:(folderPath, configName)->
      spurConfig = new SpurConfig(folderPath, configName)
      spurConfig.load()
      spurConfig

    @loadEnv:(folderPath)->
      @load(folderPath, nodeProcess.env.NODE_ENV)

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
      @baseObject = _.merge(ob1, ob2)

    getConfig:()->
      @baseObject

    loadConfig:(configName)->
      SpurConfig.load(@folderPath, configName).getConfig()

    toJSONString:()->
      JSON.stringify(@baseObject, null, 2)
