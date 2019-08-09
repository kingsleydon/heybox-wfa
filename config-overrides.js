module.exports = function override(config) {
  require('react-app-rewire-postcss')(config, true)
  config.module.rules.splice(1, 1)

  return config
}
