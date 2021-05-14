<template>
  <div>
    <router-link to="/home">menu</router-link>
    <div class="login">
      <el-form
        :model="UserData"
        :rules="rules"
        ref="UserData"
        class="demo-ruleForm"
      >
        <el-form-item prop="username" class="item">
          <el-input
            class="input"
            type="text"
            placeholder="请输入账号"
            v-model="UserData.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item">
          <el-input
            class="input"
            type="password"
            placeholder="请输入密码"
            v-model="UserData.password"
            @keydown.enter.native="submit(UserData)"
          ></el-input>
        </el-form-item>
        <el-button @click="submit(UserData)" class="subminbutton"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      UserData: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入用户", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submit() {
      // this.$refs[Form].validata((valid) => {
      //   if (valid) {
      axios
        .post(this.$store.state.preurl + "/data/login", this.UserData)
        .then((resp) => {
          if (resp) {
            // console.log(resp.obj);resp.obj.tokenHead +
            const tokenStr = resp.obj.token;
            window.sessionStorage.setItem("tokenStr", tokenStr);
            let path = this.$route.query.redirect;
            this.$router.replace(
              path == "/" || path == undefined ? "/home" : path
            );
          }
        });
    },
  },
};
</script>
<style scoped>
.login {
  position: relative;
  width: 350px;
  height: 200px;
  background-clip: padding-box;
  margin: 180px auto;
  padding: 15px 35px;
  background: #fff;
  border: 2px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.item {
  margin: 25px 25px;
  padding: 0;
}
.input {
  width: 300px;
}
.subminbutton {
  position: absolute;
  /* margin-left: -50%; */
  margin: 0 25px;
  width: 300px;
  height: 40px;
  color: #fff;
  background: #388de4;
  border: 2px solid #d7e7f8;
  border-radius: 5px;
}
</style>
