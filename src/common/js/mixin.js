import {mapGetters} from 'vuex'
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
