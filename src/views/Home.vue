<template>
  <div class="menu">
    <el-container>
      <el-header>
        <div class="title">分栏管理</div>
        <el-dropdown trigger="click" class="user" @command="deal_user">
          <span> 用户<i class="el-icon-arrow-down el-icon--right"></i> </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="person">个人中心</el-dropdown-item>
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              title="确定退出吗？"
              @confirm="logout_two"
            >
              <el-dropdown-item slot="reference">注销登录 </el-dropdown-item>
            </el-popconfirm>
            <el-dropdown-item command="passward">修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
              <el-menu-item @click="feed_to">饲料信息</el-menu-item>
              <el-menu-item @click="histroy">往期数据</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style>
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
.title {
  display: inline-block;
  height: 60px;
  line-height: 60px;
  font-family: "楷体";
  font-size: 30px;
  font-weight: 600;
}
.user {
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
export default {
  data() {
    return {};
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
      this.$router.push("/home/");
    },
  },
};
</script>
