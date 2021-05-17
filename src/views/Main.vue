<template>
  <div class="main">
    <div class="title">欢迎进入分栏管理系统</div>
    <!-- <el-button type="primary" @click="set">vuex</el-button> -->
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
.title {
  font-family: 宋体;
  font-size: 30px;
}
</style>
