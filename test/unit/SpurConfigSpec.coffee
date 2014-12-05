describe.only "SpurConfig", ->

  beforeEach ->
    injector().inject (@SpurConfig, @SpurConfigGenerator, @path)=>

    @fixtures = @path.join(__dirname, "../fixtures")
    @generated = @path.join(__dirname, "../generated")

  it "should exist", ->
    expect(@SpurConfig).to.exist

  it "load()", ->
    conf = @SpurConfig.load @path.join(__dirname, "../fixtures"), "ci"
    console.log conf.toJSONString()

  it "generate()", ->
    @SpurConfigGenerator.generate(@fixtures, @generated)
