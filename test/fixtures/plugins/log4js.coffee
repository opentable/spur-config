module.exports = (env, host)->

  @deepExtend @baseObject, {
    log4js:{
      appenders: [
        (
          type: "redis-logstash",
          redisHost: host,
          redisPort: "6379",
          listName: "logstash",
          baseLogFields:
            type: "myApp"
            environment: env
        )
      ]
    }
  }