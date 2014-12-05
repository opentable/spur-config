{
  "log4js": {
    "appenders": [
      {
        "type": "redis-logstash",
        "redisHost": "myprodlogging.com",
        "redisPort": "6379",
        "listName": "logstash",
        "baseLogFields": {
          "type": "myApp",
          "environment": "prod"
        }
      },
      {
        "type": "console"
      }
    ]
  },
  "Port": 8080,
  "prop1": "value1"
}