<template>
  <div class="tabbar">
    <router-link tag="div" class="item" to="/recommend">
      <span>推荐</span>
    </router-link>
    <router-link tag="div" class="item" to="/singer">
      <span>歌手</span>
    </router-link>
    <router-link tag="div" class="item" to="/rank">
      <span>排行</span>
    </router-link>
    <router-link tag="div" class="item" to="/search">
      <span>搜索</span>
    </router-link>

  </div>
</template>

<script>
export default {
  name: 'Tabbar'
}
</script>

<style scoped lang="scss">
@import "src/assets/css/variable";
@import "src/assets/css/mixin";
.tabbar{
  width: 100%;
  height: 84px;
  @include bg_sub_color();
  display: flex;
  justify-content: space-around;
  align-items: center;
  //text-align: center;
  margin-top: 8px;
  .item{
    padding-bottom:15px ;
    span{
      @include font_size(30px);
      @include font_color();
    }
    &.router-link-active{
      border-bottom: 5px solid #000000;
      @include border_color();
      span{
        @include font_active_color();
      }
    }
  }
}

</style>
