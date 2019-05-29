const visited = new WeakSet()

module.exports = function(opts) {
  const t = opts.types

  return {
    visitor: {
      CallExpression: function(path) {
        if (path.node.callee.name === 'invariant') {
          if (visited.has(path.node)) {
            return
          }

          let moduleName = this.getModuleName()
          if (moduleName) {
            moduleName = t.stringLiteral(moduleName) + '.js'
          } else {
            try {
              moduleName = this.file.opts.filename.replace(`${this.cwd}/`, '')
            } catch (err) {
              return
            }
          }

          const location = `${moduleName}:${path.node.loc.start.line}`
          const message = path.node.arguments.length === 2 ?
            `${path.node.arguments[1].value} -- ${location}` :
            location

          const newNode = t.callExpression(
            t.identifier('invariant'), [path.node.arguments[0], t.stringLiteral(message)]
          )
          visited.add(newNode)

          path.replaceWith(newNode)
        }
      }
    }
  }
}
