export function getRandList(list) {
  for (let i = 0; i < list.length; i++) {
    let j = getRandom(0, i)
    let t = list[j]
    list[j] = list[i]
    list[i] = t
  }
  return list
}
function getRandom (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}