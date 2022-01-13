<template>
<div id="wrapper" ref="wrapper">
  <slot></slot>
</div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-probe'
export default {
  name: 'ScrollView',
  mounted () {
    this.iscroll = new IScroll(this.$refs.wrapper, {
      mousewheel: true,
      scrollbars: false,
      probeType: 3,
      scrollX: false,
      scrollY: true,
      disablePointer: true,
      disableTouch: false,
      disableMouse: true,
      preventDefault: false
    })
    /*
    * MutationObserver构造函数只有监听元素有变化就会调用回调函数
    * */
    let observer = new MutationObserver((mutationList, observer) => {
      this.iscroll.refresh()
    })
    let config = {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
      attributeFilter: ['height', 'offsetHeight'],
      attributeOldValue: true,
      characterDataOldValue: true
    }
    observer.observe(this.$refs.wrapper, config)
  },
  methods: {
    // 监听滚动距离
    scrolling (fn) {
      this.iscroll.on('scroll', function () {
        fn(this.y)
      })
    },
    refresh () {
      setTimeout(() => {
        this.iscroll.refresh()
      }, 100)
    },
    scrollTo (x, y, time) {
      this.iscroll.scrollTo(x, y, time)
    }
  }
}
</script>

<style scoped>
#wrapper{
  width: 100%;
  height: 100%;
  /*overflow: hidden;*/
}
</style>
