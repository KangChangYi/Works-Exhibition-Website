<style scoped>
  @import "./css/App.css";
  .cell-hover {
    background: #454545;
    color: white;
  }

  .top-hover {
    background: #f1f1f1;
  }
</style>
<template>

  <div id="app">
    <!-- top -->
    <div class="navigation-layout">

      <div class="navigation-inside-layout">

    <div class="icon-box">
          <img src="./assets/logo.png" />
      </div>


        <router-link class="navigation-cell" :to="{ name: 'Index' }">
          <div class="navigation-hoverColor"> </div>首页         
        </router-link>

        <router-link class="navigation-cell" :to="{ name: 'Work' }">
          <div class="navigation-hoverColor"> </div>作品
        </router-link>

        <router-link class="navigation-cell" :to="{ name: 'Team' }">
          <div class="navigation-hoverColor"> </div>团队
        </router-link>

        <router-link class="navigation-cell" :to="{ name: 'Honor' }">
          <div class="navigation-hoverColor"> </div>荣誉
        </router-link>

        <router-link class="navigation-cell" :to="{ name: 'Problem' }">
          <div class="navigation-hoverColor"> </div>问答
        </router-link>

        <!-- <router-link :to="{ name: 'Problem' }">
          <div class="navigation-problem">
            常见问题
          </div>
        </router-link> -->

        <div class="navigation-search">
          <Input search @on-search="search" v-model="searchInfo" size="large" placeholder="请输入作品名" />
        </div>

      </div>
    </div>

    <router-view></router-view>
  </div>

</template>

<script>
  import $ from 'jquery'
  export default {
    data() {
      return {
        searchInfo: '',
      }
    },
    name: 'App',
    components: {},
    methods: {
      // 搜索
      search() {
        if (this.searchInfo === '') {
          return false;
        } else {
          this.$http.get(this.global.url + "/work/list", {
            params: {
              limit: 5,
              page: 1,
              name: this.searchInfo
            }
          }).then(response => {
            if (response.data.data === null) {
              this.$Message.warning("没有相关搜索结果");
              return;
            }
            this.$router.push({
              name: 'Work',
              params: {
                searchInfo: this.searchInfo
              },
            })
          }, response => {})
        }
      }
    },
    created() {},
    mounted() {
      $(".navigation-cell").click(function () {
        $(this).children().css({
          "background": "#f1f1f1"
        })
        $(this).css({
          // "background": "#454545",
          "background":"#136a9c",
          "color": "white"
        }).siblings().css({
          // "background": "#343434",
          "background":"#035483",
          "color": "#f1f1f1"
        }).children().css({
          // "background": "#343434"
          "background":"#035483"
        })
      })
    },
    watch: {}
  }

</script>
