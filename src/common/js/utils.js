export function getRandList(list) {
  let _list = list.slice()
  for (let i = 0; i < _list.length; i++) {
    let j = getRandom(0, i)
    let t = _list[j]
    _list[j] = _list[i]
    _list[i] = t
  }
  return list
}
function getRandom (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// 节流（函数）
export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}