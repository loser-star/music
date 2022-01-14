<template>
  <div class="datail">
    <SubHeader :title="playlist.name"></SubHeader>
    <DetailTop :path="playlist.coverImgUrl" ref="top"></DetailTop>
    <div class="bottom">
      <ScrollView ref="scrollview">
        <DetailBottom :playlist="playlist.tracks"></DetailBottom>
      </ScrollView>
    </div>
  </div>
</template>
<script>
import SubHeader from '../components/Detail/DetailHeader'
import DetailTop from '../components/Detail/DetailTop'
import DetailBottom from '../components/Detail/DetailBottom'
import ScrollView from '../components/ScrollView'
import { getPlayList, getAlbum, getArtistsSongs, getTopList } from '../api/index'
export default {
  name: 'Detail',
  components: {
    SubHeader,
    DetailTop,
    DetailBottom,
    ScrollView
  },
  data () {
    return {
      playlist: {}
    }
  },
  created () {
    if (this.$route.params.type === 'personalized') {
      getPlayList({ id: this.$route.params.id }).then(res => {
        this.playlist = res.data.playlist
      })
    } else if (this.$route.params.type === 'album') {
      getAlbum({ id: this.$route.params.id }).then(res => {
        console.log(res)
        this.playlist = {
          name: res.data.album.name,
          coverImgUrl: res.data.album.picUrl,
          tracks: res.data.songs
        }
      })
    } else if (this.$route.params.type === 'singer') {
      getArtistsSongs({ id: this.$route.params.id }).then(res => {
        console.log(res)
        this.playlist = {
          name: res.data.artist.name,
          coverImgUrl: res.data.artist.picUrl,
          tracks: res.data.hotSongs
        }
      })
    } else if (this.$route.params.type === 'rank') {
      getTopList({ id: this.$route.params.id }).then(res => {
        console.log(res)
        this.playlist = {
          name: res.data.playlist.name,
          coverImgUrl: res.data.playlist.creator.backgroundUrl,
          tracks: res.data.playlist.tracks
        }
      })
    }
  },
  mounted () {
    let defaultHeight = this.$refs.top.$el.offsetHeight
    this.$refs.scrollview.scrolling((offsetY) => {
      if (offsetY < 0) {
        // let scale = 20 * Math.abs(offsetY) / defaultHeight
        let scale = Math.abs(offsetY) / defaultHeight
        this.$refs.top.changMask(scale)
        // this.$refs.top.$el.style.filter = `blur(${scale}px)`
      } else {
        let scale = 1 + offsetY / defaultHeight
        this.$refs.top.$el.style.transform = `scale(${scale})`
      }
    })
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/mixin";
@import "src/assets/css/variable";
//.datail{
//position: fixed;
//  top: 0;
//  bottom: 0;
//  z-index: 999;
//  left: 0;
//  right: 0;
//  @include bg_sub_color();
//  .bottom{
//    position: fixed;
//    top: 500px;
//    bottom: 0;
//    left: 0;
//    right: 0;
//    //width: 100%;
//    //height: 100%;
//  }
//}
.datail{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  @include bg_sub_color();
  .bottom{
    position: fixed;
    top: 500px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
