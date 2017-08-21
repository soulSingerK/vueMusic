<template>
  <div class="progress-bar" ref="progressBar" @click="progressBarClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart.prevent="onProgressTouchStart"
           @touchmove.prevent="onProgressTouchMove"
           @touchend="onProgressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {profixStyle} from 'common/js/dom'
const transform = profixStyle('transform')
const progressBtnWidth = 16
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.touch = {}
  },
  methods: {
    onProgressTouchStart(e) {
      this.touch.initable = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    onProgressTouchMove(e) {
      if (!this.touch.initable) {
        return
      }
      const delta = e.touches[0].pageX - this.touch.startX
      let offsetWidth = delta + this.touch.left
      this._offset(offsetWidth)
    },
    onProgressTouchEnd(e) {
      this.touch.initable = false
      let percent = this.changeOffset()
      this.$emit('changePercent', percent)
    },
    _offset(offsetWidth) {
      this.$refs.progress.style.width = offsetWidth + 'px'
      this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
    },
    progressBarClick(e) {
      this._offset(e.offsetX)
      this.onProgressTouchEnd()
    },
    changeOffset() {
      return this.$refs.progress.clientWidth / (this.$refs.progressBar.clientWidth - progressBtnWidth)
    }
  },
  watch: {
    percent(newPercent) {
      if (newPercent > 0 && !this.touch.initable) {
        let progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        let offsetWidth = newPercent * progressBarWidth
        this._offset(offsetWidth)
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
