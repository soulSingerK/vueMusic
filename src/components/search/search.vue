<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="setQuery"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query" ref="shortcutWrapper">
      <scroll class="shortcut" :data="shortcut" ref="shortcut" :refreshDelay="refreshDelay">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class="item" v-for="item in hotKeys" @click="addQueryVal(item.k)">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="cleanSearchHistory">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list 
              :searches="searchHistory"
              @select="addQueryVal"
              @delete="deleteHistory"
            ></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <suggest :query="query"
               @listScroll="inputBlur" 
               @select="saveSearch"
               ref="suggest"
               ></suggest>
    </div>
    <confirm ref="confirm" title="是否清空所有搜索历史" confirmBtnText="清空"  @confirm="clearHistory"></confirm>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import searchBox from 'base/search-box/search-box'
  import {getHotKey} from 'api/search'
  import {ERR_OK} from 'api/config'
  import Suggest from 'components/suggest/suggest'
  import {mapActions} from 'vuex'
  import searchList from 'base/search-list/search-list'
  import Confirm from 'base/confirm/confirm'
  import Scroll from 'base/scroll/scroll'
  import {playListMixin, searchMixin} from 'common/js/mixin'
  export default {
    mixins: [playListMixin, searchMixin],
    created() {
      this._getHotKey()
    },
    data() {
      return {
        hotKeys: []
      }
    },
    methods: {
      handlePlayList(list) {
        let bottom = list.length > 0 ? '60px' : ''

        this.$refs.shortcutWrapper.style.bottom = bottom
        this.$refs.shortcut.refresh()

        this.$refs.searchResult.style.bottom = bottom
        this.$refs.suggest.refresh()
      },
      cleanSearchHistory() {
        this.$refs.confirm.show()
      },
      _getHotKey() {
        getHotKey().then((res) => {
          if (res.code === ERR_OK) {
            this.hotKeys = res.data.hotkey.slice(0, 10)
          }
        })
      },
      ...mapActions(['clearHistory'])
    },
    computed: {
      shortcut() {
        return this.searchHistory.concat(this.hotKeys)
      }
    },
    watch: {
      query(newQuery, oldQuery) {
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.shortcut.refresh()
          }, 20)
        }
      }
    },
    components: {
      searchBox,
      Suggest,
      searchList,
      Confirm,
      Scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>