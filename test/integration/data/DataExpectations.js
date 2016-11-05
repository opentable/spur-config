const output = {};

output.test = {
  environment: 'test',
  test: true
};

output.ci = {
  log4js: {
    appenders: [
      {
        type: 'redis-logstash',
        redisHost: 'myprodlogging.com',
        redisPort: '6379',
        listName: 'logstash',
        baseLogFields: {
          type: 'myApp',
          environment: 'prod'
        }
      },
      {
        type: 'console'
      }
    ]
  },
  environment: 'ci',
  Port: 8080,
  prop1: 'value1'
};

output.multiExtend = {
  log4js: {
    appenders: [
      {
        type: 'redis-logstash',
        redisHost: 'myprodlogging.com',
        redisPort: '6379',
        listName: 'logstash',
        baseLogFields: {
          type: 'myApp',
          environment: 'prod'
        }
      },
      {
        type: 'console'
      }
    ]
  },
  environment: 'ci2',
  Port: '8081',
  prop1: 'value1'
};

output.nested = {
  log4js: {
    appenders: [
      {
        type: 'redis-logstash',
        redisHost: 'myprodlogging.com',
        redisPort: '6379',
        listName: 'logstash',
        baseLogFields: {
          type: 'myApp',
          environment: 'prod'
        }
      },
      {
        type: 'console'
      }
    ]
  },
  environment: 'nested',
  Port: 8080,
  prop1: 'value1',
  urls: {
    google: 'www.google.com',
    apple: 'www.apple.com'
  }
};

module.exports = output;
