<template>
  <div class="header" @click="changTheme">
    <div class="header-left" @click.stop="back"></div>
    <ul class="header-title">
      <li :class="{'active': switchNum === 0}" @click.stop="switchItem(0)">我喜欢的</li>
      <li :class="{'active': switchNum === 1}" @click.stop="switchItem(1)">最近播放</li>
    </ul>
    <div class="header-right"></div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String
    }
  },
  name: 'UserHeader',
  data () {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0,
      switchNum: 0
    }
  },
  // watch: {
  //   switchNum (newValue, oldValue) {
  //     this.$emit('NewswitchNum', newValue)
  //   }
  // },
  methods: {
    changTheme () {
      this.index++
      if (this.index >= this.themes.length) {
        this.index = 0
      }
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
    },
    back () {
      window.history.back()
    },
    switchItem (index) {
      this.switchNum = index
      this.$emit('switchNum', index)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
@import "../../assets/css/variable";
.header{
  position: relative;
  z-index: 999;
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: space-between;
  @include bg_color();
  align-items: center;
  .header-left,.header-right{
    width: 84px;
    height: 84px;
  }
  .header-left{
    @include bg_img('../../assets/images/back')
  }
  .header-right{
    @include bg_img('../../assets/images/more')
  }
  .header-title{
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #FFFFFF;
    border-radius: 10px;
    color: #FFFFFF;
    font-weight: bold;
    @include font_size(28px);
    @include no-wrap();
    height: 50px;
    li{
      height: 50px;
      line-height: 50px;
      &:nth-child(1) {
        border-right: 5px solid #FFFFFF;
        padding: 0 10px;
        //@include font_size(28px);
      }
      &:nth-child(2) {
        padding:0 10px;
      }
      &.active{
        background: rgba(255,255,255,.3);
      }
    }
  }
}
</style>
