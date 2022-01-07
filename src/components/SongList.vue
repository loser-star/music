<template>
<div class="songs">
  <div class="songs-top">
    <h3>最新音乐</h3>
  </div>
  <ul class="songs-list">
    <li v-for="item in songs" :key="item.id" class="item">
      <img v-lazy="item.picUrl" alt="">
      <div>
        <h3>{{item.name}}</h3>
        <p>{{item.song.artists[0].name}}</p>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  name: 'SongList'
}
</script>

<style scoped lang="scss">
@import "src/assets/css/variable";
@import "src/assets/css/mixin";
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
  .songs-list{
    width: 100%;
    overflow: hidden;
  .item{
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    img{
      width: 150px;
      height: 150px;
      border-radius: 20px;
      padding-right: 20px;
    }
    div{
      h3{
        @include font_size(30px);
        @include font_color();
      }
      p{
        @include font_size(25px);
        padding-top: 20px;
        @include font_color();
      }
    }
  }
}
}
</style>
