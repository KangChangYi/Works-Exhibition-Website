<style scoped>
  /* 全局 */
  @import "./../../css/App.css";
  /* 独立 */
  @import "./css/Honor.css";
  /* 渐入动画 */
  .HonorList-enter-active {
    opacity: 0;
    transition: all 0.3s;
  }
  .HonorList-enter-to {
    opacity: 1;
  }
  /* 渐出动画 */
  .HonorList-leave-active {
    transition: all 0.3s;
    opacity: 0;
  }
  .HonorList-leave-to {
    opacity: 0;
  }
</style>

<template>
  <div id="app">
    <div class="bg-image">学院荣誉墙</div>
    <div class="honor-list-layout">
      <transition name="HonorList">
        <HonorList v-if="isShowList" :honorInfo="honorInfo"></HonorList>
      </transition>
      <Page class="honor-paging" :total="honorInfo.totalCount" :current="honorInfo.currentPage" :page-size="honorInfo.limit" @on-change="onClickPaging" show-elevator />
    </div>
    <FOOTER></FOOTER>
  </div>
</template>

<script>
  import $ from "jquery";
  import HonorList from "./components/HonorList/HonorList.vue";
  import Vue from "vue";
  import FOOTER from '../../components/footer'
  export default {
    name: "Honor",
    components: {
      HonorList,
      FOOTER
    },
    data() {
      return {
        // 荣誉列表信息
        honorInfo: {
          limit: 5,
          honorList: [],
          totalCount: 0,
          currentPage: 1
        },
        isShowList: true
      };
    },
    created() {
      this.menu();
      this.$http.get(this.global.url + "/honor?limit=" + this.honorInfo.limit + "&page=" + this.honorInfo.currentPage).then(res => {
          console.log(res.data.data)
          const resData = res.data.data;
          this.honorInfo.honorList = resData.list;
          this.honorInfo.totalCount = resData.totalCount;
        },
        err => {}
      );
    },
    mounted() {},
    methods: {
      // 点击切换页码按钮
      onClickPaging(currentPage) {
        // 先隐藏再显示触发动效
        this.isShowList = !this.isShowList;
        setTimeout(() => {
          this.isShowList = !this.isShowList;
        }, 300);
        this.$http.get(this.global.url + "/honor?limit=" + this.honorInfo.limit + "&page=" + currentPage).then(res => {
            // console.log(res.data.data)
            const resData = res.data.data;
            this.honorInfo.honorList = resData.list;
            this.honorInfo.totalCount = resData.totalCount;
          },
          err => {}
        );
      },
      menu() {
        window.scrollTo(0, 0);
      }
    }
  };
</script>
