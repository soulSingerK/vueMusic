import {mapGetters, mapMutations} from 'vuex'
import {getRandList} from 'common/js/utils'
import {playMode} from 'common/js/config'
export const playListMixin = {
  mounted() {
    this.handlePlayList(this.playlist)
  },
  activated() {
    this.handlePlayList(this.playlist)
  },
  watch: {
    playlist(newval) {
      this.handlePlayList(newval)
    }
  },
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  methods: {
    handlePlayList(list) {
      throw new Error('need handlePlayList')
    }
  }
}

export const playModeMixin = {
  methods: {
    changeMode() {
      let mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = []
      if (mode === playMode.random) {
        list = getRandList(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlayList(list)
      if (!this.playing) {
        this.setPlayingState(true)
      }
    },
    resetCurrentIndex(list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.changeCurrentIndex(index)
    },
    ...mapMutations({
      changeCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayList: 'SET_PLAYLIST',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayingState: 'SET_PLAYING_STATE'
    })
  },
  computed: {
    ...mapGetters(['sequenceList', 'currentSong', 'playing']),
    playMode() {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    }
  }
}
