<template>
   <div class="music-list">
   	<div class="back" @click="back">
   		<i class="icon-back"></i>
   	</div>
   	<h1 class="title">{{title}}</h1>
   	<div class="bg-image" :style="bgStyle" ref="bgStyle">
      <div class="play-wrapper" v-show="songs.length>0" ref="playBtn">
        <div class="play" @click="randomPlay">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
   		<div class="filter"></div>
   	</div>
    <div class="bg-layer" ref="layer"></div>
    <scroll @scroll="scroll" class="list" :data="songs" ref="wrap" :probe-type="probeType" :listen-scroll="listenScroll">
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="select" :rank="rank"></song-list>
      </div>
      <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
   </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import songList from 'base/song-list/song-list'
  import {profixStyle} from 'common/js/dom'
  import loading from 'base/loading/loading'
  import {mapActions} from 'vuex'
  import {playListMixin} from 'common/js/mixin'
  const transform = profixStyle('transform')
  const RESERVE_HEIGHT = 40
  export default {
    mixins: [playListMixin],
    data() {
      return {
        scrollY: 0
      }
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
      bgImage: {
        type: String,
        default: ''
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
    },
    computed: {
      bgStyle() {
        return `background-image: url(${this.bgImage})`
      }
    },
    mounted() {
      this.bgClientHeight = this.$refs.bgStyle.clientHeight
      this.minHeight = -this.bgClientHeight + RESERVE_HEIGHT
      this.$refs.wrap.$el.style.top = this.bgClientHeight + 'px'
    },
    methods: {
      handlePlayList(list) {
        const bottom = list.length > 0 ? '60px' : ''
        this.$refs.wrap.$el.style.bottom = bottom
        this.$refs.wrap.refresh()
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      back() {
        return this.$router.back()
      },
      select(item, index) {
        this.selectPlay({
          list: this.songs,
          index
        })
      },
      randomPlay() {
        this.random({
          list: this.songs
        })
      },
      ...mapActions(['selectPlay', 'random'])
    },
    watch: {
      scrollY(newY) {
        let zIndex = 0
        let scale = 1
        let layTop = Math.max(newY, this.minHeight)
        this.$refs.layer.style[transform] = `translate3d(0,${layTop}px,0)`
        if (newY < this.minHeight) {
          zIndex = 10
          this.$refs.bgStyle.style.paddingTop = 0
          this.$refs.bgStyle.style.height = RESERVE_HEIGHT + 'px'
          this.$refs.playBtn.style.display = 'none'
        } else {
          this.$refs.bgStyle.style.paddingTop = '70%'
          this.$refs.bgStyle.style.height = 0
          this.$refs.playBtn.style.display = ''
        }
        // 放大图片效果
        let percent = Math.abs(newY / this.minHeight)
        if (newY > 0) {
          zIndex = 10
          scale = 1 + percent
        }
        this.$refs.bgStyle.style.zIndex = zIndex
        this.$refs.bgStyle.style[transform] = `scale(${scale})`
      }
    },
    components: {
      Scroll,
      songList,
      loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
