<template>
  <div class="main">
    <div class="hello">欢迎进入分栏管理系统</div>
    <!-- <el-button type="primary" @click="set">vuex</el-button> -->
    <a
      class="link"
      href=" http://120.26.198.110:8888/group1/M00/00/00/rBMPlmDEvB-AcQY9AAeuAIf0AlQ095.exe"
      >网络调试助手下载，无需安装，直接点击使用</a
    >
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        name: "haha",
      },
    };
  },
  methods: {
    set() {
      this.$store.commit("setuser", this.user);
      console.log("vuex:" + JSON.stringify(this.$store.state));

      console.log("user:" + JSON.stringify(this.$store.state.user));
    },
  },
};
</script>
<style>
.hello {
  font-family: 行楷;
  font-size: 50px;
  margin: 50px 0;
  text-align: center;
}
.link {
  font-size: 30px;
  margin: 0 300px;
  text-align: center;
}
</style>
