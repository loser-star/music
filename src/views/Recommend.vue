<template>
  <div class="recommend">
    <Banner :banners="banners"></Banner>
    <Personalized :personalized="personalized" :title="'推荐歌单'"></Personalized>
    <Personalized :personalized="album" :title="'最新专辑'"></Personalized>
    <SongList :songs="songs"></SongList>
  </div>
</template>

<script>
import Banner from '../components/Banner'
import Personalized from '../components/Personalized'
import SongList from '../components/SongList'
import { getBanner, getPersonalized, getNewAlbum, getNewSong } from '../api'
export default {
  name: 'Recommend',
  components: {
    Banner,
    Personalized,
    SongList
  },
  data () {
    return {
      banners: [],
      personalized: [],
      album: [],
      songs: []
    }
  },
  async created () {
    const { data } = await getBanner()
    this.banners = data.banners
    const res = await getPersonalized()
    this.personalized = res.data.result
    getNewAlbum().then(res => {
      // res.data.albums.length = 6
      this.album = res.data.albums.splice(0, 6)
      // console.log(this.album)
    })
    getNewSong().then(res => {
      // res.data.albums.length = 6
      // this.album = res.data.albums.splice(0, 6)
      console.log(res)
      this.songs = res.data.result
    })
  }
}
</script>

<style scoped>

</style>
