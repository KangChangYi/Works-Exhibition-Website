<style scoped>
  .center-layout {
    width: 900px;
    min-height: 1000px;
    background: white;
    margin: auto;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
  }
  .honor-main-title {
    margin-top: 20px;
    font-size: 24px;
    font-weight: bold;
    color: #464c5b;
  }
  .honor-sub-title,
  .honor-profile {
    width:fit-content;
    color: #657180;
    font-size: 13px;
    line-height: 25px;
    margin-top:5px;
  }
  .honor-profile{
    width:700px;
    margin-top: 10px;
  }
  .table-layout {
    margin-top: 20px;
    /* border: 1px red solid; */
    width: 700px;
    background: #9A9A9A;
  }
  .tr-layout {
    text-align: center;
  }
  .tr-layout td {
    width: 125px;
    height: 35px;
    background: white;
  }
  .cell-title {
    font-weight: bold;
    font-size: 14px;
  }
</style>

<template>
  <div class="center-layout">
    <div class="honor-main-title">{{Title.title}}</div>
    <div class="honor-sub-title">{{Title.subtitle}}</div>
    <div class="honor-profile">&emsp;&emsp;{{Title.profile}}</div>
    <table class="table-layout" cellspacing="1">
      <tr class="tr-layout">
        <td class="cell-title">类型</td>
        <td class="cell-title">姓名</td>
        <td class="cell-title">班级</td>
        <td class="cell-title">指导教师</td>
        <td class="cell-title">获奖情况</td>
      </tr>
      <tr class="tr-layout" v-for="item in Excel" :key="item.pkId">
        <td>{{item.type}}</td>
        <td>{{item.name}}</td>
        <td>{{item.schoolClass}}</td>
        <td>{{item.teacher}}</td>
        <td>{{item.award}}</td>
      </tr>
    </table>
    <!-- {{honorId}} -->
  </div>
</template>

<script>
  export default {
    name: "showDetail",
    data() {
      return {
        Excel: [],
        Title: {},
      };
    },
    props: {
      honorId: Number,
    },
    created() {
      const pkId = this.honorId;
      // 请求荣誉内容
      this.$http.get(this.global.url + "/honor/" + pkId).then(res => {
        this.Title = res.data.data || "";
        console.log(this.Title)
      })
      // 请求荣誉excel
      this.$http.get(this.global.url + "/honorContext/" + pkId).then(res => {
        this.Excel = res.data.data || "";
        console.log(this.Excel)
      })
    },
    mounted() {},
    methods: {
      // showInfo(pkId) {}
    }
  };
</script>
