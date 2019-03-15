<style scoped>
@import "../../../css/App.css";
@import "./HonorDetail.css";
.page-mid {
  padding-top: 50px;
  display: flex;
}
</style>

<template>
  <div id="app">
    <div class="page-mid" id="useScrollTop">
      <div class="up-one-layout" @click="left">
        <Icon type="ios-arrow-back" class="up-one-button" id="left"/>
      </div>
      <!-- 荣誉详细页内容组件 -->
      <transition :name="transitionName" mode="out-in">
        <showDetail :honorId.sync="honorId" ref="child" v-if="isShowDetailOne" key="one"></showDetail>
        <showDetailTwo :honorId.sync="honorId" ref="child" v-else key="two"></showDetailTwo>
      </transition>
      <div class="next-one-layout" @click="right">
        <Icon type="ios-arrow-forward" class="next-one-button" id="right"/>
      </div>
    </div>
    <FOOTER></FOOTER>
  </div>
</template>

<script>
import FOOTER from "../../../components/footer";
import showDetail from "./components/showDetail.vue";
import $ from "jquery";
export default {
  name: "HonorDetail",
  components: {
    showDetail: showDetail,
    showDetailTwo: showDetail,
    FOOTER
  },
  data() {
    return {
      honorId: 1,
      isShowDetailOne: true,
      transitionName: "goLeft",
      allHonorId: new Array(),
      allHonorIdLengh: 0,
      currentIdPlace: 0
    };
  },
  created() {
    this.menu();
    // 获取路由传递来的id  全部id
    this.honorId = Number(this.$route.params.pkId);
    this.allHonorId = this.$route.params.allId;
    this.allHonorIdLengh = this.allHonorId.length;
    // 定义常量
    const ID = this.honorId;
    const ALLID = this.allHonorId;
    const LENGTH = this.allHonorIdLengh;
    for (let i = 0; i < LENGTH; i++) {
      if (ID == ALLID[i].pkId) {
        this.currentIdPlace = i;
      }
    }
  },
  methods: {
    // 点击上一条
    left() {
      if (this.currentIdPlace > 0) {
        this.transitionName = "goLeft";
        this.isShowDetailOne = !this.isShowDetailOne;
        this.currentIdPlace--;
        this.honorId = this.allHonorId[this.currentIdPlace].pkId;
      } else {
        this.$Message.info("已经是第一条了~");
      }
      this.menu();
    },
    // 点击下一条
    right() {
      if (this.currentIdPlace < this.allHonorIdLengh - 1) {
        this.transitionName = "goRight";
        this.isShowDetailOne = !this.isShowDetailOne;
        this.currentIdPlace++;
        this.honorId = this.allHonorId[this.currentIdPlace].pkId;
      } else {
        this.$Message.info("已经是最后一条了~");
      }
      this.menu();
    },
    // 回到顶部
    menu() {
      window.scrollTo(0, 0);
    }
  }
};
</script>
