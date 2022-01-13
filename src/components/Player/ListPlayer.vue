<template>
  <transition @enter="enter" @leave="leave" v-bindcss = false>
<div class="list-player" v-show="this.isShowPlayer">
 <div class="player-warpper">
   <div class="player-top">
     <div class="top-left">
       <div class="mode loop" ref="mode" @click="mode"></div>
       <p ref="loop">顺序播放</p>
     </div>
     <div class="top-right">
       <div class="del" @click="delAll"></div>
     </div>
   </div>
   <div class="player-middle">
       <ScrollView ref="scrollView">
         <ul ref="play">
           <li class="item" v-for="(item, index) in songs" :key="index" @click="selectMusic(index)">
             <div class="item-left">
               <div class="item-play" @click="play" v-show="currentIndex === index"></div>
               <p>{{ item.name }}</p>
             </div>
             <div class="item-right">
               <div class="item-favorite" @click.stop="favorite(index)" :class="{'active' : isFavorite(index)}"></div>
               <div class="item-del" @click.stop="del(index)"></div>
             </div>
           </li>
         </ul>
       </ScrollView>
   </div>
   <div class="player-bottom">
     <p @click="hidden">关闭</p>
   </div>
 </div>
</div>
  </transition>
</template>

<script>
import ScrollView from '../ScrollView'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { mapGetters, mapActions } from 'vuex'
import modeType from '../../store/modeType'
export default {
  name: 'ListPlayer',
  components: {
    ScrollView
  },
  computed: {
    ...mapGetters(['isPlaying', 'ModeType', 'isShowPlayer', 'songs', 'currentIndex', 'favoriteList', 'currentSong'])
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
        this.$refs.loop.innerHTML = '顺序播放'
        this.$refs.mode.classList.add('loop')
      } else if (newValue === modeType.one) {
        this.$refs.mode.classList.remove('loop')
        this.$refs.mode.classList.add('one')
        this.$refs.loop.innerHTML = '单曲循环'
      } else if (newValue === modeType.random) {
        this.$refs.mode.classList.remove('one')
        this.$refs.mode.classList.add('random')
        this.$refs.loop.innerHTML = '随机播放'
      }
    },
    isShowPlayer (newValue, oldValue) {
      if (newValue) {
        this.$refs.scrollView.refresh()
      }
    }
  },
  methods: {
    ...mapActions(['setIsPlaying', 'setModeType', 'setListPlayer', 'setDelSong', 'setCurrentIndex', 'setFavoriteSong']),
    hidden () {
      this.setListPlayer(false)
    },
    enter (el, done) {
      Velocity(el, 'transition.perspectiveUpIn', { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.perspectiveUpOut', { duration: 500 }, function () {
        done()
      })
    },
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
    del (index) {
      this.setDelSong(index)
    },
    delAll () {
      this.setDelSong()
    },
    selectMusic (index) {
      this.setCurrentIndex(index)
      // console.log(1)
    },
    favorite (value) {
      this.setFavoriteSong(this.songs[value])
    },
    isFavorite (song) {
      let result = this.favoriteList.find((currentValue) => {
        console.log(currentValue.id[0] === this.songs[song].id[0])
        return currentValue.id[0] === this.songs[song].id[0]
      })
      return result !== undefined
    }
  }

}
</script>

<style scoped lang="scss">
@import "src/assets/css/variable";
@import "src/assets/css/mixin";
.list-player{
  position: fixed;
  @include bg_sub_color();
  left: 0;
  bottom: 0;
  width: 100%;
  .player-warpper{
    .player-top{
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-left{
        display: flex;
        align-items: center;
        padding-left: 20px;
        .mode{
          width: 56px;
          height: 56px;
          @include bg_img('../../assets/images/small_loop');
          &.loop{
            @include bg_img('../../assets/images/small_loop');
          }
          &.one{
            @include bg_img('../../assets/images/small_one');
          }
          &.random{
            @include bg_img('../../assets/images/small_shuffle');
          }
        }
        p{
          padding-left: 20px;
          @include font_color();
          @include font_size(25px);
        }
      }
      .top-right{
        .del{
          width: 80px;
          height: 80px;
          @include bg_img('../../assets/images/small_del')
        }
      }
    }
    .player-middle{
      width: 100%;
      height: 700px;
      overflow: hidden;
      ul{
        &.active{
          .item{
            .item-play{
              @include bg_img('../../assets/images/small_pause');
              margin-right: 30px;
            }
          }
        }
      }
      .item{
        border-top: 1px solid #cccccc;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        .item-left{
          display: flex;
          align-items: center;
          .item-play{
            width: 56px;
            height: 56px;
            @include bg_img('../../assets/images/small_play');
            margin-right: 30px;
          }
          p{
            @include font_size(30px);
            @include font_color();
          }
        }
        .item-right{
          display: flex;
          align-items: center;
          .item-favorite{
            width: 56px;
            height: 56px;
            @include bg_img('../../assets/images/small_un_favorite');
            &.active{
              @include bg_img('../../assets/images/favorite');
            }
          }
          .item-del{
            width: 50px;
            height: 50px;
            @include bg_img('../../assets/images/small_close');
            margin-left: 20px;
          }
        }
      }
    }
  }
  .player-bottom{
    width: 100%;
    height: 100px;
    @include bg_color();
    line-height: 100px;
    p{
      text-align: center;
      @include font_size(30px);
      color: #FFFFFF;
    }
  }
}
</style>
