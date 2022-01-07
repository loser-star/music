<template>
  <div class="header" @click="changTheme">
    <div class="header-left"></div>
    <p class="header-title">loser音乐</p>
    <div class="header-right"></div>
  </div>
</template>
<script>
export default {
  name: 'Header',
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
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/mixin";
@import "src/assets/css/variable";
.header{
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
    @include bg_img('../assets/images/logo')
  }
  .header-right{
    @include bg_img('../assets/images/account')
  }
  .header-title{
    text-align: center;
    color: #FFFFFF;
    font-weight: bold;
    @include font_size(25px)
  }
}
</style>
