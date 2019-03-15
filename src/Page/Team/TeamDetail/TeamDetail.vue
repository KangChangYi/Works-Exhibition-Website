<style scoped>
  /* 全局 */
  @import "./../../../css/App.css";
  /* 独立 */
  @import "./TeamDetail.css";
</style>

<template>
  <div id="app">
    <div class="teamDetail-page-top-bg">
      <div class="teamDetail-page-top-inside-frame">
        <div class="teamDetail-page-top-title">{{data.name}}</div>
      </div>
    </div>
    <div class="team-page-mid">
      <!-- left -->
      <div class="team-page-markdown">
        <mavon-editor v-model="teamIntroduction" ref=md style="z-index:0" defaultOpen="preview" :subfield="false" :editable="false" :toolbarsFlag="false" />
      </div>
      <!-- rigth -->
      <div class="team-page-teaminfo-frame">
        <div class="team-page-left-info">
          <div class="teaminfo-title">团队成员</div>
          <!-- style="border-bottom:1px #DFDFDF solid;padding:10px 0 20px 0;margin-bottom:25px;line-height: 20px;" -->
          <div class="teaminfo-title-son"> {{data.member || "无"}} </div>
          <Divider />
          <div class="teaminfo-title">其他</div>
          <div class="teaminfo-title-son">团队负责人: {{data.manager || "无"}}</div>
          <div class="teaminfo-title-son">负责人电话: {{data.mTelephone || "无"}}</div>
          <div class="teaminfo-title-son">指导老师: {{data.teacher || "无"}}</div>
        </div>
      </div>
    </div>
    <FOOTER></FOOTER>
  </div>
</template>

<script>
  import FOOTER from '../../../components/footer'
  export default {
    name: 'TeamDetail',
    data() {
      return {
        // 数据
        data: [],
        teamIntroduction: '',
      }
    },
    created() {
      this.menu();
      var that = this
      // 获取传递的团队id
      const pkId = that.$route.params.pkId
      // 服务器请求
      this.$http.get(this.global.url + "/team/list/" + pkId).then(res => {
        that.data = res.data.data;
        console.log(res.data.data);
        that.teamIntroduction = res.data.data.teamIntroduction.context || "空";
      }, err => {})
    },
    methods: {
      menu() {
        window.scrollTo(0, 0);
      },
    },
    components:{
      FOOTER
    }
  }
</script>
