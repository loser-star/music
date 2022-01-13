<template>
<div class="datail-top">
  <div class="img-container">
    <img :src="path" alt="">
    <div class="mask" ref="mask"></div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    path: {
      type: String
    }
  },
  name: 'DetailTop',
  methods: {
    changMask (opacity) {
      this.$refs.mask.style.opacity = opacity
    }
  }
}
</script>

<style scoped lang="scss">
.datail-top{
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: relative;
  img{
    width: 100%;
    box-sizing: border-box;
  }
  .mask{
    position: absolute;
    background: #000;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
  }
}
</style>
