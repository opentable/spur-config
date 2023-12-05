const path = require('path');
const spurConfig = require('../../');
const expectedData = require('./data/DataExpectations');

describe('JavaScript based config integration tests', function () {
  beforeEach(() => {
    this.configFixturePath = path.resolve(__dirname, '../../test/fixtures/config/js/');
    process.env.NODE_ENV = 'test';

    this.loadConfiguration = (environment) => {
      process.env.NODE_ENV = environment;
      this.item = spurConfig.load(this.configFixturePath, environment).getConfig();
    };
  });

  it('should exist', () => {
    expect(spurConfig).toBeDefined();
  });

  describe('configuraton load', () => {
    it('should load a basic configuration', () => {
      this.loadConfiguration('test');
      expect(this.item).toEqual(expectedData.test);
    });

    it('should load a configuration that extends and uses plugins', () => {
      this.loadConfiguration('ci');
      expect(this.item).toEqual(expectedData.ci);
    });

    it('should load a configuration that extends from multiple files', () => {
      this.loadConfiguration('multiExtend');
      expect(this.item).toEqual(expectedData.multiExtend);
    });

    it('should load a configuration that extends from nested configurations', () => {
      this.loadConfiguration('nested');
      expect(this.item).toEqual(expectedData.nested);
    });
  });
});
