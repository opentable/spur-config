module.exports = function (...configNames) {
  configNames.forEach((configName) => {
    const config = this.loadConfig(configName);
    this.deepExtend(config);
  });
};
