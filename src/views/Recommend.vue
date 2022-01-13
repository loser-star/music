<template>
  <div class="recommend">
    <ScrollView>
      <div>
        <Banner :banners="banners"></Banner>
      <Personalized :personalized="personalized" :title="'推荐歌单'" @select="fatherSelectItem" :type="'personalized'"></Personalized>
      <Personalized :personalized="album" :title="'最新专辑'" @select="fatherSelectItem" :type="'album'"></Personalized>
      <SongList :songs="songs"></SongList>
      </div>
    </ScrollView>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Banner from '../components/Recommend/Banner'
import Personalized from '../components/Recommend/Personalized'
import SongList from '../components/Recommend/SongList'
import ScrollView from '../components/ScrollView'
import { getBanner, getPersonalized, getNewAlbum, getNewSong } from '../api'
export default {
  name: 'Recommend',
  components: {
    Banner,
    Personalized,
    SongList,
    ScrollView
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
    console.log(res)
    getNewAlbum().then(res => {
      // res.data.albums.length = 6
      this.album = res.data.albums.splice(0, 6)
      // console.log(this.album)
    })
    getNewSong().then(res => {
      // res.data.albums.length = 6
      // this.album = res.data.albums.splice(0, 6)
      // this.songs = res.data.result
      console.log(res.data.result)
      let list = []
      res.data.result.forEach(value => {
        let obj = {}
        obj.id = value.id
        obj.name = value.name
        obj.picUrl = value.picUrl
        let singer = ''
        for (let i = 0; i < value.song['artists'].length; i++) {
          if (i === 0) {
            singer = value.song['artists'][i].name
          } else {
            singer += '' + value.song['artists'][i].name
          }
        }
        obj.singer = singer
        list.push(obj)
      })
      this.songs = list
    })
  },
  methods: {
    fatherSelectItem (id, type) {
      this.$router.push({
        path: `/recommend/defail/${id}/${type}`
      })
    }
  }
}
</script>

<style scoped lang="scss">
.recommend{
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.v-enter{
  transform: translateX(100%);
}
.v-enter-to{
  transform: translateX(0%);
}
.v-enter-active{
  transition: transform 1s;
}
.v-leave{
  transform: translateX(0%);
}
.v-leave-to{
  transform: translateX(100%);
}
.v-leave-active{
  transition: transform 1s;
}
</style>
