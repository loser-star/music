import { SET_FULL_SCREEN, SET_MINI_PLAYER, SET_IS_PLAYING, SET_MODE_TYPE, SET_LIST_PLAYER,
  SET_SONGS_DETAIL, SET_SONGS_LYRIC, SET_DEL_SONG, SET_CURRENT_INDEX,
  SET_CUR_TIME, SET_FAVORITE_SONG, SET_FAVORITE_LIST, SET_HISTORY_LIST, SET_HISTORY_SONG } from './mutations-type'

import { getSongDetail, getSongLyric, getSongUrl } from '../api/index'
export default {
  setFullScreen ({ commit }, flag) {
    commit(SET_FULL_SCREEN, flag)
  },
  setMiniPlayer ({ commit }, flag) {
    commit(SET_MINI_PLAYER, flag)
  },
  setIsPlaying ({ commit }, flag) {
    commit(SET_IS_PLAYING, flag)
  },
  setModeType ({ commit }, flag) {
    commit(SET_MODE_TYPE, flag)
  },
  setListPlayer ({ commit }, flag) {
    commit(SET_LIST_PLAYER, flag)
  },
  async setSongsDetail ({ commit }, ids) {
    console.log(ids)
    let result = await getSongDetail({ ids: ids.join(',') })
    let urls = await getSongUrl({ id: ids.join(',') })
    console.log(urls.data.data[0].url)
    let list = []
    result.data.songs.forEach((value, index, array) => {
      let obj = {}
      // obj.url = urls.data.data[index].url
      for (let i = 0; i < urls.data.data.length; i++) {
        let item = urls.data.data[i]
        if (value.id === item.id) {
          obj.url = item.url
          break
        }
      }
      obj.name = value.name
      let singer = ''
      value['ar'].forEach((item, index, array) => {
        if (index === 0) {
          singer = item.name
        } else {
          singer += '-' + item.name
        }
      })
      obj.singer = singer
      obj.picUrl = value['al'].picUrl
      obj.id = ids
      list.push(obj)
    })
    commit(SET_SONGS_DETAIL, list)
  },
  async getSongLyric ({ commit }, id) {
    let res = await getSongLyric({ id: id })
    let obj = parseLyric(res.data.lrc.lyric)
    commit(SET_SONGS_LYRIC, obj)
  },
  setDelSong ({ commit }, index) {
    commit(SET_DEL_SONG, index)
  },
  setCurrentIndex ({ commit }, index) {
    commit(SET_CURRENT_INDEX, index)
  },
  setCurTime ({ commit }, time) {
    commit(SET_CUR_TIME, time)
  },
  setFavoriteSong ({ commit }, song) {
    commit(SET_FAVORITE_SONG, song)
  },
  setFavoriteList ({ commit }, list) {
    commit(SET_FAVORITE_LIST, list)
  },
  setHistoryList ({ commit }, list) {
    commit(SET_HISTORY_LIST, list)
  },
  setHistorySong ({ commit }, list) {
    commit(SET_HISTORY_SONG, list)
  }
}
// 格式化歌词方法
function parseLyric (lrc) {
  let lyrics = lrc.split('\n')
  // [00:00.000] 作曲 : 林俊杰
  // 1.定义正则表达式提取[00:00.000]
  let reg1 = /\[\d*:\d*\.\d*\]/g
  // 2.定义正则表达式提取 [00
  let reg2 = /\[\d*/i
  // 3.定义正则表达式提取 :00
  let reg3 = /\:\d*/i
  // 4.定义对象保存处理好的歌词
  let lyricObj = {}
  lyrics.forEach(function (lyric) {
    // 1.提取时间
    let timeStr = lyric.match(reg1)
    if (!timeStr) { return }
    timeStr = timeStr[0]
    // 2.提取分钟
    let minStr = timeStr.match(reg2)[0].substr(1)
    // 3.提取秒钟
    let secondStr = timeStr.match(reg3)[0].substr(1)
    // 4.合并时间, 将分钟和秒钟都合并为秒钟
    let time = parseInt(minStr) * 60 + parseInt(secondStr)
    // 5.处理歌词
    let text = lyric.replace(reg1, '').trim()
    // 6.保存数据
    lyricObj[time] = text
  })
  return lyricObj
}
