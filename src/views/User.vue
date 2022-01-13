<template>
  <transition>
    <div class="user">
      <UserHeader @switchNum="NewswitchNum"></UserHeader>
      <UserBottom  :switchNum="switchNum" ></UserBottom>
    </div>
  </transition>
</template>

<script>
import UserHeader from '../components/User/UserHeader'
import UserBottom from '../components/User/UserBottom'
export default {
  name: 'User',
  components: {
    UserHeader,
    UserBottom
  },
  data () {
    return {
      switchNum: 0
    }
  },
  methods: {
    NewswitchNum (num) {
      this.switchNum = num
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/mixin";
@import "src/assets/css/variable";
.user{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
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
