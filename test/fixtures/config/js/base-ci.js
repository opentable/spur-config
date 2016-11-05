module.exports = function() {

  this.log4js("prod", "myprodlogging.com");

  return this.properties({
    environment: 'base-ci',
    Port:8080
  });

};
