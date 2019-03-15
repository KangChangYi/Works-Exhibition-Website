<style scoped>
  /* 全局 */
  @import "./../../../css/App.css";
  /* 独立 */
  @import "./WorksDetails.css";
</style>
<template>
  <div id="app">
    <div class="works-detail-top-frame">
      <div class="works-detail-top-bread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem to="/Work">全部作品</BreadcrumbItem>
          <BreadcrumbItem>{{info.name}}</BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
    <DetailsInfo :info="info" :otherFile="otherFile"></DetailsInfo>
    <FOOTER></FOOTER>
  </div>
</template>

<script>
  import FOOTER from '../../../components/footer'
  import DetailsInfo from './components/detailsInfo'
  export default {
    name: 'WorksDetails',
    data() {
      return {
        // 从服务器获取的数据
        info: {},
        otherFile: [],
      }
    },
    components: {
      DetailsInfo,
      FOOTER
    },
    created() {
      this.menu();
      var that = this;
      const pkId = that.$route.params.pkId;
      // 获取作品详情
      that.$http.get(this.global.url + "/work/list/" + pkId).then(res => {
        // 获取data
        let filePath = res.data.data.filePath;
        // console.log(filePath)
        let index = filePath.indexOf('word');
        that.info = res.data.data;
        filePath = filePath.substr(index - 1);
        // console.log(filePath)
        that.info.filePath = "https://view.officeapps.live.com/op/embed.aspx?src=" + this.global.url + filePath;
        // console.log(that.info.filePath)
        // 获取作品附件
        filePath = filePath.substring(0, filePath.lastIndexOf("/"));
        // console.log(filePath)
        filePath = filePath.substring(0, filePath.lastIndexOf("/") + 1) + pkId;
        // console.log(filePath)
        that.$http.get(this.global.url + "/work/annex?path=" + filePath + "/").then(res => {
          for (let i in res.data.data) {
            // console.log(res.data.data[i])
            // const PATH=res.data.data[i].substring(0, res.data.data[i].IndexOf("/"));
            // console.log(PATH + "PATH")
            let path = this.global.url + filePath + "/" + res.data.data[i]
            console.log(path)
            this.otherFile.push({
              path: path,
              name: res.data.data[i]
            })
          }
        })
      })
    },
    watch: {},
    methods: {
      menu() {
        window.scrollTo(0, 0);
      },
    },
  }
</script>
