<style scoped>
  @import "./ShowWork.css";

</style>

<template>
  <div class="ShowWork-frame">

    <div class="show-works-frame">

      <router-link class="show-works-item" v-for="item in competition" :key="item.pkId" :to="{ name : 'WorksDetails', params:{ pkId:item.pkId }}">
        <div class="show-works-item-image">
          <img :src="item.picture" />
        </div>

        <!-- v-bind:src="item.img" -->
        <div class="show-works-item-name">{{ item.name }}</div>
        <div class="show-works-item-introduce">{{ item.teamName }} </div>
        <div style="float:left;margin-top:5px;">
          <Tag class="tag" color="blue">{{item.type}}</Tag>
          <!-- <Tag class="tag" color="green">{{item.typeTechnology}}</Tag> -->
        </div>
      </router-link>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'CompetitionWork',
    data() {
      return {
        competition: [],
      }
    },
    components: {},
    created() {
      // 请求最火作品
      var that = this
      that.$http.get(this.global.url + "/work/list/jingsai").then(res => {
        that.competition = res.data.data;
      }, err => {})
    },
    methods: {},
  }

</script>
