<template>
  <transition @enter="enter" @leave="leave" v-bindcss = false>
<div class="mini-player" v-show="this.isShowMiniPlayer">
  <div class="player-warpper">
    <div class="player-left" @click="showNormalPlayer">
      <img :src="currentSong.picUrl" alt="" ref="cdWarpper">
      <div class="player-title">
        <h3>{{currentSong.name}}</h3>
        <p>{{currentSong.singer}}</p>
      </div>
    </div>
    <div class="player-right">
      <div class="play" ref="play" @click="play"></div>
      <div class="list" @click.stop="ShowList"></div>
    </div>
  </div>
</div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'MiniPlayer',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['isShowMiniPlayer', 'isPlaying', 'currentSong'])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
        this.$refs.cdWarpper.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
        this.$refs.cdWarpper.classList.remove('active')
      }
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setIsPlaying',
      'setListPlayer'
    ]),
    ShowList () {
      this.setListPlayer(true)
    },
    showNormalPlayer () {
      this.setFullScreen(true)
      this.setMiniPlayer(false)
    },
    enter (el, done) {
      Velocity(el, 'transition.bounceUpIn', { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.bounceDownOut', { duration: 500 }, function () {
        done()
      })
    },
    play () {
      this.setIsPlaying(!this.isPlaying)
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/variable";
@import "src/assets/css/mixin";
.mini-player{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  .player-warpper{
    width: 100%;
    height: 100%;
    @include bg_color();
    display: flex;
    justify-content: space-between;
    align-items: center;
    .player-left{
      display: flex;
      padding-left:30px;
      img{
        width: 100px;
        height: 100px;
        border-radius:50%;
        margin-right: 10px;
        animation: sport 5s linear infinite;
        animation-play-state: paused;
        &.active{
          animation-play-state: running;
        }
      }
      .player-title{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h3{
          @include font_size(30px);
          color: #FFFFFF;
        }
        p{
          @include font_size(25px);
          color: #FFFFFF;
        }
      }
    }
    .player-right{
      display: flex;
      align-items: center;
      .play{
        width: 84px;
        height: 84px;
        @include bg_img('../../assets/images/play');
        &.active{
          @include bg_img('../../assets/images/pause');
        }
      }
      .list{
        width: 120px;
        height: 120px;
        @include bg_img('../../assets/images/list')
      }
    }
  }
}
@keyframes sport {
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
}
</style>
