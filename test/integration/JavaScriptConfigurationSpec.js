import path from 'path';
const spurConfig = require('../../');
const expectedData = require('./data/DataExpectations');

describe('JavaScript based config integration tests', () => {
  beforeEach(function () {
    this.configFixturePath = path.resolve(__dirname, '../../test/fixtures/config/js/');
    process.env.NODE_ENV = 'test';

    this.loadConfiguration = (environment) => {
      process.env.NODE_ENV = environment;
      this.item = spurConfig.load(this.configFixturePath, environment).getConfig();
    };
  });

  it('should exist', () => {
    expect(spurConfig).to.exist;
  });

  describe('configuraton load', () => {
    it('should load a basic configuration', function () {
      this.loadConfiguration('test');
      expect(this.item).to.deep.equal(expectedData.test);
    });

    it('should load a configuration that extends and uses plugins', function () {
      this.loadConfiguration('ci');
      expect(this.item).to.deep.equal(expectedData.ci);
    });

    it('should load a configuration that extends from multiple files', function () {
      this.loadConfiguration('multiExtend');
      expect(this.item).to.deep.equal(expectedData.multiExtend);
    });

    it('should load a configuration that extends from nested configurations', function () {
      this.loadConfiguration('nested');
      expect(this.item).to.deep.equal(expectedData.nested);
    });
  });
});
