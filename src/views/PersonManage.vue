<template>
  <el-popover
    v-model="visable"
    title="添加管理人员"
    placement="bottom-start"
    @show="clear"
  >
    <el-form :model="usersdata" :rules="rules" ref="UserData">
      <el-form-item prop="loginName">
        <el-input
          type="text"
          v-model="usersdata.loginName"
          placeholder="登录名"
        ></el-input
      ></el-form-item>
      <el-form-item prop="password">
        <el-input
          type="text"
          v-model="usersdata.password"
          placeholder="密码"
          @keydown.enter.native="add"
        ></el-input>
        <el-input
          type="text"
          v-model="usersdata.mobile"
          placeholder="手机号"
        ></el-input>
        <el-input
          type="text"
          v-model="usersdata.email"
          placeholder="邮箱"
        ></el-input>
        <el-select v-model="usersdata.chageRight" placeholder="用户类型" size>
          <el-option label="管理员" value="a"> </el-option>
          <el-option label="普通用户" value="u"> </el-option>
        </el-select>
        <el-select v-model="usersdata.userType" placeholder="修改权限">
          <el-option label="允许修改" value="t"> </el-option>
          <el-option label="不允许修改" value="f"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-button class="topbutton" @click="add">确定</el-button>
    <el-button @click="quence">取消</el-button>
    <el-button slot="reference">添加</el-button>
  </el-popover>
</template>
<script>
export default {
  data() {
    return {
      usersdata: {
        loginName: "",
        password: "",
        mobile: "",
        email: "",
        chageRight: "",
        userType: "",
      },
      rules: {
        username: [{ required: true, message: "请输入用户", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
};
</script>
<style></style>
