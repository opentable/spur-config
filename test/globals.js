global.assert = require('assert');
global.chai = require('chai');
global.sinon = require('sinon');
global.expect = global.chai.expect;

process.env.NODE_ENV = 'test';
process.setMaxListeners(1000);
