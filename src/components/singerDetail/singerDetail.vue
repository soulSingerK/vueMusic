<template>
   <transition name="slide">
     <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
   </transition>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import musicList from 'components/music-list/music-list'
export default {
  data() {
    return {
      songs: []
    }
  },
  created() {
    this._getSingerDetail()
  },
  methods: {
    _getSingerDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._handlerData(res.data.list)
        }
      })
    },
    _handlerData(list) {
      let ret = []
      list.forEach((item) => {
        let songData = item.musicData
        ret.push(createSong(songData))
      })
      return ret
    }
  },
  computed: {
    ...mapGetters(['singer']),
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.img
    }
  },
  components: {
    musicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
