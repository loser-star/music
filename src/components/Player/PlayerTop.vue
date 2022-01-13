<template>
  <div class="header">
    <div class="header-left" @click="hiddenNormalPlayer"></div>
    <div class="header-title">
      <h3>{{ currentSong.name }}</h3>
      <p>{{ currentSong.singer }}</p>
    </div>
    <div class="header-right"></div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['currentSong'])
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer'
    ]),
    hiddenNormalPlayer () {
      this.setFullScreen(false)
      this.setMiniPlayer(true)
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/mixin";
@import "src/assets/css/variable";
.header{
  //position: relative;
  //z-index: 999;
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: space-between;
  //@include bg_color();
  align-items: center;
  .header-left,.header-right{
    width: 84px;
    height: 84px;
  }
  .header-left{
    @include bg_img('../../assets/images/down')
  }
  .header-right{
    //@include bg_img('../../assets/images/account')
  }
  .header-title{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: #FFFFFF;
    //font-weight: bold;
    @include font_size(25px);
    @include no-wrap();
    p{
      @include font_size(23px);
    }
  }
}
</style>
