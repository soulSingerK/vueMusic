<template>
  <scroll class="listview" 
          :data="data" 
          :probeType="probeType"
          :listenScroll="listenScroll"
          @scroll="scroll"
          ref="scroll" 
  >
    <ul>
      <li v-for="singers in data" class="list-group" ref="singerGroup">
        <h2 class="list-group-title">{{singers.title}}</h2>
        <ul>
          <li v-for="singer in singers.singers" class="list-group-item" @click="selected(singer)">
            <img v-lazy="singer.img" class="avatar">
            <span class="name">{{singer.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchstart" @touchmove.stop.prevent="onShortcutTouchmove">
      <ul>
        <li class="item" v-for="(item,index) in shotCutList" :data-index="index" :class="{'current': currentIndex === index}">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h2 class="fixed-title">{{fixedTitle}}</h2>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import {getData} from 'common/js/dom'
import loading from 'base/loading/loading'
const SHORT_DELTA = 18
const FIXED_TITLE = 30
export default {
  data() {
    return {
      currentIndex: 0,
      scrollY: -1,
      diff: -1
    }
  },
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  created() {
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
  },
  methods: {
    onShortcutTouchstart(e) {
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex

      this._scrollTo(anchorIndex)
    },
    onShortcutTouchmove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / SHORT_DELTA | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    selected(item) {
      this.$emit('select', item)
    },
    _scrollTo(index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index]
      this.$refs.scroll.scrollToElement(this.$refs.singerGroup[index], 0)
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    _calcHeight() {
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < this.$refs.singerGroup.length; i++) {
        let item = this.$refs.singerGroup[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calcHeight()
      }, 20)
    },
    scrollY(newY) {
      if (!newY && newY !== 0) {
        return
      }
      let listHeight = this.listHeight
      // 当在顶部滚动时 newY是大于0的
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 当在中间部分滚动时
      for (let i = 0; i < listHeight.length; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY < height2 && -newY > height1) {
          this.diff = height2 + newY
          this.currentIndex = i
          return
        }
      }
      this.currentIndex = listHeight - 2
    },
    diff(newVal) {
      let fixedTop = (newVal > 0 && newVal < FIXED_TITLE) ? newVal - FIXED_TITLE : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px ,0)`
    }
  },
  computed: {
    shotCutList() {
      return this.data.map((singer) => {
        return singer.title.substr(0, 1)
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  components: {
    Scroll,
    loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: -1px
      left: 0
      width: 100%
      .fixed-title
        height: 32px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
