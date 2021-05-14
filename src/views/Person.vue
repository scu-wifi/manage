<template>
  <div>
    <el-card class="box-card" style="width: 400px" shadow="hover">
      <div slot="header" class="clearfix">
        <span style="font-family: 楷体">{{ user.name }}</span>
      </div>
      <div class="text item">
        <div style="display: flex; justify-content: center">
          <el-upload
            action=""
            :header="header"
            :data="user"
            :show-file-list="false"
            :on-success="onSuccess"
          >
            <img
              title="点击更换用户头像"
              src="http://120.26.198.110:8888/group1/M00/00/00/rBMPlmCd4hWAd8uYAACEg7-Fv20599.jpg"
              style="height: 100px; width: 100px; border-radius: 50px"
          /></el-upload>
        </div>
        <div class="item">
          <span class="ch">登录名:</span>
          <div class="mytag">
            <el-tag>{{ user.loginName }}</el-tag>
          </div>
        </div>
        <div class="item">
          <span class="ch">手机号:</span>
          <div class="mytag">
            <el-tag>{{ user.mobile }}</el-tag>
          </div>
        </div>
        <div class="item">
          <span class="ch">邮 箱:</span>
          <div class="mytag">
            <el-tag>{{ user.email }}</el-tag>
          </div>
        </div>
        <div class="item">
          <span class="ch">用户类别:</span>
          <div class="mytag">
            <el-tag type="success">{{ user.userType }}</el-tag>
          </div>
        </div>
        <div class="item">
          <span class="ch">修改权限:</span>
          <div class="mytag">
            <el-tag type="success">{{ user.chageRight }}</el-tag>
          </div>
        </div>
        <div
          class="item"
          style="display: flex;justify-content: space-around;margin-top 10px"
        >
          <el-button type="primary" size="small">修改信息</el-button>
          <el-button type="danger" size="small">更改密码</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      header: {
        Authorization: window.sessionStorage.getItem("tokenStr"),
      },
      user: {
        id: 1,
        loginName: "admin",
        password:
          "$2a$10$NDawZSS.ekstbQdTDwWlKujwjEeUP1nk90YDM1iz6uwNnUcKqoN1q",
        name: "系统管理员",
        email: "fewfr",
        mobile: "13007192757",
        userType: "系统管理员",
        chageRight: "允许修改",
        photo: "",
        enabled: true,
        username: "admin",
        authorities: null,
        accountNonLocked: true,
        accountNonExpired: true,
        credentialsNonExpired: true,
      },
    };
  },
  mounted() {
    this.getmessage();
  },

  methods: {
    getmessage() {
      axios
        .get(
          this.$store.state.preurl +
            "/user/gercurrenuser/" +
            this.$store.state.user.id
        )
        .then((resp) => {
          if (resp) this.user = resp;
        });
    },
    onSuccess() {
      this.getmessage();
    },
  },
};
</script>
<style>
.text {
  font-size: 14px;
}
.item {
  line-height: 38px;
  margin: 1px 10px;
}
.ch {
  overflow: hidden;
  margin: 0;
  font-family: 黑体;
  font-size: 17px;
  line-height: 38px;
  display: inline-flex;
  width: 80px;
}
.mytag {
  display: inline-flex;
}
.el-tag {
  height: 38px;
  /* margin-left: 5px; */
  padding-left: 5px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
