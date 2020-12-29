path = require('path')

makePath = (root...) -> (slices...) -> path.resolve(root..., slices...)

rootPath = makePath(__dirname, '..')
outputRoot = makePath(rootPath('dist'))
exampleRoot = makePath(rootPath('example'))
packagesRoot = makePath(rootPath('src'))

module.exports = {
  makePath
  rootPath
  outputRoot
  packagesRoot
  exampleRoot
}
