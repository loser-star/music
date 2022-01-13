<template>
  <ul class="detail-bottom">
    <li class="bottom-top" @click="selectAllMusic">
      <div class="bottom-icon"></div>
      <div class="bottom-title">播放全部</div>
    </li>
    <li v-for="item in playlist" :key="item.id" @click="selectMusic(item.id)">
      <h3>{{item.name}}</h3>
      <p>{{item.al.name}} - {{item.ar[0].name}}</p>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    playlist: {
      type: Array
    }
  },
  name: 'DetailBottom',
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setFullScreen',
      'setMiniPlayer',
      'setListPlayer',
      'setSongsDetail'
    ]),
    selectMusic (id) {
      // this.$store.dispatch('setFullScreen', true)
      console.log(1)
      this.setIsPlaying(true)
      this.setFullScreen(true)
      this.setMiniPlayer(false)
      this.setListPlayer(false)
      this.setSongsDetail([ id ])
    },
    selectAllMusic () {
      this.setFullScreen(true)
      this.setMiniPlayer(false)
      this.setListPlayer(false)
      let ids = this.playlist.map(function (item) {
        return item.id
      })
      this.setSongsDetail(ids)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
@import "../../assets/css/variable";
.detail-bottom{
  z-index: 1999;
  width: 100%;
  li{
    width: 100%;
    height: 100px;
    padding: 20px;
    box-sizing: border-box;
    @include bg_sub_color();
    list-style: none;
    margin-top: 2px;
    border-bottom: 1px solid #cccccc;
    @include border_color();
    background: #FFFFFF;
    h3{
      @include font_color();
      @include font_size(30px);
      @include clamp(1);
    }
    p{
      @include font_color();
      @include font_size(25px);
      opacity: 0.8;
      @include clamp(1);
    }
  }
  .bottom-top{
    background: #FFFFFF;
    display: flex;
    align-items: center;
    border-top-left-radius:20px;
    border-top-right-radius:20px;
    .bottom-icon{
      width: 60px;
      height: 60px;
      @include bg_img('../../assets/images/small_play');
      margin-right: 20px;
    }
    .bottom-title{
      @include font_color();
      @include font_size(30px);

    }
  }
}
</style>
