module.exports = function() {
  this.extends('ci');
  this.extends('sub/urls');

  return this.properties({
    environment: 'nested',
    Port: 8080
  });
};
