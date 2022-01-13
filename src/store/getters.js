export default {
  isFullScreen (state) {
    return state.isFullScreen
  },
  isShowMiniPlayer (state) {
    return state.isShowMiniPlayer
  },
  isPlaying (state) {
    return state.isPlaying
  },
  ModeType (state) {
    return state.modeType
  },
  isShowPlayer (state) {
    return state.isShowPlayer
  },
  songs (state) {
    return state.songs
  },
  currentSong (state) {
    let obj = {
      name: '',
      singer: '',
      picUrl: '',
      id: 0
    }
    if (state.songs.length !== 0) {
      obj = state.songs[state.currentIndex]
    }
    return obj
  },
  currentLyric (state) {
    return state.currentLyric
  },
  currentIndex (state) {
    return state.currentIndex
  },
  curTime (state) {
    return state.curTime
  },
  favoriteList (state) {
    return state.favoriteList
  },
  historyList (state) {
    return state.historyList
  }
}
