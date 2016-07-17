module.exports = function (env, host) {

  this.deepExtend(this.baseObject, {
    log4js: {
      appenders: [{
          type: "redis-logstash",
          redisHost: host,
          redisPort: "6379",
          listName: "logstash",
          baseLogFields: {
            type: "myApp",
            environment: env
          }
        }
      ]
    }
  });

};
