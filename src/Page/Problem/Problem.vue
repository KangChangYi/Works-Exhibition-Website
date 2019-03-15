<style scoped>
  /* 全局 */
  @import "../../css/App.css";
  /* 独立 */
  @import "./css/Problem.css";
  .page-mid {
    display: flex;
    padding-top: 50px;
  }
</style>

<template>
  <div id="app">
    <div class="page-mid">
      <div class="question-layout">
        <div class="question-title">
          常见Q&A
        </div>
        <div class="question-context">
          <mavon-editor v-model="questionInfo" ref=md style="z-index:0;min-height:700px" defaultOpen="preview" :subfield="false" :editable="false" :toolbarsFlag="false" />
        </div>
      </div>
      <div class="contact-layout">
        <div class="contact-title">联系方式</div>
        <div class="contact-title-son">学院:</div>
      </div>
    </div>
    <FOOTER></FOOTER>
  </div>
</template>

<script>
import FOOTER from '../../components/footer'
  export default {
    data() {
      return {
        questionInfo: '',
      }
    },
    created() {
      this.menu();
      this.$http.get(this.global.url + "/question").then(res => {
        this.questionInfo = res.data.data[0].context
      })
    },
    methods: {
      menu() {
        window.scrollTo(0, 0)
      }
    },
    components:{
      FOOTER
    }
  }
</script>
