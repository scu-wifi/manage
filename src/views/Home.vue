<template>
  <div class="menu">
    <el-container>
      <el-header>
        <div class="title">育肥猪分栏信息管理系统</div>
        <div class="show">
          {{ this.$store.state.user.loginName
          }}<i class="el-icon-exit el-icon--right"></i>
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
      <el-container>
        <el-aside>
          <el-menu>
            <el-submenu index="1">
              <span slot="title">人员管理</span>
              <el-menu-item index="1-1" @click="person">个人主页</el-menu-item>
              <el-menu-item index="1-2" @click="person_manage"
                >授权管理</el-menu-item
              >
            </el-submenu>

            <el-submenu index="2">
              <span slot="title">猪场管理</span>
              <el-menu-item @click="weight_to"> 育肥监控 </el-menu-item>

              <el-menu-item @click="mechin_to">设备管理</el-menu-item>
              <!-- <el-menu-item @click="feed_to">饲料信息</el-menu-item> -->
              <el-menu-item @click="histroy">设备日志</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right"> </el-breadcrumb>
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
.el-container {
  margin: 0;
  padding: 0;
}

.el-header {
  position: relative;
  margin: 0;
  padding: 0;
  background-color: #409eff;
  color: #333;
  text-align: center;
}
.aside {
  background-color: #308dee;
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
  margin: 30px 30px;
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
      .get(this.$store.state.preurl + "/data/user/gercurrenuser/1")
      .then((response) => {
        this.$store.commit("setuser", response);
        console.log("user" + JSON.stringify(this.$store.state.user));
      });
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
  },
};
</script>
