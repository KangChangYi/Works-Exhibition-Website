<style scoped>
  /* 引入全局 */
  @import "../../css/App.css";
  /* 独立样式 */
  @import "./css/Team.css";

  /* 特效 */
  .v-enter {
    opacity: 0;
  }

  .v-enter-active {
    transition: 0.25s;
  }

  .v-enter-to {
    opacity: 1;
  }

  .v-leave {
    opacity: 1;
  }

  .v-leave-to {
    opacity: 0;
  }

  .v-leave-active {
    transition: 0.25s;
  }

</style>
<template>
  <div id="app">

    <div class="team-page-bg">
      <div class="big-title">人多好办事</div>
      <div class="title-text"> &emsp;&emsp;单个的人是软弱无力的，就像漂流的鲁滨逊一样，只有同别人在一起，他才能完成许多事业。
      </div>
      <div class="title-text-2">——叔本华 </div>
    </div>

    <transition mode="out-in">
      <router-view></router-view>
    </transition>

    <FOOTER></FOOTER>

  </div>
</template>

<script>
import FOOTER from '../../components/footer'
  export default {
    name: 'Team',
    data() {
      return {

      }
    },
    created() {
      this.menu();
    },
    methods: {
      menu() {
        window.scrollTo(0, 0);
      }
    },
    components:{
      FOOTER
    }
  }

</script>
