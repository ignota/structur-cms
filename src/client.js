import FontFaceObserver from 'fontfaceobserver/fontfaceobserver.standalone'
import { setAutoFreeze } from 'immer'

setAutoFreeze(__DEV__)

;(() => {
  require('vendor/gsap')
  require('app')
})()

const canStoreIn = storage => {
  try {
    const store = window[storage]
    const key = '__storage_test__'

    store.setItem(key, 'ok')
    store.removeItem(key)

    return true
  } catch {
    return false
  }
}

const CRITICAL_PRIMARY = [
  { family: 'SF Pro Text', weight: 400 },
  { family: 'SF Pro Text', weight: 500 },
  { family: 'SF Pro Text', weight: 700 },
]

const importPrimary = async () => {
  try {
    require('vendor/fonts/sf-pro-text/index.css')

    if (!localStorage.getItem('primary')) {
      const observers = CRITICAL_PRIMARY.map(spec => {
        const { family, ...opts } = spec
        const observer = new FontFaceObserver(family, opts)
        return observer.load()
      })

      await Promise.all(observers)

      if (!__DEV__ && canStoreIn('localStorage')) localStorage.setItem('primary', 'true')
    }

    return true
  } catch {
    return false
  }
}

Promise.all([
  importPrimary(),
]).then(([primary]) => {
  const html = document.querySelector('html')

  requestAnimationFrame(() => {
    if (primary) html.classList.add('primary')
  })
})
