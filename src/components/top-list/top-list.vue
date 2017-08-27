<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="imgUrl" :rank="rank"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import musicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getMusicList} from 'api/rank'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  export default {
    data() {
      return {
        songs: [],
        rank: true
      }
    },
    created() {
      this._getTopList()
    },
    methods: {
      _getTopList() {
        if (!this.topList.id) {
          this.$router.push({
            path: '/rank'
          })
          return
        }
        getMusicList(this.topList.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeTopList(res.songlist)
          }
        })
      },
      _normalizeTopList(list) {
        let ret = []
        list.forEach((musicData, index) => {
          let data = musicData.data
          if (data.songid && data.albumid) {
            ret.push(createSong(data))
          }
        })
        return ret
      }
    },
    computed: {
      title() {
        return this.topList.topTitle
      },
      imgUrl() {
        if (this.songs.length) {
          return this.songs[0].image
        }
        return ''
      },
      ...mapGetters(['topList'])
    },
    components: {
      musicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>