<style scoped>
  /* 全局 */
  @import "./../../css/App.css";
  /* 独立 */
  @import "./css/Work.css";
  .page-mid {
    display: flex;
  }
</style>

<template>
  <div id="app">
    <div class="works-page-title">
      <div>作品</div>
      <div>
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem>{{selectType}}</BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
    <!-- mid -->
    <div class="page-mid">
      <!-- mid-left -->
      <div class="works-page-categories">
        <!-- 搜索框 -->
        <div class="Categories" style="margin-top:4px;"> 搜索</div>
        <Input class="search" search suffix="ios-search" @on-search="search" v-model="searchInfo" placeholder="请输入作品名" />
        <!-- 类别 -->
        <div class="Categories"> 竞赛 </div>
        <div class="Categories-item" model="selectType" @click="selectT(item.name)" v-for="item in competition" :key="item.pkId">
          <div class="Categories-item-name"> {{item.name}} </div>
          <!-- <div class="Categories-item-number">{{item.totalNum}} </div> -->
        </div>
        <div class="Categories"> 科研 </div>
        <div class="Categories-item" model="selectType" @click="selectT(item.name)" v-for="item in scientificResearch" :key="item.pkId">
          <div class="Categories-item-name"> {{item.name}} </div>
          <!-- <div class="Categories-item-number">{{item.totalNum}} </div> -->
        </div>
        <!-- 类别 -->
      </div>
      <!-- mid-left -->
      <div class="works-page-work-list-outside-frame">
        <div class="work-list-inside-frame">
          <!-- <div style="display: flex;align-items: flex-end"> -->
          <div class="work-list-title"> {{selectType}}</div>
          <div class="work-list-title-sumNumber"> 共 {{totalCount}} 个作品</div>
          <!-- </div> -->
          <!-- content 循环 -->
          <div class="work-list-item-frame" v-for="item in info" :key="item.pkId">
            <router-link :to="{ name : 'WorksDetails',  params:{ pkId:item.pkId }}">
              <img class="work-list-item-image" v-bind:src="item.picture" />
              <div class="work-list-item-name">{{ item.name }} </div>
              <div class="work-list-item-teamName">{{item.teamName}} </div>
              <div class="work-list-item-tag-group">
                <Tag class="work-list-content-tag" color="blue">{{item.type}}</Tag>
                <!-- <Tag class="work-list-content-tag" color="green">{{item.typeTechnology}}</Tag> -->
              </div>
              <div class="work-list-item-introduce">{{ item.profile }} </div>
              <div class="work-list-item-otherItem">
                <img src="../../assets/see.png" class="work-list-item-eye" />
                <div class="work-list-item-hits">{{item.hits}} </div>
                <div class="work-list-item-time">{{item.gmtCreate}} </div>
              </div>
            </router-link>
          </div>
        </div>
        <div class="work-list-item-paging">
          <page :total="this.totalCount" :current="this.page" :page-size="5" show-elevator @on-change="changePage" />
        </div>
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
        // 作品数量
        worksNumber: '',
        // 选中的作品
        selectType: '全部作品',
        indexcategory: '全部作品',
        category: '',
        // 搜索的内容
        searchInfo: '',
        // 总条数
        totalCount: 0,
        // 返回数组
        info: [],
        // 竞赛
        competition: [{
          totalNum: '2',
          name: '多媒体'
        }, {
          totalNum: '4',
          name: '电子商务'
        }, {
          totalNum: '1',
          name: '服务外包'
        }, {
          totalNum: '1',
          name: '程序设计'
        }],
        // 科研
        scientificResearch: [{
            totalNum: '2',
            name: '国家级'
          }, {
            totalNum: '2',
            name: '省级'
          }, {
            totalNum: '2',
            name: '市级'
          },
          {
            totalNum: '2',
            name: '校级'
          }
        ],
        industry: [],
        technology: [],
        // 当前页数
        page: 1,
      }
    },
    name: 'Works',
    components: {
      FOOTER
    },
    created() {
      var that = this
      // 窗口回到顶部函数
      that.menu();
      // 导航栏搜索跳转判断
      this.searchInfo = this.$route.params.searchInfo
      if (this.$route.params.searchInfo) {
        that.$http.get(this.global.url + "/work/list", {
          params: {
            limit: 5,
            page: 1,
            name: this.searchInfo
          }
        }).then(res => {
          that.totalCount = res.data.data.totalCount
          that.info = res.data.data.list;
        })
      } else {
        // 获取作品列表
        that.$http.get(this.global.url + "/work/list", {
          params: {
            limit: 5,
            page: 1
          }
        }).then(res => {
          console.log(res.data.data.list)
          // 获取总条数
          that.totalCount = res.data.data.totalCount
          // 获取data
          that.info = res.data.data.list;
        }, err => {})
      }
      // //  获取各类别作品数量
      // that.$http.get(this.global.url + "/work/count").then(res => {
      //   // 技术分类 数组构成
      //   that.industry.push({
      //     TotalNum: 0,
      //     type: "全部作品"
      //   })
      //   var sumIndustry = 0
      //   console.log(res.data)
      //   for (let i = 0; i < res.data.industry.length; i++) {
      //     sumIndustry += res.data.industry[i].TotalNum
      //     that.industry.push({
      //       TotalNum: res.data.industry[i].TotalNum,
      //       type: res.data.industry[i].type_industry
      //     })
      //   }
      //   // 将累加的数量赋值
      //   that.industry[0].TotalNum = sumIndustry
      //   // 行业分类 数组构成
      //   that.technology.push({
      //     TotalNum: 0,
      //     type: "全部作品"
      //   })
      //   var sumTechnology = 0
      //   for (let i = 0; i < res.data.technology.length; i++) {
      //     sumTechnology += res.data.technology[i].TotalNum
      //     that.technology.push({
      //       TotalNum: res.data.technology[i].TotalNum,
      //       type: res.data.technology[i].type_technology
      //     })
      //   }
      //   that.technology[0].TotalNum = sumTechnology
      // }, err => {})
    },
    methods: {
      // 选择类别时
      selectT(name) {
        this.page = 1
        this.selectType = name
        if (name === "全部作品") { // 全部类别时
          this.$http.get(this.global.url + "/work/list", {
            params: {
              limit: 5,
              page: 1
            }
          }).then(res => {
            // 获取总条数
            this.totalCount = res.data.data.totalCount
            // 获取data
            this.info = res.data.data.list;
          })
        } else { // 其他类别时
          this.$http.get(this.global.url + "/work/list", {
            params: {
              limit: 5,
              page: 1,
              type: name
            }
          }).then(res => {
            if (res.data.data === null) {
              this.info = '';
              this.totalCount = 0;
            }
            // 获取总条数
            this.totalCount = res.data.data.totalCount
            // 获取data
            this.info = res.data.data.list;
          })
        }
      },
      // 搜索
      search() {
        if (this.searchInfo) {
          this.selectType = this.searchInfo;
        } else {
          this.selectType = "全部作品";
        }
        this.$http.get(this.global.url + "/work/list", {
          params: {
            limit: 5,
            page: 1,
            name: this.searchInfo
          }
        }).then(res => {
          if (res.data.data === null) {
            this.$Message.warning("没有相关搜索结果")
            return;
          }
          // 获取总条数
          this.totalCount = res.data.data.totalCount
          // 获取data
          this.info = res.data.data.list;
        })
      },
      //  换页码
      changePage(page) {
        this.page = page;
        if (this.selectType !== "全部作品") { // 其他类别时
          this.$http.get(this.global.url + "/work/list", {
            params: {
              limit: 5,
              page: this.page,
              type: this.selectType
            }
          }).then(res => {
            this.info = res.data.data.list;
          }, err => {})
        } else if (this.searchInfo !== '') {
          this.$http.get(this.global.url + "/work/list", {
            params: {
              limit: 5,
              page: this.page,
              name: this.searchInfo
            }
          }).then(res => {
            this.info = res.data.data.list;
          }, err => {})
        }
      },
      menu() {
        window.scrollTo(0, 0);
      }
    }
  }
</script>
