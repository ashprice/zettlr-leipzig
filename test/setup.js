/**
 * @ignore
 * BEGIN HEADER
 *
 * CVM-Role:        <none>
 * Maintainer:      Hendrik Erz
 * License:         GNU GPL v3
 *
 * Description:     Setup the test environment.
 *
 * END HEADER
 */

import { JSDOM } from 'jsdom'

/**
 * Emulates a browser environment, which is required for some tests (especially if Vue is involved).
 * Code is essentially taken from https://github.com/enzymejs/enzyme/blob/master/docs/guides/jsdom.md.
 */
function mockBrowser () {
  const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
  const { window } = jsdom

  function copyProps (src, target) {
    Object.defineProperties(target, {
      ...Object.getOwnPropertyDescriptors(src),
      ...Object.getOwnPropertyDescriptors(target)
    })
  }

  global.window = window
  global.document = window.document
  global.navigator = {
    userAgent: 'node.js'
  }
  global.requestAnimationFrame = function (callback) {
    return setTimeout(callback, 0)
  }
  global.cancelAnimationFrame = function (id) {
    clearTimeout(id)
  }
  copyProps(window, global)
}

mockBrowser()
