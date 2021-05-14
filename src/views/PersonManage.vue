<template>
  <div>
    <div class="adduser">
      <el-popover
        v-model="visable"
        title="添加管理人员"
        placement="bottom-start"
        @show="clear"
      >
        <el-form :model="usersdata" :rules="rules" ref="UserData">
          <el-form-item prop="loginName" class="inputitem">
            <el-input
              type="text"
              v-model="usersdata.loginName"
              placeholder="设置登录账号"
            ></el-input
          ></el-form-item>
          <el-form-item prop="password" class="inputitem">
            <el-input
              type="text"
              v-model="usersdata.password"
              placeholder="设置密码"
              @keydown.enter.native="add"
            ></el-input>
          </el-form-item>
          <el-form-item class="inputitem">
            <el-input
              type="text"
              v-model="usersdata.name"
              placeholder="用户名字"
            ></el-input>
          </el-form-item>
          <el-form-item class="inputitem">
            <el-input
              type="text"
              v-model="usersdata.mobile"
              placeholder="手机号"
            ></el-input>
          </el-form-item>
          <el-form-item class="inputitem">
            <el-input
              type="text"
              v-model="usersdata.email"
              placeholder="邮箱"
            ></el-input>
          </el-form-item>
          <el-select v-model="usersdata.chageRight" placeholder="用户类型" size>
            <el-option label="系统管理员" value="系统管理员"> </el-option>
            <el-option label="普通用户" value="普通用户"> </el-option>
          </el-select>
          <el-select v-model="usersdata.userType" placeholder="修改权限">
            <el-option label="允许修改" value="允许修改"> </el-option>
            <el-option label="禁止修改" value="禁止修改"></el-option>
          </el-select>
        </el-form>
        <el-button type="success" class="topbutton" @click="add"
          >确定</el-button
        >
        <el-button type="info" class="rightbutton" @click="quence"
          >取消</el-button
        >
        <el-button type="primary" slot="reference">添加</el-button>
      </el-popover>
      <el-popconfirm
        class="topbutton"
        confirm-button-text="确定"
        cancel-button-text="取消"
        title="确定全部删除吗？"
        @confirm="delateall"
      >
        <el-button
          type="danger"
          slot="reference"
          :disabled="this.multipleSelection.length == 0"
          >批量删除</el-button
        >
      </el-popconfirm>
    </div>
    <div class="table">
      <el-table
        :data="alluserdata"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          align="center"
          prop="loginName"
          label="登录账号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="用户名字"
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="left"
          prop="mobile"
          label="手机号"
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="left"
          prop="email"
          label="邮箱"
        >
        </el-table-column>
        <el-table-column
          header-align="center"
          align="left"
          prop="userType"
          label="用户类别"
        >
          <template slot-scope="scope">
            <el-dropdown
              trigger="click"
              @command="
                (command) => {
                  chageType(command, scope.$index, alluserdata);
                }
              "
            >
              <i class="el-icon-arrow-down el-icon--left"></i
              ><span>{{ scope.row.userType }}</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="t">管理员</el-dropdown-item>
                <el-dropdown-item command="f">用户</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column
          header-align="left"
          align="left"
          prop="chageRight"
          label="修改权限"
        >
          <template slot-scope="scope" align="left">
            <el-dropdown
              trigger="click"
              @command="
                (command) => {
                  chageRight(command, scope.$index, alluserdata);
                }
              "
            >
              <i class="el-icon-arrow-down el-icon--left"></i
              ><span>{{ scope.row.chageRight }}</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="t">允许修改</el-dropdown-item>
                <el-dropdown-item command="f">禁止修改</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-popconfirm
              class="table_button"
              confirm-button-text="确定"
              cancel-button-text="取消"
              title="确定重置密码为123456吗？"
              @confirm="resetpassword(scope.$index, alluserdata)"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                size="mini"
                slot="reference"
              />
            </el-popconfirm>
            <el-popconfirm
              class="table_button"
              confirm-button-text="确定"
              cancel-button-text="取消"
              title="确定删除吗？"
              @confirm="delate(scope.$index, alluserdata)"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                size="mini"
                slot="reference"
              ></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      multipleSelection: [],
      visable: false,
      usersdata: {
        loginName: "",
        password: "",
        name: "",
        mobile: "",
        email: "",
        chageRight: "",
        userType: "",
      },
      alluserdata: [
        {
          id: 9,
          loginName: "fewf",
          password:
            "$2a$10$os63LmO/yQxcp1EEaoQKRe.6B.sfQbW1U5/4PmsN4O6hPANcsJ3WG",
          name: "傻逼",
          email: "fsfsed@163.com",
          mobile: "134867237",
          userType: "管理员",
          chageRight: "允许修改",
          photo: null,
          enabled: true,
          username: "fewf",
        },
      ],
      rules: {
        loginName: [{ required: true, message: "请输入用户", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.refresh();
  },
  methods: {
    chageType(commond, index, row) {
      switch (commond) {
        case "t":
          row[index].userType = "管理员";
          axios
            .put(this.$store.state.preurl + "/data/user/updateuser")
            .then((resp) => {
              if (resp) {
                this.refresh();
              }
            });
          break;
        case "f":
          row[index].userType = "用户";
          axios
            .put(this.$store.state.preurl + "/data/user/updateuser")
            .then((resp) => {
              if (resp) {
                this.refresh();
              }
            });
          break;
      }
    },
    chageRight(commond, index, row) {
      switch (commond) {
        case "t":
          row[index].chageRight = "允许修改";
          axios
            .put(this.$store.state.preurl + "/data/user/updateuser")
            .then((resp) => {
              if (resp) {
                this.refresh();
              }
            });
          break;
        case "f":
          row[index].chageRight = "禁止修改";
          axios
            .put(this.$store.state.preurl + "/data/user/updateuser")
            .then((resp) => {
              if (resp) {
                this.refresh();
              }
            });
          break;
      }
    },
    refresh() {
      axios.get(this.$store.state.preurl + "/data/user/getall").then((resp) => {
        this.alluserdata = resp;
      });
    },
    add() {
      if (this.usersdata.loginName && this.usersdata.password) {
        // const curront = new Date();
        // this.inputdata.date = curront.toLocaleString;
        // this.feedtabel.push({ ...this.inputdata });
        axios
          .post(this.$store.state.preurl + "/data/user/adduser", this.usersdata)
          .then((resp) => {
            if (resp) {
              this.visable = false;
              this.refresh();
            } else {
              this.$message({
                type: "error",
                message: "添加失败",
              });
            }
          });
      } else {
        this.$message({
          type: "warning",
          message: "请输入数据",
        });
      }
    },
    quence() {
      this.visable = false;
    },
    clear() {
      this.usersdata.loginName = "";
      this.usersdata.password = "";
      this.usersdata.mobile = "";
      this.usersdata.email = "";
      this.usersdata.userType = "";
      this.usersdata.chageRight = "";
    },
    delateall() {
      let ids = "?";
      this.multipleSelection.forEach((element) => {
        ids += "ids=" + element.id + "&";
      });
      console.log("run");
      axios
        .delete(this.$store.state.preurl + "/data/user/deletemore/" + ids)
        .then((resp) => {
          if (resp) {
            this.refresh();
          }
        });
    },
    delate(index, rows) {
      //删除并刷新
      axios
        .delete(
          this.$store.state.preurl + "/data/user/delete/" + rows[index].id
        )
        .then((resp) => {
          if (resp) this.refresh();
        });
    },
    resetpassword(index, rows) {
      //重置密码
      axios.put(this.$store.state.preurl + "/data/user/resetpass", {
        adminid: rows[index].id,
        oldpass: rows[index].password,
        pass: "123456",
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
<style>
.table {
  margin-top: 5px;
}
.topbutton {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 50px;
}
.rightbutton {
  margin-top: 20px;
  margin-right: 20px;
  float: right;
}
.table_button {
  padding: 5px;
}
</style>
