import storage from 'good-storage'
const SEARCH_KEY = '__search__'
const MAXLENGTH = 15

const PLAY_KEY = '__play__'
const PLAY_MAXLENGTH = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAXLENGTH = 200

export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insetArray(searches, query, (item) => {
    return item === query
  }, MAXLENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function getHistory() {
  return storage.get(SEARCH_KEY, [])
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}
export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}
export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insetArray(songs, song, (item) => {
    return song.id === item.id
  }, PLAY_MAXLENGTH)
  storage.set(PLAY_KEY, songs)
  return songs
}
export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])

  insetArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAXLENGTH)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}

export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])

  deleteFromArray(songs, (item) => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}
function insetArray(arr, query, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(query)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}