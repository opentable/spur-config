SpurConfig          = require "#{srcDir}/SpurConfig"
SpurConfigGenerator = require "#{srcDir}/SpurConfigGenerator"
path                = require "path"

SpurConfigIndex              = require "#{rootDir}"
SpurConfigGeneratorIndex     = require "#{rootDir}/generator"

describe "SpurConfig", ->

  beforeEach ->

    @fixtures = path.join(__dirname, "../fixtures")
    @generated = path.join(__dirname, "../generated")

  it "should exist", ->
    expect(SpurConfig).to.exist
    expect(SpurConfigGenerator).to.exist
    expect(SpurConfig).to.equal SpurConfigIndex
    expect(SpurConfigGenerator).to.equal SpurConfigGeneratorIndex

  it "root js files should have correct references", ->


  it "load()", ->
    conf = SpurConfig.load path.join(__dirname, "../fixtures"), "ci"
    console.log conf.toJSONString()

  it "load()", ->
    conf = SpurConfig.load path.join(__dirname, "../fixtures")
    expect(conf.baseObject).to.deep.equal {
      "test": true
    }

  it "generate()", ->
    SpurConfigGenerator.generate(@fixtures, @generated)

  it "multiExtend()", ->
    multiExtendConf = SpurConfig.load path.join(__dirname, "../fixtures"), "multiExtend"
    multiExtendMultiArgConf = SpurConfig.load path.join(__dirname, "../fixtures"), "multiExtendMultiArg"
    expected = {
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
      "Port": "8081",
      "prop1": "value1"
    }

    expect(multiExtendConf.baseObject).to.deep.equal expected
    expect(multiExtendMultiArgConf.baseObject).to.deep.equal expected

  it "sub directories", ->
    conf = SpurConfig.load path.join(__dirname, "../fixtures"), "nested"
    expect(conf.baseObject).to.deep.equal {
      "test": true,
      "urls": {
        "google": "www.google.com",
        "apple": "www.apple.com"
      },
      "Port": 8080
    }


