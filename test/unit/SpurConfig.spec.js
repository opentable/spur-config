const path = require('path');
const SpurConfig = require('../../src/SpurConfig');

describe('SpurConfig', function () {
  beforeEach(() => {
    this.srcBasePath = path.resolve(__dirname, '../../src/');
    this.jsFixtureConfigPath = path.resolve(__dirname, '../../test/fixtures/config/js/');
    this.SpurConfig = SpurConfig;

    process.env.NODE_ENV = 'test';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should exist', () => {
    expect(this.SpurConfig).toBeDefined();
  });

  describe('initialization', () => {
    it('should configure default path', () => {
      const subject = new SpurConfig(this.jsFixtureConfigPath);
      expect(subject.folderPath).toBe(this.jsFixtureConfigPath);
    });

    it('should set internal plugins directory', () => {
      const subject = new SpurConfig(this.jsFixtureConfigPath);
      expect(subject.defaultPluginsPath).toBe(path.join(this.srcBasePath, './plugins'));
    });

    it('should set custom plugins path', () => {
      const subject = new SpurConfig(this.jsFixtureConfigPath);
      expect(subject.customPluginsPath).toBe(path.join(this.jsFixtureConfigPath, './plugins'));
    });

    it('should have empty properties', () => {
      const subject = new SpurConfig(this.jsFixtureConfigPath);
      expect(subject.baseObject).toEqual({});
    });

    it('should have empty plugins list', () => {
      const subject = new SpurConfig(this.jsFixtureConfigPath);
      expect(subject.plugins).toEqual({});
    });

    it('should detect and set the configName from environment variable', () => {
      const subject = new SpurConfig(this.jsFixtureConfigPath);
      expect(subject.configName).toBe('test');
    });

    it('should detect and set the configName passed in', () => {
      const subject = new SpurConfig(this.jsFixtureConfigPath, 'ci');
      expect(subject.configName).toBe('ci');
    });
  });

  describe('environment', () => {
    it('should get the environment from the environement variable', () => {
      expect(this.SpurConfig.getEnv()).toBe('test');
    });

    it('should use "development" environement variable when process does not have NODE_ENV', () => {
      delete process.env.NODE_ENV;
      expect(this.SpurConfig.getEnv()).toBe('development');
    });
  });

  describe('plugins', () => {
    it('should map the default plugins', () => {
      const subject = new SpurConfig(this.jsFixtureConfigPath, 'ci');
      subject.loadPlugins();
      expect(subject.plugins).toHaveProperty('extends');
      expect(subject.plugins).toHaveProperty('properties');
    });

    it('should map the custom plugins in direcotry', () => {
      const subject = new SpurConfig(this.jsFixtureConfigPath, 'ci');
      subject.loadPlugins();
      expect(subject.plugins).toHaveProperty('extends');
      expect(subject.plugins).toHaveProperty('properties');
      expect(subject.plugins).toHaveProperty('log4js');
      expect(subject.plugins).toHaveProperty('addLog4jsAppender');
    });
  });

  describe('factories', () => {
    it('loadEnv() should call load() with proper arguements', () => {
      jest.spyOn(this.SpurConfig, 'load');

      this.SpurConfig.loadEnv(this.jsFixtureConfigPath);

      expect(this.SpurConfig.load).toHaveBeenCalledWith(this.jsFixtureConfigPath, 'test');
    });

    it('should load the simple test configuration', () => {
      const result = this.SpurConfig.load(this.jsFixtureConfigPath, 'test');

      const config = result.getConfig();

      expect(config.test).toBe(true);
    });

    it('should load the simple inheritance test configuration', () => {
      const result = this.SpurConfig.load(this.jsFixtureConfigPath, 'nested');
      const config = result.getConfig();

      expect(config.environment).toBe('nested');
      expect(config).toHaveProperty('urls');
      expect(config).toHaveProperty('prop1');
    });
  });
});
