var path              = require("path");
global.chai           = require('chai');
global.expect         = chai.expect
global.srcDir         = path.resolve(__dirname, "../src");
global.rootDir        = path.resolve(__dirname, "../");

process.env.NODE_ENV = "test";
process.setMaxListeners(1000);