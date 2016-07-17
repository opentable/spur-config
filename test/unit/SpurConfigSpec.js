import path from 'path';
import SpurConfig from '../../src/SpurConfig';

describe('SpurConfig', () => {
  beforeEach(function () {
    this.srcBasePath = path.resolve(__dirname, '../../src/');
    this.jsFixtureConfigPath = path.resolve(__dirname, '../../test/fixtures/config/js/');
    this.coffeeFixtureConfigPath = path.resolve(__dirname, '../../test/fixtures/config/coffee/');
    this.SpurConfig = SpurConfig;

    process.env.NODE_ENV = 'test';
  });

  it('should exist', function () {
    expect(this.SpurConfig).to.exist;
  });

  describe('initialization', () => {
    it('should configure default path', function () {
      const subject = new SpurConfig(this.jsFixtureConfigPath);
      expect(subject.folderPath).to.equal(this.jsFixtureConfigPath);
    });

    it('should set internal plugins directory', function () {
      const subject = new SpurConfig(this.jsFixtureConfigPath);
      expect(subject.defaultPluginsPath).to.equal(path.join(this.srcBasePath, './plugins'));
    });

    it('should set custom plugins path', function () {
      const subject = new SpurConfig(this.jsFixtureConfigPath);
      expect(subject.customPluginsPath).to.equal(path.join(this.jsFixtureConfigPath, './plugins'));
    });

    it('should have empty properties', function () {
      const subject = new SpurConfig(this.jsFixtureConfigPath);
      expect(subject.baseObject).to.deep.equal({});
    });

    it('should have empty plugins list', function () {
      const subject = new SpurConfig(this.jsFixtureConfigPath);
      expect(subject.plugins).to.deep.equal({});
    });

    it('should detect and set the configName from environment variable', function () {
      const subject = new SpurConfig(this.jsFixtureConfigPath);
      expect(subject.configName).to.deep.equal('test');
    });

    it('should detect and set the configName passed in', function () {
      const subject = new SpurConfig(this.jsFixtureConfigPath, 'ci');
      expect(subject.configName).to.deep.equal('ci');
    });
  });

  describe('environment', () => {
    it('should get the environment from the environement variable', function () {
      expect(this.SpurConfig.getEnv()).to.equal('test');
    });

    it('should use "development" environement variable when process does not have NODE_ENV', function () {
      delete process.env.NODE_ENV;
      expect(this.SpurConfig.getEnv()).to.equal('development');
    });
  });

  describe('plugins', () => {
    it('should map the default plugins', function () {
      const subject = new SpurConfig(this.jsFixtureConfigPath, 'ci');
      subject.loadPlugins();
      expect(subject.plugins).to.have.property('extends');
      expect(subject.plugins).to.have.property('properties');
    });

    it('should map the custom plugins in direcotry', function () {
      const subject = new SpurConfig(this.jsFixtureConfigPath, 'ci');
      subject.loadPlugins();
      expect(subject.plugins).to.have.property('extends');
      expect(subject.plugins).to.have.property('properties');
      expect(subject.plugins).to.have.property('log4js');
      expect(subject.plugins).to.have.property('addLog4jsAppender');
    });
  });

  describe('factories', () => {
    it('loadEnv() should call load() with proper arguements', function () {
      sinon.stub(this.SpurConfig, 'load');

      this.SpurConfig.loadEnv(this.jsFixtureConfigPath);

      expect(this.SpurConfig.load.getCall(0).args)
        .to.deep.equal([this.jsFixtureConfigPath, 'test']);

      this.SpurConfig.load.restore();
    });

    it('should load the simple test configuration', function () {
      const result = this.SpurConfig.load(this.jsFixtureConfigPath, 'test');
      const config = result.getConfig();

      expect(config.test).to.equal(true);
    });

    it('should load the simple inheritance test configuration', function () {
      const result = this.SpurConfig.load(this.jsFixtureConfigPath, 'nested');
      const config = result.getConfig();

      expect(config.environment).to.equal('nested');
      expect(config).to.have.property('urls');
      expect(config).to.have.property('prop1');
    });

    it('should load the simple test configuration from coffee source', function () {
      const result = this.SpurConfig.load(this.coffeeFixtureConfigPath, 'test');
      const config = result.getConfig();

      expect(config.test).to.equal(true);
      expect(config.coffee).to.equal(true);
    });
  });
});
