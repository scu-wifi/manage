<template>
  <div>
    <el-card class="box-card" style="width: 400px" shadow="hover">
      <div slot="header" class="clearfix">
        <span style="font-family: 楷体">{{ myuser.name }}</span>
      </div>
      <div class="text item">
        <div style="display: flex; justify-content: center">
          <el-upload
            :action="action"
            :header="header"
            :data="myuser"
            :show-file-list="false"
            :on-success="onSuccess"
          >
            <img
              title="点击更换用户头像"
              :src="myuser.photo"
              style="height: 100px; width: 100px; border-radius: 50px"
          /></el-upload>
        </div>
        <div class="item">
          <span class="ch">登录名:</span>
          <div class="mytag">
            <el-tag>{{ myuser.loginName }}</el-tag>
          </div>
        </div>
        <div class="item">
          <span class="ch">手机号:</span>
          <div class="mytag">
            <el-tag>{{ myuser.mobile }}</el-tag>
          </div>
        </div>
        <div class="item">
          <span class="ch">邮 箱:</span>
          <div class="mytag">
            <el-tag>{{ myuser.email }}</el-tag>
          </div>
        </div>
        <div class="item">
          <span class="ch">用户类别:</span>
          <div class="mytag">
            <el-tag type="success">{{ myuser.userType }}</el-tag>
          </div>
        </div>
        <div class="item">
          <span class="ch">修改权限:</span>
          <div class="mytag">
            <el-tag type="success">{{ myuser.chageRight }}</el-tag>
          </div>
        </div>
        <div
          class="item"
          style="display: flex;justify-content: space-around;margin-top 10px"
        >
          <el-button type="primary" size="small" @click="primary = true"
            >修改信息</el-button
          >
          <el-button type="danger" size="small" @click="passward = true"
            >更改密码</el-button
          >
          <el-dialog
            title="修改信息"
            :visible.sync="primary"
            width="400"
            @open="resetForm('myuser')"
          >
            <el-form :model="myuser" ref="ruleForm">
              <el-form-item>
                <el-input
                  type="text"
                  v-model="myuser.loginName"
                  placeholder="登录名"
                ></el-input
              ></el-form-item>
              <el-form-item>
                <el-input
                  type="text"
                  v-model="myuser.mobile"
                  placeholder="手机号"
                  @keydown.enter.native="add"
                ></el-input
              ></el-form-item>
              <el-form-item>
                <el-input
                  type="text"
                  v-model="myuser.email"
                  placeholder="邮箱"
                  @keydown.enter.native="add"
                ></el-input
              ></el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitMessageForm('ruleForm')"
                  >提交</el-button
                >
                <el-button class="pass" @click="resetForm('ruleForm')"
                  >重置</el-button
                >
              </el-form-item>
            </el-form>
          </el-dialog>
          <el-dialog
            title="更改密码"
            :visible.sync="passward"
            @open="resetForm('ruleForm')"
          >
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="原密码" prop="oldpass">
                <el-input
                  type="password"
                  v-model="ruleForm.oldpass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="pass">
                <el-input
                  type="password"
                  v-model="ruleForm.pass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input
                  type="password"
                  v-model="ruleForm.checkPass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm()">提交</el-button>
                <el-button class="pass" @click="resetForm('ruleForm')"
                  >重置</el-button
                >
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入原密码"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      action:
        this.$store.state.preurl +
        "/data/userface/" +
        this.$store.state.user.id,
      primary: false,
      passward: false,
      ruleForm: {
        adminid: null,
        pass: "",
        checkPass: "",
        oldpass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        oldpass: [{ validator: checkAge, trigger: "blur" }],
      },
      header: {
        Authorization: window.sessionStorage.getItem("tokenStr"),
      },
      myuser: {
        //   id: 1,
        //   loginName: "admin",
        //   password:
        //     "$2a$10$NDawZSS.ekstbQdTDwWlKujwjEeUP1nk90YDM1iz6uwNnUcKqoN1q",
        //   name: "系统管理员",
        //   email: "fewfr",
        //   mobile: "13007192757",
        //   userType: "系统管理员",
        //   chageRight: "允许修改",
        //   photo: "",
        //   username: "admin",
      },
    };
  },
  mounted() {
    this.myuser = this.$store.state.user;
    console.log(this.$store.state.user);
    console.log(this.myuser);
  },

  methods: {
    getmessage() {
      axios
        .get(
          this.$store.state.preurl +
            "/data/user/gercurrenuser/" +
            this.$store.state.user.id
        )
        .then((resp) => {
          if (resp) {
            this.$store.commit("setuser", resp);
            this.myuser = resp;
          }
        });
    },
    onSuccess() {
      this.getmessage();
    },
    submitMessageForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .put(
              this.$store.state.preurl + "/data/user/updateuser",
              this.myuser
            )
            .then((resp) => {
              if (resp) {
                axios
                  .get(this.$store.state.preurl + "/data/user/gercurrenuser/1")
                  .then((response) => {
                    this.$store.commit("setuser", response);
                  });
                this.myuser = this.$store.state.user;
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
        this.primary = false;
      });
    },
    submitForm() {
      this.ruleForm.adminid = this.myuser.id;
      console.log(this.ruleForm);
      axios
        .put(this.$store.state.preurl + "/data/user/updatepass", this.ruleForm)
        .then((resp) => {
          if (resp) {
            window.sessionStorage.clear();
            this.$router.replace("/");
          }
        });
      this.passward = false;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
.pass {
  margin-left: 30px;
  float: right;
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
