<template>
<div class="songs">
  <div class="songs-top">
    <h3>最新音乐</h3>
  </div>
  <SongListItem :songs="songs"></SongListItem>
</div>
</template>

<script>
import SongListItem from '../SongListItem'
export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  name: 'SongList',
  components: {
    SongListItem
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.songs{
  @include bg_sub_color();
  .songs-top{
    width: 94%;
    height: 84px;
    //line-height: 84px;
    @include bg_sub_color();
    padding: 0 20px;
    overflow: hidden;
    h3{
      margin-top: 20px;
      height: 50px;
      @include font_size(35px);
      font-weight: bold;
      @include font_color();
      padding-top: 10px;
      border-left: 5px solid #000000;
      padding-left: 20px;
      @include border_color()
    }
  }
}
</style>
