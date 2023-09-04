require('gsap/CSSPlugin')
require('./CustomEase')
require('./DrawSVGPlugin')

CustomEase.create('material-enter', 'M0,0 C0,0 0.2,1 1,1')
CustomEase.create('material-exit', 'M0,0 C0.4,0 1,1 1,1')
CustomEase.create('material-exit-temporary', 'M0,0 C0.4,0 0.6,1 1,1')
CustomEase.create('material-default', 'M0,0 C0.4,0 0.2,1 1,1')
