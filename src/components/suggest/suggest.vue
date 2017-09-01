<template>
  <scroll class="suggest" 
          :data="result" 
          :rollup="rollup" 
          :beforeScroll="beforeScroll"
          @beforeScroll="listScroll"
          @scrollToEnd="searchMore" 
          ref="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result" @click="selectItem(item)">
        <div class="icon">
          <i :class="setIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDiscSongName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div class="no-result-wrapper" v-show="!hasMore && !result.length">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>
<script type="text/ecmascript-6">
  import {search} from 'api/search'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {mapMutations, mapActions} from 'vuex'
  import noResult from 'base/no-result/no-result'
  const TYPE_SINGER = 'singer'
  const perpage = 20
  export default {
    props: {
      query: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        page: 1,
        result: [],
        hasMore: true,
        beforeScroll: true,
        rollup: true
      }
    },
    methods: {
      selectItem(song) {
        if (song.type === TYPE_SINGER) {
          let singer = {
            id: song.singermid,
            name: song.singername,
            img: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${song.singermid}.jpg?max_age=2592000`
          }
          this.setSinger(singer)
          this.$router.push({
            path: `/search/${singer.id}`
          })
        } else {
          this.insertSong(song)
        }
        this.$emit('select')
      },
      search() {
        this.hasMore = true
        this.page = 1
        this.$refs.suggest.scrollTo(0, 0)
        search(this.query, this.page, this.showSinger, perpage).then(res => {
          if (res.code === ERR_OK) {
            this.result = this._handleResult(res.data)
            this.chechMore(res.data)
          }
        })
      },
      searchMore() {
        if (!this.hasMore) {
          return
        }
        this.page++
        search(this.query, this.page, this.showSinger, perpage).then(res => {
          if (res.code === ERR_OK) {
            this.result = this.result.concat(this._handleResult(res.data))
            this.chechMore(res.data)
          }
        })
      },
      setIconCls(item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      getDiscSongName(item) {
        if (item.type === TYPE_SINGER) {
          return item.singername
        } else {
          return `${item.name}-${item.singer}`
        }
      },
      chechMore(data) {
        const song = data.song
        if (!song.list.length || (song.curnum + song.curpage * perpage) >= song.totalnum) {
          this.hasMore = false
        }
      },
      refresh() {
        this.$refs.suggest.refresh()
      },
      _handleResult(data) {
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }
        if (data.song) {
          ret = ret.concat(this._toSongs(data.song.list))
        }
        return ret
      },
      _toSongs(list) {
        let ret = []
        list.forEach((item, index) => {
          if (item.songid && item.albumid) {
            ret.push(createSong(item))
          }
        })
        return ret
      },
      listScroll() {
        this.$emit('listScroll')
      },
      ...mapMutations({
        'setSinger': 'SET_SINGER'
      }),
      ...mapActions(['insertSong'])
    },
    watch: {
      query(newQuery) {
        this.search()
      }
    },
    components: {
      Scroll,
      Loading,
      noResult
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>