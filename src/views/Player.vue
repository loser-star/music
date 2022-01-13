<template>
<div class="player">
  <NormalPlayer :totalTime="totalTime" :currentTime="currentTime"></NormalPlayer>
  <MiniPlayer></MiniPlayer>
  <ListPlayer ref="listPlayer"></ListPlayer>
  <audio :src="currentSong.url" autoplay ref="audio" @timeupdate="timeupdate" @ended="end"></audio>
</div>
</template>

<script>
import NormalPlayer from '../components/Player/NormalPlayer'
import MiniPlayer from '../components/Player/MiniPlayer'
import ListPlayer from '../components/Player/ListPlayer'
import { mapGetters, mapActions } from 'vuex'
import modeType from '../store/modeType'
import { getRandomIntInclusive } from '../tools/tools'
export default {
  name: 'Player',
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.setHistorySong(this.currentSong)
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    currentIndex () {
      this.$refs.audio.oncanplay = () => {
        this.setHistorySong(this.currentSong)
        this.totalTime = this.$refs.audio.duration
        if (this.isPlaying) {
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      }
    },
    curTime (newValue, oldValue) {
      this.$refs.audio.currentTime = newValue
    },
    favoriteList (newValue, oldValue) {
      window.localStorage.setItem('favoriteList', JSON.stringify(newValue))
    },
    historyList (newValue, oldValue) {
      window.localStorage.setItem('historyList', JSON.stringify(newValue))
    }
  },
  computed: {
    ...mapGetters(['currentSong', 'isPlaying', 'currentIndex', 'curTime', 'ModeType', 'songs', 'favoriteList', 'historyList'])
  },
  created () {
    let list = JSON.parse(window.localStorage.getItem('favoriteList'))
    if (list) {
      this.setFavoriteList(list)
    }
    let res = JSON.parse(window.localStorage.getItem('historyList'))
    if (res) {
      this.setHistoryList(res)
    }
  },
  mounted () {
    this.$refs.audio.oncanplay = () => {
      this.totalTime = this.$refs.audio.duration
    }
  },
  data () {
    return {
      totalTime: 0,
      currentTime: 0
    }
  },
  methods: {
    ...mapActions(['setCurrentIndex', 'setFavoriteList', 'setHistorySong', 'setHistoryList']),
    timeupdate (e) {
      this.currentTime = e.target.currentTime
    },
    end () {
      if (this.ModeType === modeType.loop) {
        this.setCurrentIndex(this.currentIndex + 1)
      } else if (this.ModeType === modeType.one) {
        this.$refs.audio.play()
        console.log(1)
      } else if (this.ModeType === modeType.random) {
        let index = getRandomIntInclusive(0, this.songs.length - 1)
        this.setCurrentIndex(index)
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
