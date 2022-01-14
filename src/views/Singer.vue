<template>
  <div class="singer">
    <ScrollView ref="scrollView">
      <ul class="list-wrapper">
        <li class="list-group" v-for="(value, index) in list" :key="index" ref="group">
          <h2 class="group-title">{{keys[index]}}</h2>
          <ul>
            <li  class="group-item" v-for="value in list[index]" :key="value.id" @click.stop="switchSinger(value.id)">
               <img v-lazy="value.img1v1Url" alt="">
               <p>{{value.name}}</p>
            </li>
          </ul>
        </li>
      </ul>
    </ScrollView>
    <ul class="list-keys">
<!--      <li v-for="(key, index) in keys" :key="key" @click.stop="clickKey(index)" :class="{'active': currentIndex===index}">-->
<!--        {{key}}-->
<!--      </li>-->
      <li v-for="(key, index) in keys" :key="key" @touchstart.stop.prevent="touchstart"
          @touchmove.stop.prevent="touchmove"
          :data-index="index"
          :class="{'active': currentIndex===index}">
        {{key}}
      </li>
    </ul>
    <div class="fix-title" v-show="fixTitle !== ''" ref="fixTitle">
      {{fixTitle}}
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getAllArtists } from '../api/index'
import ScrollView from '../components/ScrollView'
export default {
  name: 'Singer',
  components: {
    ScrollView
  },
  data () {
    return {
      keys: [],
      list: [],
      groupsTop: [],
      currentIndex: 0,
      beginOffsetY: 0,
      moveOffsetY: 0,
      scrollY: 0
    }
  },
  created () {
    getAllArtists().then(res => {
      this.keys = res.keys
      this.list = res.list
    })
  },
  watch: {
    list () {
      // console.log(this.$refs.group)
      this.$nextTick(() => {
        this.$refs.group.forEach((group) => {
          this.groupsTop.push(group.offsetTop)
        })
        console.log(this.groupsTop)
      })
    },
    fixTitle () {
      this.$nextTick(() => {
        this.fixTitleHeight = this.$refs.fixTitle.offserHeight
      })
    }
  },
  computed: {
    fixTitle () {
      if (this.scrollY >= 0) {
        return ''
      } else {
        return this.keys[this.currentIndex]
      }
    }
  },
  mounted () {
    this.$refs.scrollView.scrolling((y) => {
      this.scrollY = y
      // 处理第一个
      // console.log(parseInt(-y))
      if (y >= 0) {
        this.currentIndex = 0
        return
      }
      // 处理中间
      for (let i = 0; i < this.groupsTop.length - 1; i++) {
        let preTop = this.groupsTop[i]
        let nextTop = this.groupsTop[i + 1]
        if (-y >= preTop && -y <= nextTop) {
          this.currentIndex = i
          let diffOffsetY = nextTop + y
          let fixTitletOffserY = 0
          if (diffOffsetY >= 0 && diffOffsetY <= this.fixTitleHeight) {
            fixTitletOffserY = diffOffsetY - this.fixTitleHeight
          } else {
            fixTitletOffserY = 0
          }
          if (fixTitletOffserY === this.fixTitletOffserY) {
            return
          }
          this.fixTitletOffserY = fixTitletOffserY
          this.$refs.fixTitle.style.transform = `translateY(${fixTitletOffserY}px)`
          return
        }
      }
      // 处理最后
      this.currentIndex = this.groupsTop.length - 1
    })
  },
  methods: {
    clickKey (index) {
      this.currentIndex = index
      let offsetY = this.groupsTop[index]
      this.$refs.scrollView.scrollTo(0, -offsetY)
    },
    touchstart (e) {
      let index = parseInt(e.target.dataset.index)
      this.beginOffsetY = e.touches[0].pageY
      this.clickKey(index)
    },
    touchmove (e) {
      this.moveOffsetY = e.touches[0].pageY
      let offsetY = (this.moveOffsetY - this.beginOffsetY) / e.target.offsetHeight
      let index = parseInt(e.target.dataset.index) + Math.floor(offsetY)
      if (index < 0) {
        index = 0
      } else if (index > this.keys.length - 1) {
        index = this.keys.length - 1
      }
      this.clickKey(index)
    },
    switchSinger (id) {
      this.$router.push({
        path: `/singer/defail/${id}/singer`
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/variable";
@import "src/assets/css/mixin";
.singer{
  position: fixed;
  top: 184px;
  left: 0;
  bottom: 0;
  right: 0;
  @include bg_sub_color();
  overflow: hidden;
  .list-wrapper{
    //width: 100%;
    //height: 100%;
    .list-group{
      .group-title{
        @include bg_color();
        @include font_size(30px);
        margin: 10px 20px;
      }
      .group-item{
        display: flex;
        justify-content: flex-start;
        padding: 10px 20px;
        border-bottom: 1px solid #FFFFFF;
        img{
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
        }
        p{
          @include font_size(30px);
          @include font_color();
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 20px;
        }
      }
    }
  }
  .list-keys{
    position: fixed;
    right: 10px;
    top: 60%;
    transform: translateY(-50%);
    li{
      @include font_color();
      @include font_size(30px);
      padding: 3px 0;
      &.active{
        text-shadow: 0 0 10px #000000;
      }
    }
  }
  .fix-title {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    padding: 10px 20px;
    @include font_size(30px);
    color: #FFFFFF;
    @include bg_color();
    box-sizing: border-box;
  }

}
.v-enter{
  transform: translateX(100%);
}
.v-enter-to{
  transform: translateX(0%);
}
.v-enter-active{
  transition: transform 1s;
}
.v-leave{
  transform: translateX(0%);
}
.v-leave-to{
  transform: translateX(100%);
}
.v-leave-active{
  transition: transform 1s;
}
</style>
