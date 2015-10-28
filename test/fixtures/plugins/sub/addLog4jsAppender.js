module.exports = function(appender){

  this.baseObject.log4js = this.baseObject.log4js || {};
  this.baseObject.log4js.appenders = this.baseObject.log4js.appenders || [];
  this.baseObject.log4js.appenders.push(appender);

};
