<template>
  <div class="rank">
    <div class="rank-wrapper">
      <ScrollView>
        <ul>
          <li v-for="(value, key) in categorg.titles" :key="key">
            <h3 class="group-title">{{value}}</h3>
            <ul v-if="value === '官方榜'" class="normal-group">
              <li v-for="(obj, index) in categorg[key]" :key="index" @click.stop="selectedItem(obj.rank.id)">
                <div class="rank-left">
                  <img v-lazy="obj.rank.coverImgUrl" alt="">
                  <p>{{obj.rank.updateFrequency}}</p>
                </div>
                <div class="rank-right">
                  <p v-for="(song, index) in obj.rank.tracks" :key="song.first">{{index + 1}}.{{song.first}}-{{song.second}}</p>
                </div>
              </li>
            </ul>
            <ul class="other-group" v-else>
              <li v-for="obj in categorg[key]" :key="obj.rank.id" @click.stop="selectedItem(obj.rank.id)">
                <div class="rank-top">
                  <img v-lazy="obj.rank.coverImgUrl" alt="">
                  <p>{{obj.rank.updateFrequency}}</p>
                </div>
                <div class="rank-bottom">
                  <p>{{obj.rank.name}}</p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        <transition>
          <router-view></router-view>
        </transition>
      </ScrollView>
    </div>
  </div>
</template>
<script>
import ScrollView from '../components/ScrollView'
import { getTopListDetail } from '../api/index'
export default {
  name: 'Detail',
  components: {
    ScrollView
  },
  data () {
    return {
      categorg: {}
    }
  },
  created () {
    getTopListDetail().then(res => {
      this.categorg = res
      console.log(res)
    })
  },
  methods: {
    selectedItem (id) {
      this.$router.push({
        path: `/rank/defail/${id}/rank`
      })
    }
  }

}
</script>

<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";
.rank{
  width: 100%;
  height: 100%;
  .rank-wrapper{
    position: fixed;
    left: 0;
    right: 0;
    top: 184px;
    bottom: 0;
    overflow: hidden;
    @include bg_sub_color();
    .group-title{
      padding: 10px 20px;
      box-sizing: border-box;
      @include font_color();
      @include font_size(45px);
      font-weight: bold;
    }
    .normal-group{
      li{
        display: flex;
        align-items: center;
        padding: 10px 20px;
        box-sizing: border-box;
        .rank-left{
          position: relative;
          img{
            width: 200px;
            height: 200px;
            border-radius: 10px;
          }
          p{
            position: absolute;
            left: 10px;
            bottom: 10px;
            color: #fff;
            @include font_size($font_medium_s);
          }
        }
        .rank-right{
          margin-left: 20px;
          p{
            @include font_color();
            @include font_size(30px);
            padding: 10px 0;
          }
        }
      }
    }
    .other-group{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding-bottom: 50px;
      li{
        padding: 10px 20px;
        box-sizing: border-box;
        .rank-top{
          position: relative;
          img{
            width: 200px;
            height: 200px;
            border-radius: 10px;
          }
          p{
            position: absolute;
            left: 10px;
            bottom: 10px;
            color: #fff;
            @include font_size(30px);
          }
        }
        .rank-bottom{
          width: 200px;
          @include no-wrap();
          p{
            padding: 10px 0;
            @include font_color();
            @include font_size(30px);
          }
        }
      }
    }
  }
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
