<style scoped>
  /* 全局 */
  @import "./../../css/App.css";
  /* 独立 */
  @import "./css/Index.css";
  /* #app{
    padding-top:20px;
  } */
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
    <div class="bg-image">
      <img class="header-logo" src="../../assets/school-logo.png" />
      <span style="font-family:KaiTi;">机械与电气工程学院</span>
      <span style="font-family:KaiTi;">科研与竞赛展示</span>
    </div>
    <!-- mid -->
    <div class="page-mid">
      <div class="title-frame">
        <div class="title" @click="hotWorks"> 热门作品 </div>
        <div class="title" @click="competitionWork"> 竞赛作品 </div>
        <div class="title" @click="scientificResearchWork"> 科研作品 </div>
      </div>
      <div style="min-height:695px;">
        <transition mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
      <Divider orientation="center" class="Divider-text">
        <span>优秀团队</span>
      </Divider>
      <!-- 显示团队 -->
      <div class="show-team-frame">
        <div v-for="item in teamList" :key="item.pkId" class="show-team" @click="clickTeamList(item.pkId)">
          <img :src="item.picture" />
        </div>
        <!-- <router-link class="show-team" :style="backgroundDiv1" :to="{ name : 'TeamDetail', params:{ pkId:1 }}">
                </router-link> -->
      </div>
      <!-- 显示团队 -->
    </div>
    <!-- mid -->
    <FOOTER></FOOTER>
  </div>
</template>

<script>
  import $ from 'jquery'
  // const url = "http://192.168.10.113:8080"; 
  const url = "http://wlm.izhangs.com:8080";
  // const url = "http://115.159.90.137:8080";
  // const url = "http://210.32.98.136:8080";
  import FOOTER from '../../components/footer'
  export default {
    url,
    data() {
      return {
        // 设置背景图片 
        backgroundDiv1: {
          backgroundImage: 'url(' + require('../../assets/fearLess.png') + ')'
        },
        // 优秀团队
        teamList: {},
      }
    },
    name: 'Index',
    components: {
      FOOTER
    },
    created() {
      this.menu();
      // 获取优秀团队
      this.$http.get(url + "/team/list", {
        params: {
          limit: 4,
          page: 1
        }
      }).then(res => {
        console.log(res.data.data.list)
        this.teamList = res.data.data.list
      })
    },
    mounted() {
      $(".title").click(function() {
        $(this).css({
          // "color": "#343434"
          "color":"rgb(52,108,179)"
        }).siblings().css({
          "color": "#999"
        })
      })
    },
    methods: {
      clickTeamList(pkId) {
        this.$router.push({
          name: "TeamDetail",
          params: {
            pkId: pkId,
          }
        })
      },
      menu() {
        window.scrollTo(0, 0);
      },
      hotWorks() {
        this.$router.push({
          name: "HotWork"
        })
      },
      competitionWork() {
        this.$router.push({
          name: "CompetitionWork"
        })
      },
      scientificResearchWork() {
        this.$router.push({
          name: "ScientificResearchWork"
        })
      }
    },
  }
</script>
