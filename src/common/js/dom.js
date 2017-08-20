export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}
export function hasClass(el, className) {
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
export function getData(el, name, val) {
  name = 'data-' + name
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}

let elementStyle = document.createElement('div').style
let ventor = (() => {
  let ventorNames = {
    webkit: 'webkitTransfrom',
    o: 'oTransfrom',
    ms: 'msTransform',
    moz: 'mozTransfrom',
    standard: 'transform'
  }

  for (let key in ventorNames) {
    if (elementStyle[ventorNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

export function profixStyle(style) {
  if (ventor === false) {
    return false
  }
  if (ventor === 'standard') {
    return style
  }
  return ventor + style.charAt(0).toUpperCase() + style.substr(1)
}