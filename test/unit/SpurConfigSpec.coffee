SpurConfig          = require "#{srcDir}/SpurConfig"
SpurConfigGenerator = require "#{srcDir}/SpurConfigGenerator"
path                = require "path"

SpurConfigIndex              = require "#{rootDir}"
SpurConfigGeneratorIndex     = require "#{rootDir}/generator"

describe.only "SpurConfig", ->

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

  it "generate()", ->
    SpurConfigGenerator.generate(@fixtures, @generated)
