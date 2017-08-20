<template>
  <div class="singer">
    <singer-view :data="singerList" @select="select"></singer-view>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { getSinger } from 'api/singer'
import { ERR_OK } from 'api/config'
import singerView from 'base/singerView/singerview'
import {mapMutations} from 'vuex'
const HOT_NAME = '热门'
const HOT_SINGERLEN = 10
export default {
  data() {
    return {
      singerList: []
    }
  },
  created() {
    this._getSinger()
  },
  components: {
    singerView
  },
  methods: {
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    select(singer) {
      this.setSinger(singer)
      this.$router.push({
        path: `/singer/${singer.id}`
      })
    },
    _getSinger() {
      getSinger().then((data) => {
        if (data.code === ERR_OK) {
          let list = data.data.list
          this.singerList = this._handleSingerData(list)
        }
      })
    },
    _handleSingerData(list) {
      let result = {
        hot: {
          title: HOT_NAME,
          singers: []
        }
      }
      for (let index = 0; index < list.length; index++) {
        let singer = list[index]
        if (index < HOT_SINGERLEN) {
          result.hot.singers.push({
            name: singer.Fsinger_name,
            id: singer.Fsinger_mid,
            img: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${singer.Fsinger_mid}.jpg?max_age=2592000`
          })
        }
        var key = singer.Findex
        if (!result[key]) {
          result[key] = {
            title: key,
            singers: []
          }
        }
        result[key].singers.push({
          name: singer.Fsinger_name,
          id: singer.Fsinger_mid,
          img: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${singer.Fsinger_mid}.jpg?max_age=2592000`
        })
      }
      let hot = []
      let ret = []
      for (let i in result) {
        let singer = result[i]
        if (singer.title.match(/[a-zA-Z]/)) {
          ret.push(singer)
        } else if (singer.title === HOT_NAME) {
          hot.push(singer)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
</style>
