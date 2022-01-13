<template>
  <ul class="songs-list">
    <li v-for="(item, index) in songs" :key="index" class="item" @click="selectMusic(item.id)">
      <img v-lazy="item.picUrl" alt="">
      <div>
        <h3>{{item.name}}</h3>
        <p>{{item.singer}}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  name: 'SongListItem',
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setSongsDetail'
    ]),
    selectMusic (id) {
      console.log(id)
      this.setFullScreen(true)
      this.setMiniPlayer(false)
      this.setSongsDetail([id])
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";
.songs-list {
  width: 100%;
  overflow: hidden;

  .item {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;

    img {
      width: 150px;
      height: 150px;
      border-radius: 20px;
      padding-right: 20px;
    }

    div {
      h3 {
        @include font_size(30px);
        @include font_color();
      }

      p {
        @include font_size(25px);
        padding-top: 20px;
        @include font_color();
      }
    }
  }
}
</style>
