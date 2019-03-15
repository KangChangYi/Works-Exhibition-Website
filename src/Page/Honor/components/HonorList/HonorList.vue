<style scoped>
  @import "./HonorList.css";
</style>

<template>
  <div id="layout">
    <router-link class="honor-list-frame" :to="{ name:'HonorDetail', params:{ pkId:item.pkId , allId:allHonorId}}" v-for="item in honorInfo.honorList" :key="item.pkId">
      <div>{{item.title}}</div>
      <Icon type="ios-arrow-forward" />
    </router-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        allHonorId: new Array(),
      };
    },
    props: {
      honorInfo: Object
    },
    created() {
      this.$http.get(this.global.url + "/honor/pkId").then(res => {
        console.log(res.data)
        this.allHonorId = res.data.data
        console.log(this.allHonorId)
      })
    }
  };
</script>
