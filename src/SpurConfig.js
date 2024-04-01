const fs = require('fs');
const path = require('path');
const _merge = require('lodash.merge');
const requireAll = require('require-all');

class SpurConfig {

  constructor(folderPath, configName) {
    this.folderPath = folderPath;
    this.configName = configName || SpurConfig.getEnv();
    this.baseObject = {};
    this.defaultPluginsPath = path.join(__dirname, './plugins');
    this.customPluginsPath = path.join(this.folderPath, '/plugins');
    this.plugins = {};
  }

  static load(folderPath, configName) {
    const spurConfig = new SpurConfig(folderPath, configName);
    spurConfig.load();
    return spurConfig;
  }

  static loadEnv(folderPath) {
    this.load(folderPath, this.getEnv());
  }

  static getEnv() {
    return process.env.NODE_ENV || 'development';
  }

  load() {
    try {
      this.loadPlugins();
      this.configFile = require(path.join(this.folderPath, this.configName));
      this.configFile.apply(this.plugins);
      return this.baseObject;
    } catch (e) {
      /* eslint-disable no-console */
      console.error(`Couldn't load config ${this.folderPath}/${this.configName}`);
      console.error(e.stack);
      /* eslint-enable no-console */
      throw e;
    }
  }

  loadPlugins() {
    this.loadPluginsFromPath(this.defaultPluginsPath);
    this.loadPluginsFromPath(this.customPluginsPath);
  }

  loadPluginsFromPath(folderPath) {
    if (fs.existsSync(folderPath)) {
      const pluginsObject = requireAll({
        dirname: folderPath,
        filter: /(.+)\.(js)$/
      });
      this.loadPluginsByObject(pluginsObject);
    }
  }

  loadPluginsByObject(pluginsObject = {}) {
    const pluginNames = Object.keys(pluginsObject);

    pluginNames.forEach((pluginName) => {
      const plugin = pluginsObject[pluginName];
      if (typeof plugin === 'function') {
        this.plugins[pluginName] = plugin.bind(this);
      } else {
        this.loadPluginsByObject(plugin);
      }
    });
  }

  deepExtend(obj1, obj2) {
    const ob1 = obj1 || {};
    const ob2 = obj2 || {};
    this.baseObject = _merge({}, this.baseObject, ob1, ob2);
  }

  getConfig() {
    return this.baseObject;
  }

  loadConfig(configName) {
    return SpurConfig.load(this.folderPath, configName).getConfig();
  }

  toJSONString() {
    return JSON.stringify(this.baseObject, null, 2);
  }

}

module.exports = SpurConfig;
