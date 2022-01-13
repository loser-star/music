<template>
  <div class="user-bottom">
    <div class="bottom-play" @click="selectAllMusic">
      <span></span>
      <span>播放全部</span>
    </div>
    <div class="bottom-wrapper">
      <ScrollView>
        <SongListItem :songs="switchNum === 0 ? favoriteList : historyList"></SongListItem>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import ScrollView from '../ScrollView'
import SongListItem from '../SongListItem'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  props: {
    switchNum: {
      type: Number,
      default: 0
    }
  },
  name: 'UserBottom',
  components: {
    ScrollView,
    SongListItem
  },
  computed: {
    ...mapGetters(['favoriteList', 'historyList'])
  },
  methods: {
    ...mapActions(['setFullScreen', 'setMiniPlayer', 'setListPlayer', 'setSongsDetail', 'setCurrentIndex']),
    ...mapMutations(['SET_SONG_DETALL']),
    selectAllMusic () {
      this.setCurrentIndex(0)
      this.setFullScreen(true)
      this.setMiniPlayer(false)
      this.setListPlayer(false)
      // let ids = []
      if (this.switchNum === 0) {
        // ids = this.playlist.map(function (item) {
        //   return item.id
        // })
        this.SET_SONG_DETALL(this.favoriteList)
      } else {
        // ids = this.playlist.map(function (item) {
        //   return item.id
        // })
        this.SET_SONG_DETALL(this.historyList)
      }
      // this.setSongsDetail(ids)
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/mixin";
@import "src/assets/css/variable";
.user-bottom {
  position: fixed;
  top: 100px;
  left: 0;
  bottom: 0;
  right: 0;
  .bottom-play{
    width: 260px;
    height: 80px;
    margin: 20px auto;
    @include font_size(30px);
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #FFFFFF;
    border-radius: 40px;
    @include border_color();
    @include font_color();
    span{
      &:nth-child(1){
        width: 46px;
        height: 46px;
        @include bg_img('../../assets/images/small_play');
        margin-right: 20px;
      }
    }
  }
  .bottom-wrapper {
    position: fixed;
    top: 220px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }
}
</style>
