<template>
<div class="player-bottom">
  <div class="bottom-progress">
    <span ref="eleCurrentTime">00:00</span>
    <div class="progress-bar" @click="progressClick" ref="progressBar">
      <div class="progress-line" ref="progressLine">
        <div class="progress-dot"></div>
      </div>
    </div>
    <span ref="eleTotalTime">00:00</span>
  </div>
  <div class="bottom-controll">
    <div class="mode loop" @click="mode" ref="mode"></div>
    <div class="prev" @click="prev"></div>
    <div class="play" @click.stop="play" ref="play"></div>
    <div class="next" @click="next"></div>
    <div class="favorite" @click="favorite" :class="{'active' : isFavorite(currentSong)}"></div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import modeType from '../../store/modeType'
import { formartTime } from '../../tools/tools'
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
  name: 'PlayerBottom',
  computed: {
    ...mapGetters([
      'isPlaying',
      'ModeType',
      'currentIndex',
      'currentSong',
      'favoriteList'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
      }
    },
    ModeType  (newValue, oldValue) {
      if (newValue === modeType.loop) {
        this.$refs.mode.classList.remove('random')
        this.$refs.mode.classList.add('loop')
      } else if (newValue === modeType.one) {
        this.$refs.mode.classList.remove('loop')
        this.$refs.mode.classList.add('one')
      } else if (newValue === modeType.random) {
        this.$refs.mode.classList.remove('one')
        this.$refs.mode.classList.add('random')
      }
    },
    totalTime (newValue, oldValue) {
      let time = formartTime(newValue)
      this.$refs.eleTotalTime.innerHTML = time.minute + ':' + time.second
    },
    currentTime (newValue, oldValue) {
      // 1.格式化当前播放的时间
      let time = formartTime(newValue)
      this.$refs.eleCurrentTime.innerHTML = time.minute + ':' + time.second
      // 2.根据当前播放的时间计算比例
      let value = newValue / this.totalTime * 100
      this.$refs.progressLine.style.width = value + '%'
    }
  },
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setCurrentIndex',
      'setCurTime',
      'setFavoriteSong'
    ]),
    play () {
      this.setIsPlaying(!this.isPlaying)
    },
    mode () {
      if (this.ModeType === modeType.loop) {
        this.setModeType(modeType.one)
      } else if (this.ModeType === modeType.one) {
        this.setModeType(modeType.random)
      } else if (this.ModeType === modeType.random) {
        this.setModeType(modeType.loop)
      }
    },
    prev () {
      this.setCurrentIndex(this.currentIndex - 1)
    },
    next () {
      this.setCurrentIndex(this.currentIndex + 1)
    },
    progressClick (e) {
      // 计算进度条的位置
      // let normalLeft = e.target.offsetLeft
      let normalLeft = this.$refs.progressBar.offsetLeft
      let eventLeft = e.pageX
      let clickleft = eventLeft - normalLeft
      // let progressWidth = e.target.offsetWidth
      let progressWidth = this.$refs.progressBar.offsetWidth
      let value = clickleft / progressWidth
      this.$refs.progressLine.style.width = value * 100 + '%'
      //  计算当前应该从什么位置进行播放
      let currentTime = this.totalTime * value
      this.setCurTime(currentTime)
    },
    favorite () {
      this.setFavoriteSong(this.currentSong)
    },
    isFavorite (song) {
      let result = this.favoriteList.find(function (currentValue) {
        return currentValue.id[0] === song.id[0]
      })
      return result !== undefined
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/mixin";
@import "src/assets/css/variable";
.player-bottom{
  @include font_size(30px);
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  .bottom-progress{
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    span{
      @include font_color()
    }
    .progress-bar{
      width: 100%;
      margin: 0 10px;
      height: 10px;
      background: #fff;
      .progress-line{
        width: 0%;
        height: 100%;
        position: relative;
        background: #ccc;
        .progress-dot{
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  .bottom-controll{
    display: flex;
    width: 80%;
    margin: 0 auto;
    padding: 50px 100px;
    justify-content: space-around;
    align-items: center;
    div{
      width: 84px;
      height: 84px;
    }
      .mode{
      @include bg_img('../../assets/images/loop');
        &.loop{
          @include bg_img('../../assets/images/loop');
        }
        &.one{
          @include bg_img('../../assets/images/one');
        }
        &.random{
          @include bg_img('../../assets/images/shuffle');
        }
      }
      .prev{
        @include bg_img('../../assets/images/prev')
      }
      .play{
        @include bg_img('../../assets/images/play');
        &.active{
          @include bg_img('../../assets/images/pause');
        }
      }
      .next{
        @include bg_img('../../assets/images/next');
      }
      .favorite{
        @include bg_img('../../assets/images/un_favorite');
        &.active{
          @include bg_img('../../assets/images/favorite');
        }
      }

  }
}
</style>
