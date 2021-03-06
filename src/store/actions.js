import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {getRandList} from 'common/js/utils'
import {saveSearch, deleteSearch, clearSearch, savePlay, saveFavorite, deleteFavorite} from 'common/js/catch'
export const selectPlay = function({
  commit,
  state
}, {
  list,
  index
}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = getRandList(list)
    index = findIndex(randomList, list[index])
    commit(types.SET_PLAYLIST, randomList)
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
export const random = function({
  commit,
  state
}, {
  list
}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randList = getRandList(list)
  commit(types.SET_PLAYLIST, randList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
function findIndex(list, song) {
  let index = list.findIndex((item) => {
    return item.id === song.id
  })
  return index
}

// 插入一首歌到当前播放列表
export function insertSong ({commit, state}, song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let currentSong = playlist[currentIndex]

  currentIndex++
  let fpIndex = findIndex(playlist, song)

  playlist.splice(currentIndex, 0, song)

  if (fpIndex > -1) {
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }

  let currentsIndex = findIndex(sequenceList, currentSong) + 1
  let fsIndex = findIndex(sequenceList, song)
  sequenceList.splice(currentsIndex, 0, song)
  if (fsIndex > -1) {
    if (currentsIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export function deleteSong({commit, state}, song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex

  let pIndex = findIndex(playlist, song)
  playlist.splice(pIndex, 1)
  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)
  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  if (!playlist.length) {
    commit(types.SET_PLAYING_STATE, false)
  } else {
    commit(types.SET_PLAYING_STATE, true)
  }
}

export function deleteSongList({commit, state}) {
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYING_STATE, false)
}

// 搜索历史
export function saveSearchHistory({commit}, query) {
  let searches = saveSearch(query)
  commit(types.SEARCH_HISTORY, searches)
}

export function deleteHistory({commit}, query) {
  commit(types.SEARCH_HISTORY, deleteSearch(query))
}

export function clearHistory({commit}) {
  commit(types.SEARCH_HISTORY, clearSearch())
}

export function savePlayHistory({commit, state}, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}

// 我喜欢的
export function saveFavoriteList({commit}, song) {
  commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

export function deleteFavoriteList({commit}, song) {
  commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}