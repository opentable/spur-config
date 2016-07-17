module.exports = (appender) ->

  @baseObject.log4js = @baseObject.log4js || {};
  @baseObject.log4js.appenders = @baseObject.log4js.appenders || [];
  @baseObject.log4js.appenders.push(appender);
