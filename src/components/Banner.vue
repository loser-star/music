<template>
    <swiper :options="swiperOptions" class="banner" v-if="banners.length>0">
      <swiper-slide v-for="item in banners" :key="item.bannerId" class="item">
        <a :href="item.url">
          <img v-lazy="item.pic" alt="">
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
import 'swiper/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  props: {
    banners: {
      type: Array,
      default: () => []
    }
  },
  name: 'Recommend',
  data () {
    return {
      swiperOptions: {
        loop: true,
        autoplay: {
          delay: 1000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style scoped lang="scss">
.banner{
  .item{
    img{
      width: 100%;
      height: 300px;
    }
  }
}
</style>
<style lang="scss">
@import "../assets/css/mixin";
.banner {

  .swiper-pagination-bullet{
  width: 16px;
  height: 16px;
  background: #FFFFFF;
  opacity: 1;
}
  .swiper-pagination-bullet-active{
   @include bg_color()
  }
}

</style>
