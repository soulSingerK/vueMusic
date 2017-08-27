<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import musicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getSongList} from 'api/getRecommend'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
export default {
  data() {
    return {
      songs: []
    }
  },
  components: {
    musicList
  },
  created() {
    this._getDiscList()
  },
  methods: {
    _getDiscList() {
      if (!this.disc.dissid) {
        this.$router.push({
          path: '/recommend'
        })
        return
      }
      getSongList(this.disc.dissid).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.cdlist[0].songlist)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((song, index) => {
        if (song.songid && song.albumid) {
          ret.push(createSong(song))
        }
      })
      return ret
    }
  },
  computed: {
    ...mapGetters(['disc']),
    title() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>