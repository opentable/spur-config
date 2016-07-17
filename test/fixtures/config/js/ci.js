module.exports = function() {
  this.extends('base-ci');
  this.addLog4jsAppender({
    type: 'console'
  });

  return this.properties({
    environment: 'ci',
    prop1:'value1'
  });
};
