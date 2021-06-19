<template>
  <div class="menu">
    <el-container style="height: 100%">
      <el-header>
        <div class="title">
          <router-link to="/main">育肥猪分栏信息管理系统</router-link>
        </div>
        <div class="show">
          <span style="line-height: 20px">{{
            this.$store.state.user.loginName
          }}</span>
          <i
            class="el-icon-exit el-icon--right"
            style="padding-bottom: -3px"
          ></i>
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            title="确定退出登录吗？"
            @confirm="logout_two"
          >
            <el-span class="icon-exit" slot="reference"></el-span>
          </el-popconfirm>
        </div>
      </el-header>
      <el-container style="height: 100%">
        <div class="aside color">
          <el-aside class="color">
            <el-menu
              style="width: 260px"
              background-color="#409EFF"
              active-text-color="#ffd04b"
            >
              <el-submenu index="1">
                <span
                  slot="title"
                  style="
                    font-size: 24px;
                    margin-left: 38px;
                    font-weight: 600;
                    font-family: 楷体;
                  "
                  >系统设置</span
                >
                <el-menu-item
                  index="1-1"
                  @click="person"
                  style="
                    font-size: 24px;
                    margin-left: 38px;
                    font-weight: 600;
                    font-family: 楷体;
                  "
                  >个人主页</el-menu-item
                >
                <el-menu-item
                  index="1-2"
                  @click="person_manage"
                  :disabled="this.$store.state.user.id !== 1"
                  style="
                    font-size: 24px;
                    margin-left: 38px;
                    font-weight: 600;
                    font-family: 楷体;
                  "
                  >授权管理</el-menu-item
                >
              </el-submenu>
              <el-menu-item
                @click="weight_to"
                style="
                  font-size: 24px;
                  margin-left: 38px;
                  font-weight: 600;
                  font-family: 楷体;
                "
                index="2"
              >
                生猪信息查看
              </el-menu-item>
              <!-- <el-submenu index="2">
              <span slot="title">统计分析</span>
              <el-menu-item @click="feed_to">信息分布</el-menu-item>
              <el-menu-item @click="feed_to">饲料信息</el-menu-item>
            </el-submenu> -->
              <el-menu-item
                index="3"
                @click="data_to"
                style="
                  font-size: 24px;
                  margin-left: 38px;
                  font-weight: 600;
                  font-family: 楷体;
                "
                >生猪信息统计</el-menu-item
              >
              <el-menu-item
                @click="mechin_to"
                style="
                  font-size: 24px;
                  margin-left: 38px;
                  font-weight: 600;
                  font-family: 楷体;
                "
                index="4"
                >系统预警</el-menu-item
              >
              <el-menu-item
                index="5"
                @click="histroy"
                style="
                  font-size: 24px;
                  margin-left: 38px;
                  font-weight: 600;
                  font-family: 楷体;
                "
                >系统日志</el-menu-item
              >
            </el-menu>
          </el-aside>
        </div>
        <el-main style="background-color: #fdfdfd">
          <el-breadcrumb separator-class="el-icon-arrow-right">{{
            this.$router.currentname
          }}</el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style>
[class^="icon-"],
[class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: "icomoon";
  speak: never;
  font-size: 18px;
  color: #606266;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
.el-container {
  margin: 0;
  padding: 0;
}
.menu {
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  caret-color: transparent;
}
.el-header {
  /* position: relative; */
  margin: 0;
  padding: 0;
  background-color: #3d77ff;

  text-align: center;
}
.aside {
  width: 260px;
  height: 100%;
  background-color: #409eff;
  box-shadow: 15px -10 15px -5px #cac6c6, -15px -10 15px -5px transparent;
}
.color {
  /* background-color: #2f73f1; */
}
.title {
  display: inline-block;
  height: 60px;
  line-height: 60px;
  font-family: "楷体";
  font-size: 30px;
  font-weight: 600;
}
.show {
  cursor: pointer;
  float: right;
  margin: 20px 30px 30px 30px;
}
.button {
  border-width: 0;
}
a {
  text-decoration: none;
}
</style>
<script>
import axios from "axios";
export default {
  data() {
    return {};
  },
  mounted() {
    axios
      .get(this.$store.state.preurl + "/data/user/gercurrenuser")
      .then((response) => {
        this.$store.commit("setuser", response);
      });
    this.$store.dispatch("connect");
  },
  destroyed() {
    this.$store.dispatch("disconnect");
  },
  methods: {
    deal_user(command) {
      switch (command) {
        case "person":
          this.$router.push("/main");
          break;
        case "passward":
          console.log(command);
          break;
        default:
          console.log("default");
          break;
      }
    },
    person() {
      this.$router.push("/person");
    },
    person_manage() {
      this.$router.push("/pmanage");
    },
    logout() {
      this.$alert("确定退出吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        callback: () => {
          window.sessionStorage.clear();
          this.$router.replace("/");
        },
      });
    },
    logout_two() {
      window.sessionStorage.clear();
      this.$router.replace("/");
    },
    weight_to() {
      this.$router.push("/table");
    },
    feed_to() {
      this.$router.push("/feed");
    },
    mechin_to() {
      this.$router.push("/equipment");
    },
    histroy() {
      this.$router.push("/eqlog");
    },
    data_to() {
      this.$router.push("/statistic");
    },
  },
};
</script>
