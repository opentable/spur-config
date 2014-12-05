fs             = require "fs"
mkdirp         = require "mkdirp"

module.exports = (SpurConfig, path)->

  class SpurConfigGenerator

    constructor:(@srcFolder, @destFolder)->

    @generate:(srcFolder, destFolder)->
      new SpurConfigGenerator(srcFolder, destFolder)
        .generate()


    generate:()->
      files = fs.readdirSync(@srcFolder)
      mkdirp.sync(@destFolder)
      for f in files
        if fs.lstatSync(path.join(@srcFolder, f)).isFile()
          spurConfig = SpurConfig.load(@srcFolder, f)
          destFile = path.join(@destFolder, path.basename(f)+".js")
          fs.writeFileSync(destFile, spurConfig.toJSONString())