spur = require "spur-ioc"

module.exports = ()->

  ioc = spur.create("spur-config")

  ioc.registerDependencies {
    nodeProcess:process
  }

  ioc.registerLibraries {
    path  : "path"
    _     :  "lodash"
    requireAll:"require-all"
    mkdirp:"mkdirp"
  }

  ioc.registerFolders __dirname, [
    "framework"
  ]


  ioc