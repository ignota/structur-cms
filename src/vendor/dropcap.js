const { canUseDOM } = require('exenv')

if (canUseDOM) {
  const { Dropcap } = require('dropcap.js')
  module.exports = Dropcap

} else {
  const Dropcap = {
    layout() {},
    reactServerShim: true,
  }

  module.exports = Dropcap
}
