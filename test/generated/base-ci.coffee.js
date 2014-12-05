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
      }
    ]
  },
  "Port": 8080
}