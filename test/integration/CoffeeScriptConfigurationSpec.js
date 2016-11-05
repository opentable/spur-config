import path from 'path';
import _ from 'lodash';
const spurConfig = require('../../');
const expectedData = require('./data/DataExpectations');

describe('Coffee-Script based config integration tests', () => {
  beforeEach(function () {
    this.configFixturePath = path.resolve(__dirname, '../../test/fixtures/config/coffee/');
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
      const expected = _.extend({}, expectedData.test);
      expected.coffee = true;
      expect(this.item).to.deep.equal(expected);
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
