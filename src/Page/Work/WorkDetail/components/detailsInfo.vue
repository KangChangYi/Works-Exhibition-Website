<style scoped>
  @import "./../WorksDetails.css";
  .category-title {
    width: 60px;
  }
</style>

<template>
  <div class="works-detail-info-frame">
    <iframe class="iframe-layout" v-bind:src="info.filePath" frameborder="0"></iframe>
    <div class="works-detail-info-box">
      <img class="works-detail-info-img" v-bind:src="info.picture" />
      <div class="works-detail-info-text-frame">
        <div class="works-detail-info-text-workname">{{info.name}} </div>
        <div class="works-detail-info-text-type">
          <Tag class="work-list-content-tag" color="blue">{{info.type}}</Tag>
          <!-- <Tag class="work-list-content-tag" style="margin-left:5px;" color="green">{{info.typeTechnology}}</Tag> -->
        </div>
        <div class="works-detail-info-text-teaminfo-frame">
          <div class="details-category">
            <span class="category-title">团队：</span>
            <div class="details-category-son">{{info.teamName}}</div>
          </div>
          <div class="details-category">
            <span class="category-title">成员：</span>
            <div class="details-category-son">{{info.member}}</div>
          </div>
          <div class="details-category">
            <span class="category-title">简介：</span>
            <div class="details-category-son">{{info.profile}}</div>
          </div>
          <div class="details-category">
            <span class="category-title">附件：</span>
            <div class="details-category-son">
              <div v-for="item in otherFile" :key="item">
                <a v-bind:href="item.path">{{item.name}}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      info: Object,
      otherFile: Array,
    },
    created() {
      console.log(otherFile)
    },
  }
</script>
