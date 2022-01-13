<template>
  <div class="header" @click="changTheme">
    <div class="header-left" @click.stop="back"></div>
    <p class="header-title">{{ title }}</p>
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
  name: 'SubHeader',
  data () {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
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
    text-align: center;
    color: #FFFFFF;
    font-weight: bold;
    @include font_size(25px);
    @include no-wrap();
  }
}
</style>
