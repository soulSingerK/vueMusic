import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {getRandList} from 'common/js/utils'
import {saveSearch, deleteSearch, clearSearch} from 'common/js/catch'
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