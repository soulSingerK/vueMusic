import {
  playMode
} from 'common/js/config'
import {getHistory, loadPlay, loadFavorite} from 'common/js/catch'
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: [],
  searchHistory: getHistory(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}
export default state