<template>
  <transition @enter="enter" @leave="leave" v-bindcss = false>
<div class="normal-player" v-show="this.isFullScreen">
  <div class="player-warpper">
    <PlayerTop></PlayerTop>
    <PlayerMiddle :currentTime="currentTime"></PlayerMiddle>
    <PlayerBottom :totalTime="totalTime" :currentTime="currentTime"></PlayerBottom>
  </div>
  <div class="player-bg">
    <img :src="currentSong.picUrl" alt="">
  </div>
</div>
</transition>
</template>

<script>
import PlayerTop from './PlayerTop'
import PlayerMiddle from './PlayerMiddle'
import PlayerBottom from './PlayerBottom'
import { mapGetters, mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true
    },
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  },
  name: 'NormalPlayer',
  components: {
    PlayerTop,
    PlayerMiddle,
    PlayerBottom
  },
  computed: {
    ...mapGetters([
      'isFullScreen',
      'currentSong'
    ])
  },
  watch: {
    currentSong (newValur, oldValue) {
      this.getSongLyric(newValur.id)
    }
  },
  methods: {
    ...mapActions([
      'getSongLyric'
    ]),
    enter (el, done) {
      Velocity(el, 'transition.shrinkIn', { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: 500 }, function () {
        done()
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/mixin";
@import "src/assets/css/variable";
.normal-player{
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  @include bg_sub_color();
  .player-warpper{
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 999;
  }
  .player-bg{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    img{
      height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
  }
}
</style>
